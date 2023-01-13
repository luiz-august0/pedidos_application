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
import { getItensPed, deleteItemPed } from "../../services/api";

const initialValue = {codigo: "", qtdProd: "", valorUni: 0, valorTotal: 0, editMode: false};

const GridItensPed = ({idPedido, situacaoPed}) => {
	const [gridApi, setGridApi] = useState(null);
    const [itens, setItens] = useState([]);
    const [formData, setFormData] = useState(initialValue);
    const [open, setOpen] = useState(false);
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
        { field: "Pro_Codigo", headerName:"Ações", cellRendererFramework:(params) => 
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

    const calculaTotalItens = () => {
        let total = 0;
        itens.map((e) => {
            total = parseFloat(total) + parseFloat(e.PedItm_VlrTotal);
        });
        return parseFloat(total).toFixed(2);
    }

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setFormData(initialValue);
    }

    const onChange = (field, value) => {
        setFormData({...formData,[field]:value})
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

    const handleFormSubmit = (codigo, produto, qtd, valorUni, valorTotal, editMode) => {
        const postItem = () => {
            setItens([...itens, {codigo: codigo, produto: produto, qtd: qtd, valorUni: valorUni, valorTotal: valorTotal}]);
        }

        const editItem = () => {
            let newArrayItens = [];
            itens.map((e) => {
                if (e.codigo !== codigo) {
                    newArrayItens.push({codigo: e.codigo, produto: e.produto, qtd: e.qtd, valorUni: e.valorUni, valorTotal: e.valorTotal});
                }
            });
            newArrayItens.push({codigo: codigo, produto: produto, qtd: qtd, valorUni: valorUni, valorTotal: valorTotal});
            setItens(newArrayItens);
        }

        if (!editMode) {
            if (!verificaItemExistente(codigo)) {
                postItem()
            }
        } else {
            editItem()
        }
        handleClose();
        refreshGrid();
    }

	const onGridReady = (params) => {
        setGridApi(params)
    }

    const handleUpdate = (oldData) => {
        setFormData({codigo: oldData.codigo, qtd: oldData.qtd, valorUni: oldData.valorUni, valorTotal: oldData.valorTotal, editMode: true});
        handleClickOpen();
    }

    const handleDelete = async(id) => {
        const deleteRegister = async () => {
            try {
                await deleteItemPed(idPedido, id);
                MySwal.fire({
                    html: <i>Item excluido com sucesso!</i>,
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
            title: 'Confirma a exclusão do Item?',
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
			{situacaoPed === 'ABERTO'?
			<IconButton style={{ color: '#fff', fontSize: '18px', fontWeight: 'bold'}} onClick={handleClickOpen}>
			<Icon.AddCircle style={{ height: '45px', width: '45px', color: '#43d138'}}/>
			</IconButton>:null}
            </Grid>
            <div className="ag-theme-material" style={{ height: '400px', width: '100vh'}}>
                <AgGridReact 
                    rowData={itens}
                    columnDefs={columnDefs} 
                    defaultColDef={defaultColDef}
					onGridReady={onGridReady}
                    localeText={AG_GRID_LOCALE_BR}
					gridOptions={{paginationAutoPageSize: true, pagination: true}}
                />
            </div>
            <h2 style={{color: '#000', textAlign: 'right'}}>Total do Pedido: R${calculaTotalItens()}</h2>
        </div>
    )
}

export default GridItensPed;