import { BaseError } from "./baseError";

export class UserNotFound extends BaseError{
    constructor(message:string){
        super(message)
    }
}