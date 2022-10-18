import React, { useState, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';

import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton';
import * as Icon from '@mui/icons-material';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import { AG_GRID_LOCALE_BR, flexOnOrNot } from "../../globalFunctions";
import FormDialogItem from "./DialogItem";

const GridItens = () => {
    const [itens, setItens] = useState([]);
    const [open, setOpen] = React.useState(false);

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

    const handleFormSubmit = (codigo, qtd, valorUni, valorTotal) => {
        setItens([...itens,{codigo: codigo, qtd: qtd, valorUni: valorUni, valorTotal: valorTotal}]);
        handleClose();
    }

    const removeItem = (array, value) => {
        var index = array.indexOf(value)
        if (index !== -1) {
          array.splice(index, 1);
        }
    };

    const handleDelete = (id) => {
        removeItem(itens, id);
        console.log(itens);
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
            <FormDialogItem
            open={open} 
            handleClose={handleClose} 
            handleFormSubmit={handleFormSubmit}
            />
        </div>
    )
}

export default GridItens;