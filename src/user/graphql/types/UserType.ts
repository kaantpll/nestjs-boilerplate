import { ObjectType,Field,ID } from "@nestjs/graphql";
import JSON from 'graphql-type-json';
import { Profile } from "src/profile/models/profile.entity";
import { BlogType } from "./BlogType";

@ObjectType()
export class UserType {
@Field(type=>ID)
  id: number;

  @Field()
  username: string;

  @Field()
  password: string;
  
  @Field()
  gender: string;

  @Field()
  photo: string;

  @Field()
  email: string;

  @Field(() => JSON)
  profile :Profile

  @Field(()=>[BlogType])
  blogs:BlogType

}
