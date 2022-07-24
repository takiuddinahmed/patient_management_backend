
import { Router } from 'express';
import Controller from '../../interfaces/controller.interface';
import Module from '../../interfaces/module';
import Service from '../../interfaces/service';
import UserController from './user.controller';
import UserService from './user.service';

class UserModule implements Module {
    controller: Controller = new UserController();
    router: Router = Router();
    path: string = '/auth';

    constructor() {
        this.initializeRouter();
    }

    public initializeRouter() {
        this.router.use(this.controller.router);
    }
}

export default UserModule;
