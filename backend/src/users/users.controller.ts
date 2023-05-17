import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity/user.entity';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async getUsers(): Promise<User[]> {
        return this.usersService.getUsers();
    }

    @Get(':id')
    async getUser(@Param('id') id: number): Promise<User> {
        return this.usersService.getUser(id);
    }

    @Post()
    async createUser(@Body() userData: CreateUserDto): Promise<User> {
        //console.log(userData);
        return this.usersService.createUser(userData);
    }

    @Put(':id')
    async updateUser(@Param('id') id: number, @Body() userInfo: Partial<User>): Promise<User | undefined> {
        return this.usersService.updateUser(id, userInfo);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: number): Promise<void> {
        return this.usersService.deleteUser(id);
    }

    @Put(':id/activate')
    async activateUser(@Param('id') id: number): Promise<User> {
        return this.usersService.activateUser(id);
    }

    @Put(':id/set-role')
    async setUserRole(@Param('id') id: number, @Body() roleId: number): Promise<User> {
        return this.usersService.setUserRole(id, roleId);
    }
}
