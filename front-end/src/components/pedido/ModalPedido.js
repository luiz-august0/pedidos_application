import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import { Button, InputLabel, Select, MenuItem } from '@mui/material';
import { getClientes, getFornecedores, getFuncionarios } from '../../services/api'
import './ModalPedido.css';
import GridItens from './GridItens';

const ModalPedido = (idPedido) => {
    const [ clientes, setClientes ] = useState([]);
    const [ clienteSelected, setClienteSelected ] = useState();
    const [ funcionarios, setFuncionarios ] = useState([]);
    const [ funcionarioSelected, setFuncionarioSelected ] = useState();
    const [ situacaoSelected, setSituacaoSelected ] = useState();

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
        localStorage.setItem('cliente', event.target.value);
    }

    const handleChangeFuncionario = (event) => {
        setFuncionarioSelected(event.target.value);
        localStorage.setItem('funcionario', event.target.value);
    }

    const handleChangeSituacao = (event) => {
        setSituacaoSelected(event.target.value);
        localStorage.setItem('situacao', event.target.value);
    }

    return (
        <Popup 
            trigger={<Button color='primary' variant='contained'>Adicionar</Button>}
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
                                <div>
                                    <InputLabel required id="demo-simple-select-label">Cliente</InputLabel>
                                    <Select
                                    id="cliente" 
                                    value={clienteSelected}
                                    label="Cliente"
                                    onChange={handleChangeCliente}
                                    style={{width: '250px'}}
                                    >
                                        {clientes.map((element) => {
                                            return (
                                                <MenuItem value={element.Cli_Codigo}>{element.Cli_Codigo} - {element.Cli_Nome}</MenuItem> 
                                            )
                                        })}
                                    </Select>
                                </div>
                                <div>
                                    <InputLabel required id="demo-simple-select-label">Funcionário</InputLabel>
                                    <Select
                                    id="funcionario" 
                                    value={funcionarioSelected}
                                    label="Funcionário"
                                    onChange={handleChangeFuncionario}
                                    style={{width: '250px'}}
                                    >
                                        {funcionarios.map((element) => {
                                            return (
                                                <MenuItem value={element.Fun_Codigo}>{element.Fun_Codigo} - {element.Fun_Nome}</MenuItem> 
                                            )
                                        })}
                                    </Select>
                                </div>
                                <div>
                                    <InputLabel required id="demo-simple-select-label">Situação do Pedido</InputLabel>
                                    <Select
                                    id="situacao" 
                                    value={situacaoSelected}
                                    label="Situação"
                                    onChange={handleChangeSituacao}
                                    style={{width: '250px'}}
                                    >
                                        <MenuItem value={"A"}>A - ABERTO</MenuItem> 
                                        <MenuItem value={"F"}>F - FECHADO</MenuItem>            
                                    </Select>
                                </div>
                            </form>
                            <GridItens/>
                    </div>
                    <div className="actions">
                    </div>
                </div>
            )}
        </Popup>
    );
} 

export default ModalPedido;