import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { Project } from '../project.entity/project.entity';

@Entity()
export class Status {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 25 })
    name:string;
    
    @Column()
    description:string;

    @OneToMany(()=>Project, (project)=>project.status)
    projects: Project[];
    
}
