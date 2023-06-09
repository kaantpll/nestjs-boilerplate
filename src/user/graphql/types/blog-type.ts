import { Field, ID, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class BlogType{

    @Field(type=>ID)
    id :number

    @Field()
    title:string

    @Field()
    content:string

    @Field((type) => Int)
    userId:number
}