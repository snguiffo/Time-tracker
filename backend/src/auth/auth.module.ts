import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './JwtStrategy';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  providers: [AuthService, JwtService],
  controllers: [AuthController]
})
export class AuthModule {}
