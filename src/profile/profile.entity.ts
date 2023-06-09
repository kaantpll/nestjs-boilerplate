import { Column, Entity } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";

@Entity({name:'profiles'})
export class Profile{
    
    @PrimaryGeneratedColumn()
    id:number
    
    @Column()
    gender: string

    @Column()
    photo: string
}