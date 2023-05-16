import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class LogProjectInfoDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  description?: string;

  @IsNotEmpty()
  @IsString()
  creationDate: string;

  @IsNotEmpty()
  @IsString()
  startTime: string;

  @IsNotEmpty()
  @IsString()
  endTime: string;

  @IsNotEmpty()
  @IsNumber()
  totalDuration: number;

}