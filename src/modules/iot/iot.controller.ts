import { NextFunction, Request, Response, Router } from "express";
import Controller from "../../interfaces/controller.interface";
import IotService from "./iot.service";

class IotController implements Controller {
  public router: Router = Router();
  public service: IotService;

  constructor() {
    this.initializeRoutes();
    this.service = new IotService();
  }

  public initializeRoutes() {
    this.router.get("/add/:msg", this.addMsg);
    this.router.get("/update/:msg", this.updateMsg);
    this.router.get("/", this.getMsg);
  }

  getMsg = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const added = await this.service.getMsg();
      res.json(added);
    } catch (err) {
      next(err);
    }
  };

  addMsg = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { msg } = req.params;
      const added = await this.service.addMsg(msg);
      res.json(added);
    } catch (err) {
      next(err);
    }
  };

  updateMsg = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { msg } = req.params;
      const update = await this.service.updateMsg(msg);
      res.json(update);
    } catch (err) {
      next(err);
    }
  };
}

export default IotController;
