import React, { useState, createContext, useEffect } from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from "react-router-dom";

import { api, createSession, showUsuario } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const usuarioRecuperado = localStorage.getItem("usuario");
        const token = localStorage.getItem('token');

        const getDataFuncionario = async(idUsuario) => {
            const responseUsuario = await showUsuario(idUsuario);
            const usuarioData = responseUsuario.data;
            let isFuncionario = false;
            const idFunc = usuarioData[0].Fun_Codigo;
            if (idFunc) {
                isFuncionario = true
            }
            localStorage.setItem("isFuncionario", isFuncionario);
        }

        if(usuarioRecuperado && token) {
            setUsuario(JSON.parse(usuarioRecuperado));
            api.defaults.headers.Authorization = `Bearer ${token}`;
            getDataFuncionario(JSON.parse(usuarioRecuperado).id);
        }

        setLoading(false);
    }, []);

    const login = async (usuario, senha) => {
        const MySwal = withReactContent(Swal);

        try {            
            const response = await createSession(usuario, senha);
            const usuarioLogado = response.data.usuario;
            const token = response.data.token;
    
            localStorage.setItem("usuario", JSON.stringify(usuarioLogado));
            localStorage.setItem("token", token);
            api.defaults.headers.Authorization = `Bearer ${token}`;
            
            const responseUsuario = await showUsuario(usuarioLogado.id);
            const usuarioData = responseUsuario.data;
            let isFuncionario = false;
            const idFunc = usuarioData[0].Fun_Codigo;
            if (idFunc) {
                isFuncionario = true
            }
            localStorage.setItem("isFuncionario", isFuncionario);
            
            setUsuario(usuarioLogado);
            navigate("/");
        } catch (error) {
            MySwal.fire({
                html: <i>Usuário ou senha inválido</i>,
                icon: 'error'
            })
        }
    };

    const logout = () => {
        
        localStorage.removeItem("usuario");
        localStorage.removeItem("token");
        localStorage.removeItem("isFuncionario");
        
        api.defaults.headers.Authorization = null;
        
        setUsuario(null);
        navigate("/login");
    };

    return (
        <AuthContext.Provider 
        value={{authenticated: !!usuario, usuario, loading, login,
        logout}}
        >
            {children}
        </AuthContext.Provider>
    );
};