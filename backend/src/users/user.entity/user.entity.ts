import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToOne, ManyToOne } from 'typeorm';
import {IsEmail} from 'class-validator';
import { Project } from 'src/project/project.entity/project.entity';
import { Role } from 'src/users/role.entity/role.entity';
import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['email'])
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 25 })
    firstname:string;
    
    @Column({ length: 25, default:"" })
    lastname:string;

    @Column()
    @IsEmail()
    email:string;

    @Column({default:false}) 
    isActive:boolean;
    
    @Column({default:""}) 
    profile_img:string;
    
    @Column({default:""}) 
    tel:string;
    
    @Column() 
    password:string;

    @OneToOne(()=>Project, (project)=>project.reviewer)
    project_reviewed: Project

    @OneToOne(()=>Project, (project)=>project.consultant)
    project_assigned:Project
    
    @ManyToOne(()=>Role, (role)=>role.users)
    role: Role

    async comparePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
      }

}
