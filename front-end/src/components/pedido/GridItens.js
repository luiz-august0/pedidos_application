import React, { useState, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';

import Grid from '@mui/material/Grid'
import * as Icon from '@mui/icons-material';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { AG_GRID_LOCALE_BR, flexOnOrNot } from "../../globalFunctions";
import FormDialogItem from "./DialogItem";
import { Button, IconButton } from "@mui/material";

const GridItens = () => {
    const [itens, setItens] = useState([]);
    const [open, setOpen] = React.useState(false);
    const MySwal = withReactContent(Swal);

    const columnDefs = [
        { field: "codigo", headerName: "Código"},
        { field: "qtd", headerName: "Quantidade" },
        { field: "valorUni", headerName: "Valor Uni", },
        { field: "valorTotal", headerName: "Valor Total" },
        { field: "codigo", headerName:"Ações", cellRendererFramework:(params) => 
        <div>
            <IconButton style={{ color: 'orange' }}>
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
        flex: flexOnOrNot()
    }

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
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

    const handleFormSubmit = (codigo, qtd, valorUni, valorTotal) => {
        if (!verificaItemExistente(codigo)) {
            setItens([...itens, {codigo: codigo, qtd: qtd, valorUni: valorUni, valorTotal: valorTotal}]);
        }
        handleClose();
    }

    const handleDelete = (id) => {
        let newArrayItens = [];
        itens.map((e) => {
            if (e.codigo !== id) {
                newArrayItens.push({codigo: e.codigo, qtd: e.qtd, valorUni: e.valorUni, valorTotal: e.valorTotal});
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
            <div className="ag-theme-material" style={{ height: '400px'}}>
                <AgGridReact 
                    rowData={itens}
                    columnDefs={columnDefs} 
                    defaultColDef={defaultColDef}
                    localeText={AG_GRID_LOCALE_BR}
                />
            </div>
            <h2 style={{color: '#000', textAlign: 'right'}}>Total do Pedido: R${calculaTotalItens()}</h2>
            <Button color='primary' variant='contained'>Confirmar</Button>
            <FormDialogItem
            open={open} 
            handleClose={handleClose} 
            handleFormSubmit={handleFormSubmit}
            />
        </div>
    )
}

export default GridItens;