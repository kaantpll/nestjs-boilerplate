export class PasswordNotCorrect extends Error{
    constructor(message:string){
        super(message)
    }
}