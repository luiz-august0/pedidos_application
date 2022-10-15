import React, { useState, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';
import { getPedidos} from "../../services/api";
import ModalPedido from "./ModalPedido";

import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton';
import * as Icon from '@mui/icons-material';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import { AG_GRID_LOCALE_BR, flexOnOrNot } from "../../globalFunctions";

const GridPedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    const columnDefs = [
        { field: "Ped_Codigo", headerName: "Código"},
        { field: "Cliente", headerName: "Cliente" },
        { field: "Fornecedor", headerName: "Fornecedor", },
        { field: "Funcionario", headerName: "Funcionário" },
        { field: "Ped_VlrTotal", headerName: "Valor Total" },
        { field: "Situacao", headerName: "Situação" },
        { field: "Ped_Codigo", headerName:"Ações", cellRendererFramework:(params) => 
        <div>
        </div>}
    ];

    const defaultColDef = {
        sortable: true,
        filter: true,
        floatingFilter: true,
        resizable: true,
        flex: flexOnOrNot()
    }
    
    const refreshGrid = async () => {
        const response = await getPedidos();
        setPedidos(response.data);
    }

    useEffect(() => {
        refreshGrid();
    }, []);

    return (
        <div className="Grid"> 
            <Grid align="right" marginBottom={1}>
                <ModalPedido/>
            </Grid>
            <div className="ag-theme-material" style={{ height: '600px'}}>
                <AgGridReact 
                    rowData={pedidos}
                    columnDefs={columnDefs} 
                    defaultColDef={defaultColDef}
                    localeText={AG_GRID_LOCALE_BR}
                />
            </div>
        </div>
    )
}

export default GridPedidos;