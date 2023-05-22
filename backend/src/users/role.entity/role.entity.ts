import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from '../user.entity/user.entity';

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({ length: 25 })
    name:string;
    
    @Column({default:""})
    description?:string;

    @OneToMany(()=> User, (user)=>user.role)
    users: User[]

}
