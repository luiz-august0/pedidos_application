import axios from "axios";

export const api = axios.create({
    baseURL: 'https://api-pedidos-luiz-august0.vercel.app'
});

//Rota de usuário
export const getUsuario = async () => {
    return api.get('/usuario');
};

export const showUsuario = async (usuarioID) => {
    return api.get(`/usuario/${usuarioID}`);
};

export const createUsuario = async (usuario, senha, codFuncionario) => {
    return api.post('/usuario', { usuario, senha, codFuncionario });
};

export const updateUsuario = async (usuarioID, usuario, senha, codFuncionario) => {
    return api.put(`/usuario/${usuarioID}`, { usuario, senha, codFuncionario });
};

export const deleteUsuario = async (usuarioID) => {
    return api.delete(`/usuario/${usuarioID}`);
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

export const createProduto = async (descricao, unidade, valorUni, fornecedor) => {
    return api.post('/produto', { descricao, unidade, valorUni, fornecedor });
};

export const updateProduto = async (produtoID, descricao, unidade, valorUni, fornecedor) => {
    return api.put(`/produto/${produtoID}`, { descricao, unidade, valorUni, fornecedor });
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

export const getItensPed = async (idPedido) => {
    return api.get(`/pedido_item/${idPedido}`);
};

export const createPed = async (cod_cli, cod_func, vlrTotal, situacao) => {
    return api.post('/pedido', {cod_cli, cod_func, vlrTotal, situacao});
};

export const createItemPed = async (cod_pro, qtd, vlrTotal, idPedido) => {
    return api.post(`/pedido_item/${idPedido}`, {cod_pro, qtd, vlrTotal});
};

export const deleteItemPed = async (idPedido, cod_pro) => {
    return api.delete(`/pedido_item/${idPedido}/${cod_pro}`);
};

export const updatePedSituacao = async (idPedido, situacao) => {
    return api.put(`/pedido_situacao/${idPedido}`, { situacao });
};

export const deletePedido = async (idPedido) => {
    return api.delete(`/pedido/${idPedido}`);
};