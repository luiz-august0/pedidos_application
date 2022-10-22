import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:5000'
});

//Rota de usuário
export const getUsuario = async (usuarioID) => {
    return api.get(`/usuario/${usuarioID}`);
};

//Rota de sessão
export const createSession = async (usuario, senha) => {
    return api.put('/sessions', { usuario, senha });
};

//Rotas de Produto
export const getProdutos = async () => {
    return api.get(`/produto`);
};

export const getProduto = async (produtoID) => {
    return api.get(`/produto/${produtoID}`);
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

//Rotas de Funcionario
export const getFuncionarios = async () => {
    return api.get(`/funcionario`);
}

export const createFuncionario = async (nome, cpf, contato) => {
    return api.post(`/funcionario`, { nome, cpf, contato });
};

export const updateFuncionario = async (funcionarioID, nome, cpf, contato) => {
    return api.put(`/funcionario/${funcionarioID}`, { nome, cpf, contato });
};

export const deleteFuncionario = async (funcionarioID) => {
    return api.delete(`/funcionario/${funcionarioID}`);
};

//Rotas Fornecedor
export const getFornecedores = async () => {
    return api.get(`/fornecedor`);
}

export const createFornecedor = async (nome, razaoSocial, cpf, cnpj, contato) => {
    return api.post(`/fornecedor`, { nome, razaoSocial, cpf, cnpj, contato });
};

export const updateFornecedor = async (fornecedorID, nome, razaoSocial, cpf, cnpj, contato) => {
    return api.put(`/fornecedor/${fornecedorID}`, { nome, razaoSocial, cpf, cnpj, contato });
};

export const deleteFornecedor = async (fornecedorID) => {
    return api.delete(`/fornecedor/${fornecedorID}`);
};

//Rotas de pedidos
export const getPedidos = async () => {
    return api.get('/pedido');
};

export const createPed = async (cod_cli, cod_func, vlrTotal, situacao) => {
    return api.post('/pedido', {cod_cli, cod_func, vlrTotal, situacao});
};

export const createItemPed = async (cod_pro, qtd, vlrTotal, idPedido) => {
    return api.post(`/pedido_item/${idPedido}`, {cod_pro, qtd, vlrTotal});
};
