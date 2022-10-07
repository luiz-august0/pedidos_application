import React, { useState, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';
import { getClientes, createCliente, updateCliente, deleteCliente } from "../../services/api";

import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton';
import * as Icon from '@mui/icons-material';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import FormDialog from "./Dialog";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const initialValue = {nome: "", cpf: "", cnpj: "", contato: ""};

const GridCliente = () => {

    const MySwal = withReactContent(Swal);
    
    const [gridApi, setGridApi] = useState(null);
    const [clientes, setClientes] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = useState(initialValue);

    const columnDefs = [
        { field: "Cli_Codigo", headerName: "Código"},
        { field: "Cli_Nome", headerName: "Nome" },
        { field: "Cli_CPF", headerName: "CPF", },
        { field: "Cli_CNPJ", headerName: "CNPJ" },
        { field: "Cli_Contato", headerName: "Telefone" },
        { field: "Cli_Codigo", headerName:"Ações", cellRendererFramework:(params) => 
        <div>
            <IconButton style={{ color: 'orange' }} onClick={() => handleUpdate(params.data)}>
                <Icon.ModeEdit/>
            </IconButton>
            <IconButton style={{ color: 'red' }} onClick={() => handleDelete(params.value)}>
                <Icon.Delete/>
            </IconButton>
        </div>}
    ];

    const defaultColDef = {
        sortable: true,
        filter: true,
        floatingFilter: true,
        resizable: true,
        flex: 1
    }

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setFormData(initialValue);
    }
    
    const refreshGrid = async () => {
        const response = await getClientes();
        setClientes(response.data);
    }

    useEffect(() => {
        refreshGrid();
    }, []);

    const onChange = (e) => {
        const {value, id} = e.target;
        setFormData({...formData,[id]:value})
    }

    const onGridReady = (params) => {
        setGridApi(params)
    }

    //Insere registro //Atualiza registro
    const handleFormSubmit = async () => {
        const nome = formData.nome;
        const cpf = formData.cpf;
        const cnpj = formData.cnpj;
        const contato = formData.contato;

        if(formData.id) {
            try {            
                await updateCliente(formData.id, nome, cpf, cnpj, contato);
                refreshGrid();
                handleClose();
                MySwal.fire({
                    html: <i>Cliente alterado com sucesso!</i>,
                    icon: 'success'
                })
            } catch (error) {
                handleClose();
                MySwal.fire({
                    html: <i>{JSON.stringify(error.response.data).slice(0, -1).slice(1 | 1)}</i>,
                    icon: 'error'
                })
            }
        }else {
            try {           
                await createCliente(nome, cpf, cnpj, contato);
                refreshGrid();
                handleClose();
                MySwal.fire({
                    html: <i>Cliente cadastrado com sucesso!</i>,
                    icon: 'success'
                })
            } catch (error) {
                handleClose();
                MySwal.fire({
                    html: <i>{JSON.stringify(error.response.data).slice(0, -1).slice(1 | 1)}</i>,
                    icon: 'error'
                })
            }
        }
    }

    const handleUpdate = (oldData) => {
        setFormData({id: oldData.Cli_Codigo, nome: oldData.Cli_Nome , cpf: oldData.Cli_CPF , cnpj: oldData.Cli_CNPJ, contato: oldData.Cli_Contato});
        handleClickOpen();
    }

    //Deleta registro
    const handleDelete = (id) => {
        const deleteRegister = async () => {
            try {
                await deleteCliente(id);
                MySwal.fire({
                    html: <i>Cliente excluido com sucesso!</i>,
                    icon: 'success'
                })
                refreshGrid();
            } catch (error) {
                MySwal.fire({
                    html: <i>{JSON.stringify(error.response.data.error).slice(0, -1).slice(1 | 1)}</i>,
                    icon: 'error'
                })
            }
        }

        MySwal.fire({
            title: 'Confirma a exclusão do Cliente?',
            showDenyButton: true,
            confirmButtonText: 'Sim',
            denyButtonText: 'Não',
            customClass: {
            actions: 'my-actions',
            cancelButton: 'order-1 right-gap',
            confirmButton: 'order-2',
            denyButton: 'order-3',
            }
          }).then((result) => {
            if (result.isConfirmed) {
                deleteRegister();
            }
        })
    }

    return (
        <div className="Grid"> 
            <Grid align="right" marginBottom={1}>
            <IconButton style={{ color: '#fff', fontSize: '18px', fontWeight: 'bold'}} onClick={handleClickOpen}>
                Adicionar
                <Icon.AddCircle style={{ height: '45px', width: '45px', color: '#43d138'}}/>
            </IconButton>
            </Grid>
            <div className="ag-theme-material" style={{ height: '600px'}}>
                <AgGridReact 
                    rowData={clientes}
                    columnDefs={columnDefs} 
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                />
            </div>
            <FormDialog
            open={open} 
            handleClose={handleClose} 
            data={formData} 
            onChange={onChange} 
            handleFormSubmit={handleFormSubmit}
            />
        </div>
    )
}

export default GridCliente;