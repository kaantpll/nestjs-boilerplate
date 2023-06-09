import { Blog } from 'src/blog/blog.entity';
import { Profile } from 'src/profile/profile.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
  AfterLoad,
  Index,
} from 'typeorm';
import { Role } from './role.enum';

import { createCipheriv, createDecipheriv } from 'crypto';
import { config } from 'dotenv';
config();

const iv = process.env.IV;
const key = process.env.BKEY;

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column()
  email: string;

  @Column()
  gender: string;

  @Column()
  photo: string;

  @Column({ default: Role.User ,enum:Role,enumName:'role'})
  role: Role;

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;

  @OneToMany(() => Blog, (b) => b.user)
  blogs: Blog[];

}
