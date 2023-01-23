import React from 'react';
import './styles.css';
import GridCliente from './GridCliente';
import imgCliente from '../../img/clientes.png'

const Cliente = () => {

    return (
        <div className="container"> 
            <h1><img width="40" src={imgCliente}/>Clientes</h1>
            <GridCliente/>
        </div>
    );
};

export default Cliente;