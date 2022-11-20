import React from 'react';
import './styles.css';
import GridPedidos from './GridPedidos';

const Pedidos = () => {

    return (
        <div className="container"> 
            <h1><img width="40"/>Pedidos</h1>
            <GridPedidos/>
        </div>
    );
};

export default Pedidos;