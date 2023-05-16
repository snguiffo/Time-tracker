import { IsNotEmpty, IsNumber } from 'class-validator';

export class SetUserRoleDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  roleId: number;
}
