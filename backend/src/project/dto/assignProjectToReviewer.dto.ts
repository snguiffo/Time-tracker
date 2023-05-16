import { IsNotEmpty, IsNumber } from 'class-validator';

export class AssignProjectToReviewerDto {
  @IsNotEmpty()
  @IsNumber()
  reviewerId: number;
}
