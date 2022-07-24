import HttpException from "./http.exception";

export default class ServerException extends HttpException{
    constructor(){
        super(500,'Internal server error.')
    }
}