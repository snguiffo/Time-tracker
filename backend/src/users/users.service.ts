import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity/user.entity';
import { Role } from './role.entity/role.entity';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

    async getUsers(): Promise<User[]> {
        return await this.usersRepository.find();
    }

    async getUser(id: number): Promise<User> {
        return await this.usersRepository.findOne({where:{id}});
    }

    async findByEmail(_email: string): Promise<User> {
        return await this.usersRepository.findOne({where:{email:_email}});
    }

    async createUser(userData: CreateUserDto): Promise<User> {
        const user = new User();
                user.email = userData.email;
                user.firstname = userData.firstname;
                user.lastname = userData.lastname?userData.lastname:"";
                user.password = userData.password;
                user.profile_img = userData.profile_img?userData.profile_img:"";
                user.tel = userData.tel?userData.tel:"";
                user.role = { id: 1 } as Role; //TODO Use Constant for role id's
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
