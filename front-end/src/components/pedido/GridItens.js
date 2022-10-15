import React, { useState, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';

import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton';
import * as Icon from '@mui/icons-material';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
//import FormDialogItem from "./DialogItem";
import { AG_GRID_LOCALE_BR, flexOnOrNot } from "../../globalFunctions";
const initialValue = {codigo: "100", qtd: "100", valorUni: "100,00", valorTotal: "1000,00"};

const GridItens = () => {
    const [itens, setItens] = useState([initialValue]);
    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = useState(initialValue);

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
            <IconButton style={{ color: 'red' }}>
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
        </div>
    )
}

export default GridItens;