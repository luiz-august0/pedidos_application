import React from 'react';
import './styles.css';
import GridUsuario from './GridUsuario';
//import imgProduto from '../../img/produtos.png'

const Usuario = () => {

    return (
        <div className="container"> 
            <h1><img width="40"/>Usuários</h1>
            <GridUsuario/>
        </div>
    );
};

export default Usuario;