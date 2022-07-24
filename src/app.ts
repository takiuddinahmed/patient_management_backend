import express, {
    ErrorRequestHandler,
    NextFunction,
    RequestHandler,
    Response,
} from 'express';
import morgan from 'morgan';
import HttpException from './exceptions/http.exception';
import Module from './interfaces/module';

class App {
    public modules: Array<Module>;
    public app: express.Application;

    constructor(_modules: Array<Module>) {
        this.modules = _modules;
        this.app = express();
        this.initMiddleware();
        this.initRoutes();
        this.initErrors();
    }

    public initMiddleware() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(morgan('combined'));
    }

    public initRoutes() {
        this.modules.forEach((module) => {
            this.app.use(module.path, module.router);
        });
    }

    public initErrors() {
        this.app.use(this.notFound);
        this.app.use(this.errorReqHandler);
    }

    public notFound: RequestHandler = (req, res, next: NextFunction) => {
        const error: HttpException = new HttpException(
            404,
            `Not Found -> ${req.originalUrl}`
        );
        next(error);
    };

    public errorReqHandler: ErrorRequestHandler = (
        err: HttpException,
        req,
        res: Response,
        next
    ) => {
        const statusCode =
            res.statusCode === 200 ? err.status || 500 : res.statusCode;
        res.status(statusCode);
        res.json({
            error: err.message.split(';'),
        });
    };

    public listen() {
        this.app.listen(3500, () => {
            console.log(`App is running on port 3500`);
        });
    }
}

export default App;
