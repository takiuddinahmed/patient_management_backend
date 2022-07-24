import { NextFunction, Request, Response, Router } from "express";
import Controller from "../../interfaces/controller.interface";
import ReqWithUser from "../../interfaces/reqWithUser.interface";
import authMiddleware, { checkRoles } from "../../middlewares/auth.middleware";
import ValidateDto from "../../utils/validate.dto";
import EditUserDto from "./dto/editUser.dto";
import LoginDto from "./dto/login.dto";
import RegisterDto from "./dto/register.dto";
import UserRole from "./enum/role.enum";
import UserService from "./user.service";

class UserController implements Controller {
  public router: Router = Router();
  public service: UserService;

  constructor() {
    this.initializeRoutes();
    this.service = new UserService();
  }

  public initializeRoutes() {
    this.router.post("/register", this.register);
    this.router.post("/login", this.login);
    this.router.use(authMiddleware);
    this.router.get("/all", this.getAllUser);
    this.router.put("/edit", this.editUser);
    this.router.delete("/:userId", this.deleteUser);
  }
  private register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data: RegisterDto = await ValidateDto<RegisterDto>(
        RegisterDto,
        req.body
      );
      res.status(201);
      const resData = await this.service.register(data);
      res.send(resData);
    } catch (err) {
      console.log({ err });
      next(err);
    }
  };
  private login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const loginData: LoginDto = await ValidateDto<LoginDto>(
        LoginDto,
        req.body
      );
      const response = await this.service.login(loginData);
      res.send(response);
    } catch (error) {
      console.log({ error });
      next(error);
    }
  };

  private getAllUser = async (
    req: ReqWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const resData = await this.service.getAllUser();
      res.send(resData);
    } catch (err) {
      next(err);
    }
  };
  private editUser = async (
    req: ReqWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const editUserData = await ValidateDto<EditUserDto>(
        EditUserDto,
        req.body
      );

      const resData = await this.service.editUser(editUserData);
      res.send(resData);
    } catch (err) {
      next(err);
    }
  };
  private deleteUser = async (
    req: ReqWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.params.userId;
      const resData = await this.service.deleteUser(userId);
      res.send(resData);
    } catch (err) {
      next(err);
    }
  };
}

export default UserController;
