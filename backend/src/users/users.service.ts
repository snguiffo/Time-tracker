import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity/user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

    async getUsers(user: User): Promise<User[]> {
        return await this.usersRepository.find();
    }

    async getUser(_id: number): Promise<User> {
        return await this.usersRepository.findOne({
            //select: ["firstname", "lastname", "isActive"],
            where: [{ "id": _id }]
        });
    }

    async createUser(userData: Partial<User>) :  Promise<User> {
        const user = this.usersRepository.create(userData);
      return this.usersRepository.save(user);
    }

    async updateUser(id: number, userInfo: Partial<User>) {
        await this.usersRepository.update(id, userInfo);
    return this.getUser(id);
    }

    async deleteUser(user: User) {
        this.usersRepository.delete(user);
    }
}