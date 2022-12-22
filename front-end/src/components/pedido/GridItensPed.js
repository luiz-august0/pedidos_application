import React, { useState, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';
import Grid from '@mui/material/Grid'
import * as Icon from '@mui/icons-material';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { AG_GRID_LOCALE_BR, flexOnOrNot } from "../../globalFunctions";
import { IconButton } from "@mui/material";
import { getItensPed } from "../../services/api";

const GridItensPed = ({idPedido, situacaoPed}) => {
	const [gridApi, setGridApi] = useState(null);
    const [itens, setItens] = useState([]);
    const [open, setOpen] = useState(false);
    const [openModalFechaPed, setOpenModalFechaPed] = useState(false);
    const MySwal = withReactContent(Swal);

    const columnDefs = [
        { field: "Pro_Codigo", headerName: "Código", hide:true},
        { field: "Produto", headerName: "Produto" },
        { field: "Pro_Unidade", headerName: "Unidade" },
        { field: "PedItm_Qtd", headerName: "Quantidade" },
        { headerName: "Valor Uni", cellRendererFramework:(params) => {
            let valorUni = parseFloat(params.data.PedItm_VlrTotal) / parseFloat(params.data.PedItm_Qtd);
            return (
                <div>
                    {parseFloat(valorUni)}
                </div>
            )
        }},
        { field: "PedItm_VlrTotal", headerName: "Valor Total" },
        { field: "codigo", headerName:"Ações", cellRendererFramework:(params) => 
        <div>
			{situacaoPed === 'ABERTO'?
			<div>
				<IconButton style={{ color: 'orange' }}>
					<Icon.ModeEdit/>
				</IconButton>
                {itens.length > 1 ? 
                <IconButton style={{ color: 'red' }} onClick={() => handleDelete(params.value)}>
                    <Icon.Delete/>
                </IconButton>:null}
			</div>:null}
        </div>}
    ];

	const refreshGrid = async () => {
        const response = await getItensPed(idPedido);
        setItens(response.data);
    }

	useEffect(() => {
        refreshGrid();
    }, []);

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

    const handleClickOpenFechaPed = () => {
        setOpenModalFechaPed(true);
    }

    const handleCloseFechaPed = () => {
        setOpenModalFechaPed(false);
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

	const onGridReady = (params) => {
        setGridApi(params)
    }

    const handleDelete = (id) => {

    }

    return (
        <div className="Grid"> 
            <Grid align="right" marginBottom={1}>
			{situacaoPed === 'ABERTO'?
			<IconButton style={{ color: '#fff', fontSize: '18px', fontWeight: 'bold'}} onClick={handleClickOpen}>
			<Icon.AddCircle style={{ height: '45px', width: '45px', color: '#43d138'}}/>
			</IconButton>:null}
            </Grid>
            <div className="ag-theme-material" style={{ display: 'table-cell', height: '400px', width: '100vh'}}>
                <AgGridReact 
                    rowData={itens}
                    columnDefs={columnDefs} 
                    defaultColDef={defaultColDef}
					onGridReady={onGridReady}
                    localeText={AG_GRID_LOCALE_BR}
					gridOptions={{paginationAutoPageSize: true, pagination: true}}
                />
            </div>
        </div>
    )
}

export default GridItensPed;