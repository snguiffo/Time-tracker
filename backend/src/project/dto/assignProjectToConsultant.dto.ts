import { IsNotEmpty, IsNumber } from 'class-validator';

export class AssignProjectToConsultantDto {
  @IsNotEmpty()
  @IsNumber()
  consultantId: number;
}
