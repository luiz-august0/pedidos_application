import React, { useState, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';
import { getFornecedores, createFornecedor, updateFornecedor, deleteFornecedor } from "../../services/api";

import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton';
import * as Icon from '@mui/icons-material';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import FormDialog from "./Dialog";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { AG_GRID_LOCALE_BR } from "../../globalFunctions";
import { Oval } from  'react-loader-spinner';

const initialValue = {nome: "", razaoSocial: "", cpf: "", cnpj: "", contato: ""};

const GridFornecedor = () => {

    const MySwal = withReactContent(Swal);
    
    const [gridApi, setGridApi] = useState(null);
    const [fornecedores, setFornecedores] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(initialValue);

    const columnDefs = [
        { field: "For_Codigo", headerName: "Código"},
        { field: "For_Nome", headerName: "Nome" },
        { field: "For_RazaoSocial", headerName: "Razão Social" },
        { field: "For_CPF", headerName: "CPF", },
        { field: "For_CNPJ", headerName: "CNPJ" },
        { field: "For_Contato", headerName: "Telefone" },
        { field: "For_Codigo", headerName:"Ações", cellRendererFramework:(params) => 
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
        resizable: true
    }

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setFormData(initialValue);
    }
    
    const refreshGrid = async () => {
        setLoading(true);
        await getFornecedores()
            .then(res => {
                setFornecedores(res.data);
                setLoading(false);
            });
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
        const razaoSocial = formData.razaoSocial;
        const cnpj = formData.cnpj;
        const contato = formData.contato;

        if(formData.id) {
            try {            
                await updateFornecedor(formData.id, nome, razaoSocial, cpf, cnpj, contato);
                refreshGrid();
                handleClose();
                MySwal.fire({
                    html: <i>Fornecedor alterado com sucesso!</i>,
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
                await createFornecedor(nome, razaoSocial, cpf, cnpj, contato);
                refreshGrid();
                handleClose();
                MySwal.fire({
                    html: <i>Fornecedor cadastrado com sucesso!</i>,
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
        setFormData({id: oldData.For_Codigo, nome: oldData.For_Nome, razaoSocial: oldData.For_RazaoSocial, cpf: oldData.For_CPF , cnpj: oldData.For_CNPJ, contato: oldData.For_Contato});
        handleClickOpen();
    }

    //Deleta registro
    const handleDelete = (id) => {
        const deleteRegister = async () => {
            try {
                await deleteFornecedor(id);
                MySwal.fire({
                    html: <i>Fornecedor excluido com sucesso!</i>,
                    icon: 'success'
                })
                refreshGrid();
            } catch (error) {
                MySwal.fire({
                    html: <i>{JSON.stringify(error.response.data).slice(0, -1).slice(1 | 1)}</i>,
                    icon: 'error'
                })
            }
        }

        MySwal.fire({
            title: 'Confirma a exclusão do Fornecedor?',
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
            <IconButton style={{ color: '#000', fontSize: '18px', fontWeight: 'bold'}} onClick={handleClickOpen}>
                Adicionar
                <Icon.AddCircle style={{ height: '45px', width: '45px', color: '#43d138'}}/>
            </IconButton>
            </Grid>
            <div className="ag-theme-material" style={{ height: '600px'}}>
                {!loading ?
                    <AgGridReact 
                    rowData={fornecedores}
                    columnDefs={columnDefs} 
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                    localeText={AG_GRID_LOCALE_BR}
                    gridOptions={{paginationAutoPageSize: true, pagination: true}}
                    />
                :   <Oval
                    height={50}
                    width={50}
                    color="#1976d2"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel='oval-loading'
                    secondaryColor="#1976d2"
                    strokeWidth={3}
                    strokeWidthSecondary={3}
                    />
                }
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

export default GridFornecedor;