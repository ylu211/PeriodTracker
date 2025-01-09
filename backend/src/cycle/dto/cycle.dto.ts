import { IsString, IsDateString, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class CreateCycleDto {
  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsString()
  symptoms: string;

  @IsOptional()
  userId?: Types.ObjectId;
}
