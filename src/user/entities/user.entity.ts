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
} from 'typeorm';
import { Role } from './role.enum';
import * as bcrypt from 'bcrypt';
import { createCipheriv, createDecipheriv } from 'crypto';
import { config } from 'dotenv';
config();

const iv = process.env.IV;
const key = process.env.BKEY;

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column()
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
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async encyptEmail() {
    const cipher = createCipheriv('aes-256-ctr', key, iv);
    let encrypted = cipher.update(this.email, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    this.email = encrypted.toString();
  }

  @AfterLoad()
  deCryptedEmail() {
    const decipher = createDecipheriv('aes-256-ctr', key, iv);
    let decrypted = decipher.update(this.email, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    this.email = decrypted.toString();
  }
}
