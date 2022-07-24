import { readFileSync } from 'fs';
import { sign, verify, VerifyErrors } from 'jsonwebtoken';
import { resolve } from 'path';
import WrongCredentialException from '../exceptions/wrongCredential.exception';
import { JwtToken } from '../interfaces/jwtToken.interface';

export const publicKey = readFileSync(resolve('public_key.pem'), 'utf-8');
const privateKey = readFileSync(resolve('private_key.pem'), 'utf-8');

export const issueToken = (payload: JwtToken, expireTime = '7d') => {
    const token: string = sign(payload, privateKey, {
        algorithm: 'ES256',
        expiresIn: expireTime,
    });
    return token;
};

export const verifyToken = (token: string): JwtToken => {
    try {
        return verify(token, publicKey) as JwtToken;
    } catch (err) {
        throw new WrongCredentialException();
    }
};
