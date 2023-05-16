import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateProjectDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  estimatedTime?: number;

  @IsOptional()
  @IsNumber()
  hourlyRate?: number;
}
