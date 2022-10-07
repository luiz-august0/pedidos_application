import React from 'react';
import './styles.css';
import GridCliente from './GridCliente';
//import imgProduto from '../../img/produtos.png'

const Cliente = () => {

    return (
        <div className="container"> 
            <h1><img width="40"/>Clientes</h1>
            <GridCliente/>
        </div>
    );
};

export default Cliente;