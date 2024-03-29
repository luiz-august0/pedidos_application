import React, { useState, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';
import { 
    getPedidos, 
    updatePedSituacao, 
    deletePedido,
    addEstoqueProd, 
    getItensPed, 
    getReportPed, 
    getPedidoDetails 
} from "../../services/api";
import ModalPedido from "./ModalPedido";
import ModalPedidoItens from "./ModalPedidoItens";
import FormDialogFechaPedido from "./DialogFechaPedido";

import Grid from '@mui/material/Grid'
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import { AG_GRID_LOCALE_BR } from "../../globalFunctions";
import { Button, IconButton } from "@mui/material";
import * as Icon from '@mui/icons-material';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import moment from 'moment';
import { Oval } from  'react-loader-spinner';

const style = {
    headerButtons: {
        display: 'flex', 
        flexDirection: "row", 
        justifyContent: 'space-between'
    }
}

const GridPedidos = () => {
    const [gridApi, setGridApi] = useState(null);
    const [pedidos, setPedidos] = useState([]);
    const [valorTotalFechamento, setValorTotalFechamento] = useState();
    const [idPedidoFechamento, setIdPedidoFechamento] = useState();
    const [openModalFechaPed, setOpenModalFechaPed] = useState(false);
    const [loading, setLoading] = useState(false);
    const MySwal = withReactContent(Swal);

    const onGridReady = (params) => {
        setGridApi(params)
    }

    const handleGetReport = async(idPedido) => {
        const resDataPedido = await getPedidoDetails(idPedido);
        const resDataPedidoItens = await getItensPed(idPedido);
        const response = await getReportPed(idPedido, resDataPedido.data, resDataPedidoItens.data);
        const pdfContentType = 'application/pdf';

        const base64toBlob = (data) => {
            const base64WithoutPrefix = data.substr(`data:${pdfContentType};base64,`.length);

            const bytes = atob(base64WithoutPrefix);
            let length = bytes.length;
            let out = new Uint8Array(length);

            while (length--) {
                out[length] = bytes.charCodeAt(length);
            }

            return new Blob([out], { type: pdfContentType });
        };

        const url = URL.createObjectURL(base64toBlob(response.data));

        window.location.assign(url);
    }

    const handleDeletePed = async(idPedido) => {
        const deleteRegister = async() => {
            const responseItens = await getItensPed(idPedido);
            const itens = responseItens.data;
    
            itens.map(async(e) => {
                try {
                    await addEstoqueProd(e.Pro_Codigo, e.PedItm_Qtd);   
                } catch (error) {
                    alert(error);
                }
            })
    
            try {
                await deletePedido(idPedido);
                MySwal.fire({
                    html: <i>Pedido excluido com sucesso!</i>,
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
            title: 'Confirma a exclusão do Pedido?',
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

    const handleCallFechamento = (idPedido, valorTotalPed) => {
        setIdPedidoFechamento(idPedido);
        setValorTotalFechamento(valorTotalPed);
        setOpenModalFechaPed(true);
    }

    const handleCloseFechaPed = () => {
        setOpenModalFechaPed(false);
    }

    const handleSubmitFechaPed = async(vbAllowed) => {
        if (vbAllowed) {
            try {            
                await updatePedSituacao(idPedidoFechamento, "F");
                refreshGrid();
                handleCloseFechaPed();
                MySwal.fire({
                    html: <i>Situação do pedido alterada com sucesso!</i>,
                    icon: 'success'
                })
            } catch (error) {
                handleCloseFechaPed();
                MySwal.fire({
                    html: <i>{JSON.stringify(error.response.data).slice(0, -1).slice(1 | 1)}</i>,
                    icon: 'error'
                })
            }
        }
    }

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
        { field: "Ped_Data", headerName: "Data", filter: 'agDateColumnFilter',
        valueFormatter: function (params) { return moment(params.data.Ped_Data).format('DD/MM/YYYY')},
        filterParams: {
           debounceMs: 500,
           suppressAndOrCondition: true,
           comparator: function(filterLocalDateAtMidnight, cellValue) {
             if (cellValue == null) {
               return 0;
             }
             var cellValueFormated = moment(cellValue).format('DD/MM/YYYY');
             var dateParts = cellValueFormated.split('/');
             var year = Number(dateParts[2]);
             var month = Number(dateParts[1]) - 1;
             var day = Number(dateParts[0]);
             var cellDate = new Date(year, month, day);
   
             if (cellDate < filterLocalDateAtMidnight) {
               return -1;
             } else if (cellDate > filterLocalDateAtMidnight) {
               return 1;
             } else {
               return 0;
             }
           }
       }},
        { field: "Ped_Codigo", headerName:"Ações", cellRendererFramework:(params) => 
        <div>
            <ModalPedidoItens idPedido={params.value} situacaoPed={params.data.Situacao} refreshGrid={refreshGrid}/>
            <Button variant="outlined" color="secondary" onClick={() => handleDeletePed(params.value)}>Excluir</Button>
        </div>},
        { cellRendererFramework:(params) => 
        <div>
            {params.data.Situacao === 'ABERTO'?
            <Button variant="outlined" color="secondary" onClick={() => handleCallFechamento(params.data.Ped_Codigo,params.data.Ped_VlrTotal)}>Fechamento</Button>:null}
        </div>},
        { cellRendererFramework:(params) => 
        <div>
            <Button variant="outlined" color="primary" onClick={() => handleGetReport(params.data.Ped_Codigo)}>Imprimir</Button>
        </div>}
    ];

    const defaultColDef = {
        sortable: true,
        filter: true,
        floatingFilter: true,
        resizable: true
    }
    
    const refreshGrid = async () => {
        setLoading(true);
        await getPedidos()
            .then(res => {
                setPedidos(res.data);
                setLoading(false);
            });
    }

    useEffect(() => {
        refreshGrid();
    }, []);

    return (
        <div className="Grid"> 
            <Grid align="right" marginBottom={1}>
                <div style={style.headerButtons}>
                    {!loading?
                    <IconButton onClick={refreshGrid}>
                        <Icon.Cached style={{ height: '45px', width: '45px', color: '#1976d2'}}/>
                    </IconButton>
                    :<div></div>}
                    <ModalPedido handleRefreshPedidos={handleRefreshPedidos}/>
                </div>
            </Grid>
            <div className="ag-theme-material" style={{ height: '600px'}}>
                {!loading ?
                    <AgGridReact 
                    rowData={pedidos}
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
            <FormDialogFechaPedido
            openModalFechaPed={openModalFechaPed} 
            handleCloseFechaPed={handleCloseFechaPed}
            handleSubmitFechaPed={handleSubmitFechaPed}
            valorTotal={valorTotalFechamento}
            />
        </div>
    )
}

export default GridPedidos;