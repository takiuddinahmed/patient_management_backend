import { Router } from "express";
import Controller from "../../interfaces/controller.interface";
import Module from "../../interfaces/module";
import Service from "../../interfaces/service";
import IotController from "./iot.controller";

class IotModule implements Module {
  controller: Controller = new IotController();
  router: Router = Router();
  path: string = "/iot";

  constructor() {
    this.initializeRouter();
  }

  public initializeRouter() {
    this.router.use(this.controller.router);
  }
}

export default IotModule;
