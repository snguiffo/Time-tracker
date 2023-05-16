import { IsNotEmpty, IsEmail, IsBoolean, IsString, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  profile_img: string;

  @IsNotEmpty()
  @IsString()
  tel: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
