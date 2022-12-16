import { BaseError } from "./baseError";

export class BlogNotFound extends BaseError {
    
    constructor(message:string){
        super(message)
    }
    
}