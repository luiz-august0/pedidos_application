import React, { useState, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';
import { getProdutos, createProduto, updateProduto, deleteProduto, getFornecedores } from "../../services/api";

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
import 
{ 
    TextField, 
    Select,
    MenuItem,
    InputLabel,
    Button
} from '@mui/material';
import imgFiltro from '../../img/filtro.png'

const initialValue = {descricao: "", unidade: "", valorUni: "", fornecedor: "", qtde: ""};

const style = {
    headerButtons: {
        display: 'flex', 
        flexDirection: "row", 
        justifyContent: 'space-between'
    }
}

const GridProduto = () => {
    const MySwal = withReactContent(Swal);
    
    const [gridApi, setGridApi] = useState(null);
    const [produtos, setProdutos] = useState([]);
    const [fornecedores, setFornecedores] = useState([]);
    const [codFilter, setCodFilter] = useState('');
    const [descricaoFilter, setDescricaoFilter] = useState('');
    const [unidadeFilterSelected, setUnidadeFilterSelected] = useState(null);
    const [valorUniFilter, setValorUniFilter] = useState('');
    const [estoqueFilter, setEstoqueFilter] = useState('');
    const [fornecedorFilterSelected, setFornecedorFilterSelected] = useState(null);
    const [totalProdutos, setTotalProdutos] = useState(0);
    const [totalUni, setTotalUni] = useState(0);
    const [totalLiq, setTotalLiq] = useState(0);
    const [totalEst, setTotalEst] = useState(0);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(initialValue);

    const columnDefs = [
        { field: "Pro_Codigo", headerName: "Código", filter: false},
        { field: "Pro_Descricao", headerName: "Descrição", width: '600rem', filter: false},
        { field: "Pro_Unidade", headerName: "Unidade", filter: false},
        { field: "Pro_VlrUni", headerName: "Valor Unitário", filter: false},
        { field: "Pro_QtdEst", headerName: "Estoque" },
        { field: "Fornecedor", headerName: "Fornecedor", filter: false},
        { field: "For_Codigo", headerName: "Código Fornecedor", hide:true },
        { field: "Pro_Codigo", headerName:"Ações", filter: false, cellRendererFramework:(params) => 
        <div>
            <IconButton style={{ color: 'orange' }} onClick={() => handleUpdate(params.data)}>
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
        resizable: true
    }

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setFormData(initialValue);
    }

    const getDataFornecedores = async () => {
        const response = await getFornecedores();
        setFornecedores(response.data);
    };
    
    const refreshGrid = async (cod, descricao, unidade, valorUni, estoque, fornecedor) => {
        setLoading(true);
        await getProdutos(cod, descricao, unidade, valorUni, estoque, fornecedor)
            .then(res => {
                let data = res.data;
                let totalVlrUni = 0;
                let totalVlrLiq = 0;
                let totalQtdEst = 0;

                setProdutos(data);
                data.map((e) => {
                    totalVlrUni = totalVlrUni + parseFloat(e.Pro_VlrUni);
                    totalVlrLiq = totalVlrLiq + parseFloat(e.Pro_VlrUni * e.Pro_QtdEst);
                    totalQtdEst = totalQtdEst + parseFloat(e.Pro_QtdEst);
                })

                setTotalProdutos(data.length);
                setTotalUni(parseFloat(totalVlrUni));
                setTotalLiq(parseFloat(totalVlrLiq));
                setTotalEst(parseFloat(totalQtdEst));
                setLoading(false);
            })           
    }

    const limpaFiltros = () => {
        setCodFilter('');
        setDescricaoFilter('');
        setUnidadeFilterSelected(null);
        setValorUniFilter('');
        setEstoqueFilter('');
        setFornecedorFilterSelected(null);
        refreshGrid();
    }

    useEffect(() => {
        refreshGrid();
        getDataFornecedores();
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
        const descricao = formData.descricao;
        const unidade = formData.unidade;
        const valorUni = formData.valorUni;
        const fornecedor = formData.fornecedor;
        const qtde = formData.qtde;

        if(formData.id) {
            try {            
                await updateProduto(formData.id, descricao, unidade, valorUni, fornecedor);
                refreshGrid();
                handleClose();
                MySwal.fire({
                    html: <i>Produto alterado com sucesso!</i>,
                    icon: 'success'
                })
            } catch (error) {
                handleClose();
                MySwal.fire({
                    html: <i>{JSON.stringify(error.response.data).slice(0, -1).slice(1 | 1)}</i>,
                    icon: 'error'
                })
            }
        }else {
            try {           
                await createProduto(descricao, unidade, valorUni, fornecedor, qtde);
                refreshGrid();
                handleClose();
                MySwal.fire({
                    html: <i>Produto cadastrado com sucesso!</i>,
                    icon: 'success'
                })
            } catch (error) {
                handleClose();
                MySwal.fire({
                    html: <i>{JSON.stringify(error.response.data).slice(0, -1).slice(1 | 1)}</i>,
                    icon: 'error'
                })
            }
        }
    }

    const handleUpdate = (oldData) => {
        setFormData({id: oldData.Pro_Codigo, descricao: oldData.Pro_Descricao, unidade: oldData.Pro_Unidade, valorUni: oldData.Pro_VlrUni, fornecedor: oldData.For_Codigo, qtde: oldData.Pro_QtdEst});
        handleClickOpen();
    }

    //Deleta registro
    const handleDelete = (id) => {
        const deleteRegister = async () => {
            try {
                await deleteProduto(id);
                MySwal.fire({
                    html: <i>Produto excluido com sucesso!</i>,
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
            title: 'Confirma a exclusão do Produto?',
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
                <div className="divFilters">
                    <h1><img width="40" src={imgFiltro}/>Filtros</h1>
                    <TextField id="cod" value={codFilter} onChange={e => setCodFilter(e.target.value)} placeholder="Código" variant="outlined" label="Código" margin="dense" fullWidth type={'number'}/>
                    <TextField id="descricao" value={descricaoFilter} onChange={e => setDescricaoFilter(e.target.value)} placeholder="Descrição" variant="outlined" margin="dense" label="Descrição" fullWidth type={'text'}/>
                    <InputLabel id="demo-simple-select-label">Unidade</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="unidade"
                    value={unidadeFilterSelected}
                    label="Unidade"
                    onChange={e => setUnidadeFilterSelected(e.target.value)}
                    >
                        <MenuItem value={'UN'}>Unidade</MenuItem> 
                        <MenuItem value={'KG'}>Kilograma</MenuItem> 
                        <MenuItem value={'PCT'}>Pacote</MenuItem> 
                    </Select>
                    <TextField id="valorUni" value={valorUniFilter} onChange={e => setValorUniFilter(e.target.value)} placeholder="Valor Unitário" variant="outlined" label="Valor Unitário" margin="dense" fullWidth type={'number'}/>
                    <TextField id="qtde" value={estoqueFilter} onChange={e => setEstoqueFilter(e.target.value)} placeholder="Quantidade de estoque mínima" variant="outlined" label="Quantidade de estoque mínima" margin="dense" fullWidth type={'number'}/>
                    <InputLabel id="demo-simple-select-label">Fornecedor</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="fornecedor"
                    value={fornecedorFilterSelected}
                    label="Fornecedor"
                    onChange={e => setFornecedorFilterSelected(e.target.value)}
                    >
                        {fornecedores.map((element) => {
                            return (
                                <MenuItem key={element.For_Codigo} value={element.For_Codigo}>{element.For_Codigo} - {element.For_Nome}</MenuItem> 
                            )
                        })}
                    </Select>
                    <div className="divButtonsFilter">
                        <Button 
                        onClick={() => refreshGrid(codFilter, descricaoFilter, unidadeFilterSelected, valorUniFilter, estoqueFilter, fornecedorFilterSelected)} 
                        color="primary" 
                        variant="contained">
                            Filtrar
                        </Button>
                        <Button color="secondary" onClick={() => limpaFiltros()} variant="outlined">
                            Limpar Filtros
                        </Button>
                    </div>
                </div>
                <IconButton style={{ color: '#000', fontSize: '18px', fontWeight: 'bold'}} onClick={handleClickOpen}>
                    Adicionar
                    <Icon.AddCircle style={{ height: '45px', width: '45px', color: '#43d138'}}/>
                </IconButton>
            </Grid>
            <div className="ag-theme-material" style={{ height: '600px' }}>
                {!loading ?
                    <AgGridReact 
                    rowData={produtos}
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
            <div className="divTotais">
                <h1>{`Total de Produtos: ${totalProdutos}`}</h1>
                <h1>{`Valor Unitário Total: R$${totalUni}`}</h1>
                <h1>{`Valor Líquido Total: R$${totalLiq}`}</h1>
                <h1>{`Quantidade Total de Estoque: ${totalEst}`}</h1>
            </div>
        </div>
    )
}

export default GridProduto;