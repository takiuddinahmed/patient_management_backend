import { JwtPayload } from "jsonwebtoken";
import UserRole from "../modules/user/enum/role.enum";

export enum TokenType{
    REFRESH = 'refresh',
    ACCESS = 'access'
}

export interface JwtToken extends JwtPayload {
    _id: string;
    role: UserRole;
    tokenType: TokenType
}

