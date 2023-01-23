import React from 'react';
import './styles.css';
import GridPedidos from './GridPedidos';
import imgPedido from '../../img/pedidos.png'

const Pedidos = () => {

    return (
        <div className="container"> 
            <h1><img width="40" src={imgPedido}/>Pedidos</h1>
            <GridPedidos/>
        </div>
    );
};

export default Pedidos;