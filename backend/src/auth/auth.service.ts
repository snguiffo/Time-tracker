import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/user.entity/user.entity';
import { UserDto } from 'src/users/dto/user.dto';


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService, 
  ) {}

  async validateUser(email: string, password: string): Promise<UserDto | null> {
    const user = await this.usersService.findByEmail(email);
    if (user && await user.comparePassword(password)) {
      
      const user_details : UserDto = {id : user.id, email : user.email, firstname : user.firstname, lastname : user.lastname
        , profile_img : user.profile_img, tel : user.tel, role : user.role  };
 
      return user_details;
    }
    return null;
  }

  async validateUserByJwt(payload: any) {
    const user = await this.usersService.getUser(payload.userId);
    if (user) {
      const user_details : UserDto = {id : user.id, email : user.email, firstname : user.firstname, lastname : user.lastname
        , profile_img : user.profile_img, tel : user.tel, role : user.role  };
 
      return user_details;
    }
    return null;
  }

  async signIn(user: UserDto){
    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.signAsync(payload, {secret:process.env.JWT_KEY});
    return accessToken;
  }

}
