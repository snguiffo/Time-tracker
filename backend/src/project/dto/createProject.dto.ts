import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  estimatedTime: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  hourlyRate: number;
}