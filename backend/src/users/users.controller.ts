import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity/user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { JwtAuthGuard } from 'src/auth/JwtAuthGuard';
import { GetUser } from 'src/auth/getUser.decorator';
import { Role } from './role.entity/role.entity';

@Controller('users')
@UseGuards(JwtAuthGuard)
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
    @UseGuards(JwtAuthGuard)
    async activateUser(@Param('id') id: number, @GetUser() user: User): Promise<User> {
        if (user.role.id !=2) {
            throw new UnauthorizedException('réservé à l\'admin');
          }
        return this.usersService.activateUser(id);
    }

    @Put(':id/set-role')
    @UseGuards(JwtAuthGuard)
    async setUserRole(@Param('id') id: number, @Body() roleId: number, @GetUser() user: User): Promise<User> {
        if (user.role.id !=2) {
            throw new UnauthorizedException('réservé à l\'admin');
          }
        return this.usersService.setUserRole(id, roleId);
    }
}
