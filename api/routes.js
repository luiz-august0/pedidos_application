import { Router } from "express";
import SessionController from "./routes/SessionController";
import UsuarioController from "./routes/UsuarioController";
import ClienteController from "./routes/ClienteController";
import FornecedorController from "./routes/FornecedorController";
import FuncionarioController from "./routes/FuncionarioController";
import ProdutoController from "./routes/ProdutoController";
import PedidoController from "./routes/PedidoController";
import EstoqueController from "./routes/EstoqueController";
import auth from "./middlewares/auth";

const routes = new Router();

routes.post('/usuario', UsuarioController.create);
routes.put('/sessions', SessionController.create);
routes.use(auth);

//Rotas usuário
routes.get('/usuario/:id', UsuarioController.show);
routes.put('/usuario/:id', UsuarioController.update);
routes.delete('/usuario/:id', UsuarioController.destroy);

//Rota Clientes
routes.get('/cliente', ClienteController.index);
routes.post('/cliente', ClienteController.create);
routes.get('/cliente/:id', ClienteController.show);
routes.put('/cliente/:id', ClienteController.update);
routes.delete('/cliente/:id', ClienteController.destroy);

//Rota Fornecedor
routes.get('/fornecedor', FornecedorController.index);
routes.post('/fornecedor', FornecedorController.create);
routes.get('/fornecedor/:id', FornecedorController.show);
routes.put('/fornecedor/:id', FornecedorController.update);
routes.delete('/fornecedor/:id', FornecedorController.destroy);

//Rota Funcionario
routes.get('/funcionario', FuncionarioController.index);
routes.post('/funcionario', FuncionarioController.create);
routes.get('/funcionario/:id', FuncionarioController.show);
routes.put('/funcionario/:id', FuncionarioController.update);
routes.delete('/funcionario/:id', FuncionarioController.destroy);

//Rota Produto
routes.get('/produto', ProdutoController.index);
routes.post('/produto', ProdutoController.create);
routes.get('/produto/:id', ProdutoController.show);
routes.put('/produto/:id', ProdutoController.update);
routes.delete('/produto/:id', ProdutoController.destroy);

//Rota Pedido
routes.get('/pedido', PedidoController.index);
routes.post('/pedido', PedidoController.createPed);
routes.get('/pedido/:id', PedidoController.showPed);
routes.put('/pedido/:id', PedidoController.updatePed);
routes.delete('/pedido/:id', PedidoController.deletePed);
routes.post('/pedido_item/:id', PedidoController.createPedItem);
routes.get('/pedido_item/:id', PedidoController.showPedItens);
routes.delete('/pedido_item/:id', PedidoController.deleteItemPed);
routes.put('/pedido_situacao/:id', PedidoController.updatePedSituacao);

//Rota de adição de estoque
routes.post('/estoque_adiciona/:id', EstoqueController.addEstoque);

export default routes;