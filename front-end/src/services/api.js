import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:5000'
});

//Rota de sessão
export const createSession = async (usuario, senha) => {
    return api.put('/sessions', { usuario, senha });
};

//Rotas de Produto
export const getProdutos = async () => {
    return api.get(`/produto`);
};

export const createProduto = async (descricao, unidade, valorUni) => {
    return api.post('/produto', { descricao, unidade, valorUni });
};

export const updateProduto = async (produtoID, descricao, unidade, valorUni) => {
    return api.put(`/produto/${produtoID}`, { descricao, unidade, valorUni });
};

export const deleteProduto = async (produtoID) => {
    return api.delete(`/produto/${produtoID}`);
};

/**************************************************************/