import React, { useState } from "react";
import { AgGridReact } from 'ag-grid-react';

import Grid from '@mui/material/Grid'
import * as Icon from '@mui/icons-material';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { AG_GRID_LOCALE_BR, flexOnOrNot } from "../../globalFunctions";
import FormDialogItem from "./DialogItem";
import FormDialogFechaPedido from "./DialogFechaPedido";
import { Button, IconButton } from "@mui/material";
import { createPed, createItemPed } from "../../services/api";

const initialValue = {codigo: "", qtdProd: "", valorUni: 0, valorTotal: 0, editMode: false};

const GridItens = ({ data, closePopup, handleRefresh }) => {
    const [itens, setItens] = useState([]);
    const [formData, setFormData] = useState(initialValue);
    const [open, setOpen] = useState(false);
    const [openModalFechaPed, setOpenModalFechaPed] = useState(false);
    const MySwal = withReactContent(Swal);

    var vbContinua = false;

    const columnDefs = [
        { field: "codigo", headerName: "Código", hide: true},
        { field: "produto", headerName: "Produto" },
        { field: "qtd", headerName: "Quantidade" },
        { field: "valorUni", headerName: "Valor Uni", },
        { field: "valorTotal", headerName: "Valor Total" },
        { field: "codigo", headerName:"Ações", cellRendererFramework:(params) => 
        <div>
            <IconButton style={{ color: 'orange' }}>
                <Icon.ModeEdit onClick={() => handleUpdate(params.data)}/>
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
        flex: flexOnOrNot()
    }

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setFormData(initialValue);
    }

    const handleClickOpenFechaPed = () => {
        setOpenModalFechaPed(true);
    }

    const handleCloseFechaPed = () => {
        setOpenModalFechaPed(false);
    }
    
    const onChange = (field, value) => {
        setFormData({...formData,[field]:value})
    }

    const calculaTotalItens = () => {
        let total = 0;
        itens.map((e) => {
            total = parseFloat(total) + parseFloat(e.valorTotal);
        });
        return parseFloat(total);
    }

    const verificaItemExistente = (id) => {
        let itemJaExistente = false;
        itens.map((e) => {
            if (e.codigo === id) {
                itemJaExistente = true;
                MySwal.fire({
                    html: <i>Item já existe no pedido!</i>,
                    icon: 'warning'
                })
            }
        });
        return itemJaExistente;
    }

    const execFinalizacaoPedido = () => {
        MySwal.fire({
            html: <i>Pedido inserido com sucesso!</i>,
            icon: 'success'
        });

        closePopup();
        handleRefresh();
    };

    const inserePedido = async(cliente, funcionario, situacao) => {
        try {
            const response = await createPed(cliente, funcionario, calculaTotalItens(), situacao);
            const createdid = response.data.insertId;

            itens.map(async(e) => {
                await createItemPed(e.codigo, e.qtd, e.valorTotal, createdid);
            });

            execFinalizacaoPedido();

        } catch (error) {
            MySwal.fire({
                html: <i>Ops!, Não foi possível inserir o pedido</i>,
                icon: 'error'
            })
        }
    }

    const handleConfirmation = () => {
        let cliente = data[0];
        let funcionario = data[1];
        let situacao = data[2];

        if (cliente === '') {
            MySwal.fire({
                html: <i>Cliente deve ser informado</i>,
                icon: 'warning'
            })
            return;
        }

        if (funcionario === '') {
            MySwal.fire({
                html: <i>Funcionário deve ser informado</i>,
                icon: 'warning'
            })
            return;
        }

        if (situacao === '') {
            MySwal.fire({
                html: <i>Situação do pedido deve ser informada</i>,
                icon: 'warning'
            })
            return;
        }

        if (itens.length <= 0) {
            MySwal.fire({
                html: <i>Deve ser inserido pelo menos um item no pedido</i>,
                icon: 'warning'
            })
            return;
        }

        if (situacao === 'F' && !vbContinua) {
            handleClickOpenFechaPed();
        } else {
            vbContinua = true;
        }

        if (vbContinua) {
            inserePedido(cliente, funcionario, situacao);
        }
    }

    const handleFormSubmit = (codigo, produto, qtd, valorUni, valorTotal) => {
        if (!verificaItemExistente(codigo)) {
            setItens([...itens, {codigo: codigo, produto: produto, qtd: qtd, valorUni: valorUni, valorTotal: valorTotal}]);
        }
        handleClose();
    }

    const handleSubmitFechaPed = (vbContinuaParam) => {
        if (vbContinuaParam) {
            vbContinua = true;
            handleConfirmation();
        }
    }

    const handleUpdate = (oldData) => {
        setFormData({codigo: oldData.codigo, qtd: oldData.qtd, valorUni: oldData.valorUni, valorTotal: oldData.valorTotal, editMode: true});
        handleClickOpen();
    }

    const handleDelete = (id) => {
        let newArrayItens = [];
        itens.map((e) => {
            if (e.codigo !== id) {
                newArrayItens.push({codigo: e.codigo, produto: e.produto, qtd: e.qtd, valorUni: e.valorUni, valorTotal: e.valorTotal});
            }
        });
        setItens(newArrayItens);
    }

    return (
        <div className="Grid"> 
            <Grid align="right" marginBottom={1}>
            <IconButton style={{ color: '#fff', fontSize: '18px', fontWeight: 'bold'}} onClick={handleClickOpen}>
                <Icon.AddCircle style={{ height: '45px', width: '45px', color: '#43d138'}}/>
            </IconButton>
            </Grid>
            <div className="ag-theme-material" style={{ height: '20rem', width: '50rem'}}>
                <AgGridReact 
                    rowData={itens}
                    columnDefs={columnDefs} 
                    defaultColDef={defaultColDef}
                    localeText={AG_GRID_LOCALE_BR}
                    gridOptions={{paginationAutoPageSize: true, pagination: true}}
                />
            </div>
            <h2 style={{color: '#000', textAlign: 'right'}}>Total do Pedido: R${calculaTotalItens()}</h2>
            <Button color='primary' variant='contained' onClick={() => handleConfirmation()}>Confirmar</Button>
            <FormDialogItem
            open={open} 
            handleClose={handleClose} 
            handleFormSubmit={handleFormSubmit}
            onChange={onChange}
            data={formData}
            />
            <FormDialogFechaPedido
            openModalFechaPed={openModalFechaPed} 
            handleCloseFechaPed={handleCloseFechaPed}
            handleSubmitFechaPed={handleSubmitFechaPed}
            valorTotal={calculaTotalItens()}
            />
        </div>
    )
}

export default GridItens;