import { Router } from "express";
import ClienteController from "./routes/ClienteController";

const routes = new Router();

routes.get('/cliente', ClienteController.index);
routes.post('/cliente', ClienteController.create);

export default routes;