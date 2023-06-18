import express  from "express";
import { ClientController } from "./controller/client.controller";
import { AccountController } from "./controller/account.controller";
import { UserController } from "./controller/user.controller";

export function getRoutes() {
    const router = express.Router();

    const clientController = new ClientController();

    router.get('/clients', clientController.getAll);
    router.get('/clients/:id', clientController.getOne);
    router.post('/clients/', clientController.create);
    router.put('/clients/', clientController.update);
    router.delete('/clients/:id', clientController.delete);

    const accountController = new AccountController();

    router.get('/accounts', accountController.getAll);
    router.get('/accounts/:id', accountController.getOne);
    router.post('/accounts/', accountController.create);
    router.put('/accounts/', accountController.update);
    router.delete('/accounts/:id', accountController.delete);

    const userController = new UserController();

    router.get('/users', userController.getAll);
    router.get('/users/:id', userController.getOne);
    router.post('/users', userController.create);
    router.put('/users', userController.update);
    router.delete('/users/:id', userController.delete);

    return router;
}