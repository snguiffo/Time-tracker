import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class ActivateUserDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsBoolean()
  isActive: boolean;
}
