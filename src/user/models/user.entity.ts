import { Blog } from 'src/blog/models/blog.entity';
import { Profile } from 'src/profile/models/profile.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Role } from './role.enum';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ nullable: false})
  password: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column()
  gender: string;

  @Column()
  photo: string;

  @Column({ default: 'user' })
  role: Role;

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;

  @OneToMany(() => Blog, (b) => b.user)
  blogs: Blog[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashEmail()
  {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(this.email, salt);
    this.email = hash;
  }
}
