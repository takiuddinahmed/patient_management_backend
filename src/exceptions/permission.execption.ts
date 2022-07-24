import HttpException from './http.exception';

export default class PermissionException extends HttpException {
    constructor() {
        super(401, 'Permission denied.');
    }
}
