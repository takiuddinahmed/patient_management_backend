import HttpException from './http.exception';

export default class WrongCredentialException extends HttpException {
    constructor() {
        super(401, 'wrong credential provided');
    }
}

