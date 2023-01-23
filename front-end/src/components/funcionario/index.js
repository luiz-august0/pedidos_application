import React from 'react';
import './styles.css';
import GridFuncionario from './GridFuncionario';
import imgFuncionario from '../../img/funcionarios.png'

const Funcionario = () => {

    return (
        <div className="container"> 
            <h1><img width="40" src={imgFuncionario}/>Funcionários</h1>
            <GridFuncionario/>
        </div>
    );
};

export default Funcionario;