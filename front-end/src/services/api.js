import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:5000'
});

//Rota de sessão
export const createSession = async (usuario, senha) => {
    return api.put('/sessions', { usuario, senha });
};
/**************************************************************/