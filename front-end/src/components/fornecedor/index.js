import React from 'react';
import './styles.css';
import GridFornecedor from './GridFornecedor';
import imgFornecedor from '../../img/fornecedores.png'

const Fornecedor = () => {

    return (
        <div className="container"> 
            <h1><img width="40" src={imgFornecedor}/>Fornecedores</h1>
            <GridFornecedor/>
        </div>
    );
};

export default Fornecedor;