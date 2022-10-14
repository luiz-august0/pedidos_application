import React from 'react';
import './styles.css';
import GridFornecedor from './GridFornecedor';
//import imgProduto from '../../img/produtos.png'

const Fornecedor = () => {

    return (
        <div className="container"> 
            <h1><img width="40"/>Fornecedores</h1>
            <GridFornecedor/>
        </div>
    );
};

export default Fornecedor;