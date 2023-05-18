import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './JwtStrategy';
import { AuthController } from './auth.controller';

@Module({
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
