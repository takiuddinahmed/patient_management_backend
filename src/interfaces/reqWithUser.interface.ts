import UserRole from '../modules/user/enum/role.enum';
import { Request } from 'express';

interface ReqWithUser extends Request {
    user?: ReqUser;
}

export interface ReqUser {
    _id: string;
    role: UserRole;
}

export default ReqWithUser;
