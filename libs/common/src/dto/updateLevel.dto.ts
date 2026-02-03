import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose'; // Import Types from mongoose
import { Type } from 'class-transformer';

class VideoDto {
  @ApiProperty({ example: 'General' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ example: 'Day 1 (15 days plan)' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  day: string;

  @ApiProperty({ example: 'https://youtu.be/Tt7EFYVNW_A' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  url: string;
}

export class UpdateLevelDto {
  @ApiProperty({
    name: 'Level',
    description: 'Level number',
    example: 1, // Corrected example
  })
  @IsOptional()
  @IsNumber()
  readonly level: number;

  @ApiProperty({
    name: 'PayOutAmount',
    description: 'Amount earned at that level',
    example: 5000, // Corrected example
  })
  @IsOptional()
  @IsNumber()
  readonly payoutAmount: number;

  @ApiProperty({
    name: 'Rank',
    description: 'Rank',
    example: 'H & W PURCHASER (Make a purchase of NGN10,000)',
  })
  @IsOptional()
  @IsString()
  readonly rank: string;

  @ApiProperty({
    name: 'Routine',
    description: 'Routine of a level',
    example: '64c60e6b5f49b8b429cb27a5', // Example ObjectId
  })
  @IsOptional()
  @IsMongoId()
  readonly routine: Types.ObjectId;

  @ApiProperty({
    name: 'Videos',
    description: 'Videos belonging to this same level and package',
    type: [VideoDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VideoDto)
  readonly videos: VideoDto[];
}
