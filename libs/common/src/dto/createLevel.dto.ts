import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsMongoId,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class VideoDto {
  @ApiProperty({ example: 'General' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: 'Day 1 (15 days plan)' })
  @IsNotEmpty()
  @IsString()
  day: string;

  @ApiProperty({ example: 'https://youtu.be/Tt7EFYVNW_A' })
  @IsNotEmpty()
  @IsString()
  url: string;
}

export class CreateLevelDto {
  @ApiProperty({
    name: 'Level',
    description: 'Level number',
    example: 1, // Corrected example
  })
  @IsNotEmpty()
  @IsNumber()
  readonly level: number;

  @ApiProperty({
    name: 'PayOutAmount',
    description: 'Amount earned at that level',
    example: 5000, // Corrected example
  })
  @IsNotEmpty()
  @IsNumber()
  readonly payoutAmount: number;

  @ApiProperty({
    name: 'Rank',
    description: 'Rank',
    example: 'H & W PURCHASER (Make a purchase of NGN10,000)',
  })
  @IsNotEmpty()
  @IsString()
  readonly rank: string;

  @ApiProperty({
    name: 'Routine',
    description: 'Package associated with the level',
    type: String,
  })
  @IsNotEmpty()
  @IsMongoId() // Updated for ObjectId validation
  readonly routine: string;

  @ApiProperty({
    name: 'Videos',
    description: 'Videos belonging to this same level and package',
    type: [VideoDto], // Reference to the nested DTO
  })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VideoDto)
  readonly videos: VideoDto[];
}
