import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity/user.entity';
import { Role } from './role.entity/role.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

    async getUsers(): Promise<User[]> {
        return await this.usersRepository.find();
    }

    async getUser(id: number): Promise<User> {
        return await this.usersRepository.findOne({where:{id}});
    }

    async createUser(userData: Partial<User>): Promise<User> {
        const user = this.usersRepository.create(userData);
        return this.usersRepository.save(user);
    }

    async updateUser(id: number, userInfo: Partial<User>): Promise<User | undefined> {
        await this.usersRepository.update(id, userInfo);
        return this.getUser(id);
    }

    async deleteUser(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }

    async activateUser(userId: number): Promise<User> {
        const user = await this.getUser(userId);
        if (!user) {
            throw new Error('User non trouvé');
        }
        user.isActive = true;
        return this.usersRepository.save(user);
    }

    async setUserRole(userId: number, roleId: number): Promise<User> {
        const user = await this.getUser(userId);
        if (!user) {
            throw new Error('User non trouvé');
        }

        // On utilise la clé étrangère
        user.role = { id: roleId } as Role;

        return this.usersRepository.save(user);
    }
}
