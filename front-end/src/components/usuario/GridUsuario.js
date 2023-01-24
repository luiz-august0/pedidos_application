import React, { useState, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';
import { getUsuario, createUsuario, updateUsuario, deleteUsuario } from "../../services/api";

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

const initialValue = {usuario: "", senha: "", codFuncionario: "", tipoUsuarioDefault: "FUNC"};

const GridUsuario = () => {
    const MySwal = withReactContent(Swal);
    
    const [gridApi, setGridApi] = useState(null);
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = useState(initialValue);

    const columnDefs = [
        { field: "Usr_Codigo", headerName: "Código"},
        { field: "Usr_Login", headerName: "Usuário" },
        { field: "Fun_Codigo", headerName: "Código de funcionário", hide: true},
        { field: "Funcionario", headerName: "Funcionário" },
        { field: "Usr_Codigo", headerName:"Ações", cellRendererFramework:(params) => 
        <div>
            <IconButton style={{ color: 'orange' }} onClick={() => handleUpdate(params.data)}>
                <Icon.ModeEdit/>
            </IconButton>
            {usuarios.length > 1? 
            <IconButton style={{ color: 'red' }} onClick={() => handleDelete(params.value)}>
            <Icon.Delete/>
            </IconButton>:null}
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
        setLoading(true);
        await getUsuario()
            .then(res => {
                setUsuarios(res.data);
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
        const usuario = formData.usuario;
        const senha = formData.senha;
        const codFuncionario = formData.codFuncionario;

        if(formData.id) {
            try {            
                await updateUsuario(formData.id, usuario, senha, codFuncionario);
                refreshGrid();
                handleClose();
                MySwal.fire({
                    html: <i>Usuário alterado com sucesso!</i>,
                    icon: 'success'
                })
            } catch (error) {
                handleClose();
                MySwal.fire({
                    html: <i>Usuário informado já existe cadastro</i>,
                    icon: 'error'
                })
            }
        }else {
            try {           
                await createUsuario(usuario, senha, codFuncionario);
                refreshGrid();
                handleClose();
                MySwal.fire({
                    html: <i>Usuário cadastrado com sucesso!</i>,
                    icon: 'success'
                })
            } catch (error) {
                handleClose();
                MySwal.fire({
                    html: <i>Usuário informado já existe cadastro</i>,
                    icon: 'error'
                })
            }
        }
    }

    const handleUpdate = (oldData) => {
        let tipo = "ADM"
        if (oldData.Fun_Codigo !== null) {
            tipo = "FUNC"
        }
        setFormData({id: oldData.Usr_Codigo, usuario: oldData.Usr_Login, senha: "", codFuncionario: oldData.Fun_Codigo, tipoUsuarioDefault: tipo});
        handleClickOpen();
    }

    //Deleta registro
    const handleDelete = (id) => {
        const deleteRegister = async () => {
            try {
                await deleteUsuario(id);
                refreshGrid();
                MySwal.fire({
                    html: <i>Usuario excluido com sucesso!</i>,
                    icon: 'success'
                })
            } catch (error) {
                MySwal.fire({
                    html: <i>{JSON.stringify(error.response.data).slice(0, -1).slice(1 | 1)}</i>,
                    icon: 'error'
                })
            }
        }

        MySwal.fire({
            title: 'Confirma a exclusão do Usuário?',
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
                    rowData={usuarios}
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

export default GridUsuario;