import React, { useState, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';
import { getPedidos} from "../../services/api";
import ModalPedido from "./ModalPedido";
import ModalPedidoItens from "./ModalPedidoItens";

import Grid from '@mui/material/Grid'
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import { AG_GRID_LOCALE_BR, flexOnOrNot } from "../../globalFunctions";
import { Button } from "@mui/material";

const GridPedidos = () => {
    const [pedidos, setPedidos] = useState([]);

    const handleRefreshPedidos = () => {
        refreshGrid();
    }

    const columnDefs = [
        { field: "Ped_Codigo", headerName: "Código"},
        { field: "Cliente", headerName: "Cliente" },
        { field: "Funcionario", headerName: "Funcionário" },
        { field: "Ped_VlrTotal", headerName: "Valor Total" },
        { field: "Situacao", headerName: "Situação", cellStyle: params => {
            if (params.value === 'FECHADO') {
                return {color: 'red'};
            } else {
                return {color: 'green'};   
            }}
        },
        { field: "Ped_Codigo", headerName:"Ações", cellRendererFramework:(params) => 
        <div>
            <ModalPedidoItens idPedido={params.value} situacaoPed={params.data.Situacao}/>
            <Button variant="outlined" color="secondary">Excluir</Button>
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
                <ModalPedido handleRefreshPedidos={handleRefreshPedidos}/>
            </Grid>
            <div className="ag-theme-material" style={{ height: '600px'}}>
                <AgGridReact 
                    rowData={pedidos}
                    columnDefs={columnDefs} 
                    defaultColDef={defaultColDef}
                    localeText={AG_GRID_LOCALE_BR}
                    gridOptions={{paginationAutoPageSize: true, pagination: true}}
                />
            </div>
        </div>
    )
}

export default GridPedidos;