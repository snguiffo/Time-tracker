import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './JwtStrategy';

@Module({
  providers: [AuthService]
})
export class AuthModule {}
