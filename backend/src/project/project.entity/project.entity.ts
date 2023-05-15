import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn
, OneToMany, ManyToOne } from 'typeorm';
import {IsEmail} from 'class-validator';
import { User } from 'src/users/user.entity/user.entity';
import { Timer } from '../timer.entity/timer.entity';
import { Status } from '../status.entity/status.entity';

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 25 })
    name:string;
    
    @Column()
    description:string;

    @OneToOne(()=>User, (user)=>user.project_assigned)
    @JoinColumn()
    consultant:User;

    @Column() 
    estimatedTime:number;
    
    @Column() 
    hourlyRate:number;
    
    @OneToOne(()=>User, (user)=>user.project_reviewed)
    @JoinColumn() 
    reviewer:User;

    @OneToMany(()=>Timer, (timer)=>timer.project)
    timers: Timer[];

    @ManyToOne(()=>Status, (status)=>status.projects)
    status: Status;
}
