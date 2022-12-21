import { Role } from "src/user/models/role.enum"


export type CreateUserType={
    username: string
    password:string
    email:string
    gender:string
    photo:string
    role:Role
}