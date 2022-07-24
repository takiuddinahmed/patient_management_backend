import {
    Handler,
    NextFunction,
    Request,
    RequestHandler,
    Response,
} from 'express';
import WrongCredentialException from '../exceptions/wrongCredential.exception';
import { JwtToken } from '../interfaces/jwtToken.interface';
import ReqWithUser from '../interfaces/reqWithUser.interface';
import UserRole from '../modules/user/enum/role.enum';
import { verifyToken } from '../utils/jwt';

const authMiddleware: RequestHandler = (
    req: ReqWithUser,
    res: Response,
    next: NextFunction
) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            const payload = verifyToken(token) as JwtToken;
            req.user = { _id: payload._id, role: payload.role };
            next();
        } else throw new WrongCredentialException();
    } catch (error) {
        next(error);
    }
};

export const checkRoles =
    (roles: Array<UserRole>) =>
    (req: ReqWithUser, res: Response, next: NextFunction) => {
        try {
            if (req.user) {
                if (roles.some((role) => role == req.user?.role)) {
                    next();
                } else throw new WrongCredentialException();
            } else throw new WrongCredentialException();
        } catch (error) {
            next(error);
        }
    };

export default authMiddleware;
