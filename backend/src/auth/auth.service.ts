import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/user.entity/user.entity';


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);
    if (user && await user.comparePassword(password)) {
      return user;
    }
    return null;
  }

  async validateUserByJwt(payload: any) {
    const user = await this.usersService.getUser(payload.userId);
    if (user) {
      return user;
    }
    return null;
  }

  async signIn(user: User){
    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.signAsync(payload);
    return {accessToken};
  }

}
