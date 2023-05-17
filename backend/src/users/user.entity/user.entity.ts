import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToOne, ManyToOne } from 'typeorm';
import {IsEmail} from 'class-validator';
import { Project } from 'src/project/project.entity/project.entity';
import { Role } from 'src/users/role.entity/role.entity';

@Entity()
@Unique(['email'])
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 25 })
    firstname:string;
    
    @Column({ length: 25 })
    lastname:string;

    @Column()
    @IsEmail()
    email:string;

    @Column({default:false}) 
    isActive:boolean;
    
    @Column() 
    profile_img:string;
    
    @Column() 
    tel:string;
    
    @Column() 
    password:string;

    @OneToOne(()=>Project, (project)=>project.reviewer)
    project_reviewed: Project

    @OneToOne(()=>Project, (project)=>project.consultant)
    project_assigned:Project
    
    @ManyToOne(()=>Role, (role)=>role.users)
    role: Role

}
