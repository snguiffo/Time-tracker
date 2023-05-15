import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn
    , ManyToOne } from 'typeorm';
import { Project } from '../project.entity/project.entity';

@Entity()
export class Timer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description:string;

    @Column()
    startTime:string;

    @Column()
    endTime:string;

    @Column()
    totalDuration:number;

    @ManyToOne(()=>Project, (project)=>project.timers)
    project: Project;

}
