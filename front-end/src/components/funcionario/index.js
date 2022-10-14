import React from 'react';
import './styles.css';
import GridFuncionario from './GridFuncionario';
//import imgProduto from '../../img/produtos.png'

const Funcionario = () => {

    return (
        <div className="container"> 
            <h1><img width="40"/>Funcionários</h1>
            <GridFuncionario/>
        </div>
    );
};

export default Funcionario;