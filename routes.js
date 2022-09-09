import { Router } from "express";
import ClienteController from "./routes/ClienteController";

const routes = new Router();

//Rota Clientes
routes.get('/cliente', ClienteController.index);
routes.post('/cliente', ClienteController.create);
routes.get('/cliente/:id', ClienteController.show);
routes.put('/cliente/:id', ClienteController.update);

export default routes;