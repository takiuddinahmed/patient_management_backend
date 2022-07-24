import HttpException from './http.exception';

export default class InvalidDocumentException extends HttpException {
    constructor() {
        super(404, 'Invalid document.');
    }
}
