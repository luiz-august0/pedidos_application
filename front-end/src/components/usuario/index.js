import React from 'react';
import './styles.css';
import GridUsuario from './GridUsuario';
import imgUsuario from '../../img/usuarios.png'

const Usuario = () => {

    return (
        <div className="container"> 
            <h1><img width="40" src={imgUsuario}/>Usuários</h1>
            <GridUsuario/>
        </div>
    );
};

export default Usuario;