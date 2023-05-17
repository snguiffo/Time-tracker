import { IsNotEmpty, IsEmail, IsBoolean, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateUserDto {
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

  @IsNotEmpty()
  @IsString()
  password: string;
}
