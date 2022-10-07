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

//Rotas de estoque
export const addEstoqueProd = async (produtoID, quantidade) => {
    return api.post(`/estoque_adiciona/${produtoID}`, {qtd: quantidade});
};

//Rotas de cliente
export const getClientes = async () => {
    return api.get('/cliente');
}

export const createCliente = async (nome, cpf, cnpj, contato) => {
    return api.post('/cliente', { nome, cpf, cnpj, contato });
};

export const updateCliente = async (clienteID, nome, cpf, cnpj, contato) => {
    return api.put(`/cliente/${clienteID}`, { nome, cpf, cnpj, contato });
};

export const deleteCliente = async (clienteID) => {
    return api.delete(`/cliente/${clienteID}`);
};

