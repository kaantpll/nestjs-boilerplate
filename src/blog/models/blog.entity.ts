import { User } from "src/user/models/user.entity";
import { Entity,PrimaryGeneratedColumn,ManyToOne, Column } from "typeorm";

@Entity({name:'blogs'})
export class Blog{
 
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    title:string

    @Column()
    content:string

    @ManyToOne(() => User, (user) => user.blogs,{onDelete:'SET NULL'})
    user: User

}