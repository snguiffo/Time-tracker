import { IsNotEmpty, IsEmail, IsString, IsNumber, IsOptional } from 'class-validator';
import { Role } from '../role.entity/role.entity';

export class UserDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;


  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  lastname?: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  profile_img?: string;

  @IsString()
  @IsOptional()
  tel?: string;

  
  @IsOptional()
  role?: Role;

}
