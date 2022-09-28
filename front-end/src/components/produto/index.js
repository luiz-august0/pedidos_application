import React from 'react';
import './styles.css';
import GridProduto from './GridProduto';
import imgProduto from '../../img/produtos.png'

const Produto = () => {

    return (
        <div className="container"> 
            <h1><img width="40" src={imgProduto}/>Produtos</h1>
            <GridProduto/>
        </div>
    );
};

export default Produto;