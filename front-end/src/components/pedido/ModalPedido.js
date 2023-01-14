import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import { IconButton, Button, InputLabel, Select, MenuItem } from '@mui/material';
import { getClientes, getFuncionarios } from '../../services/api'
import * as Icon from '@mui/icons-material';
import './ModalPedido.css';
import GridItens from './GridItens';

const ModalPedido = ({handleRefreshPedidos}) => {
    const [ clientes, setClientes ] = useState([]);
    const [ clienteSelected, setClienteSelected ] = useState('');
    const [ funcionarios, setFuncionarios ] = useState([]);
    const [ funcionarioSelected, setFuncionarioSelected ] = useState('');
    const [ situacaoSelected, setSituacaoSelected ] = useState('A');

    const handleRefresh = () => {
        handleRefreshPedidos();
    }

    const getDataClientes = async () => {
        const response = await getClientes();
        setClientes(response.data);
    }

    const getDataFuncionarios = async () => {
        const response = await getFuncionarios();
        setFuncionarios(response.data);
    }

    useEffect(() => {
        getDataClientes();
        getDataFuncionarios();
    }, []);

    const handleChangeCliente = (event) => {
        setClienteSelected(event.target.value);
    }

    const handleChangeFuncionario = (event) => {
        setFuncionarioSelected(event.target.value);
    }

    const handleChangeSituacao = (event) => {
        setSituacaoSelected(event.target.value);
    }

    return (
        <Popup 
            trigger={<IconButton style={{ color: '#000', fontSize: '18px', fontWeight: 'bold'}}>
                        Adicionar
                        <Icon.AddCircle style={{ height: '45px', width: '45px', color: '#43d138'}}/>
                    </IconButton>}
            modal
            nested
            >
            {close => (
                <div className="modal">
                    <button className="close" onClick={close}>
                        &times;
                    </button>
                    <div className="header">Pedido</div>
                    <div className="content">
                        <form>
                            <div className='input-div'>
                                <InputLabel required id="demo-simple-select-label">Cliente</InputLabel>
                                <Select
                                id="cliente" 
                                value={clienteSelected}
                                label="Cliente"
                                onChange={handleChangeCliente}
                                className='select'
                                >
                                    {clientes.map((element) => {
                                        return (
                                            <MenuItem value={element.Cli_Codigo}>{element.Cli_Codigo} - {element.Cli_Nome}</MenuItem> 
                                        )
                                    })}
                                </Select>
                            </div>
                            <div className='input-div'>
                                <InputLabel required id="demo-simple-select-label">Funcionário</InputLabel>
                                <Select
                                id="funcionario" 
                                value={funcionarioSelected}
                                label="Funcionário"
                                onChange={handleChangeFuncionario}
                                className='select'
                                >
                                    {funcionarios.map((element) => {
                                        return (
                                            <MenuItem value={element.Fun_Codigo}>{element.Fun_Codigo} - {element.Fun_Nome}</MenuItem> 
                                        )
                                    })}
                                </Select>
                            </div>
                            <div className='input-div'>
                                <InputLabel required id="demo-simple-select-label">Situação do Pedido</InputLabel>
                                <Select
                                id="situacao" 
                                value={situacaoSelected}
                                label="Situação"
                                onChange={handleChangeSituacao}
                                className='select'
                                >
                                    <MenuItem value={"A"}>A - ABERTO</MenuItem> 
                                    <MenuItem value={"F"}>F - FECHADO</MenuItem>            
                                </Select>
                            </div>
                        </form>
                        <GridItens 
                        data={[clienteSelected, funcionarioSelected, situacaoSelected]}
                        closePopup={close}
                        handleRefresh={handleRefresh}/>
                    </div>
                    <div className="actions">
                    </div>
                </div>
            )}
        </Popup>
    );
} 

export default ModalPedido;