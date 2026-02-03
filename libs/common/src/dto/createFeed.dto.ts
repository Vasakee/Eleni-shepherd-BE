import { IsString, IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

enum MediaType {
  IMAGE = 'image',
  VIDEO = 'video',
}

class MediaContentDto {
  @ApiProperty({ description: 'URL of the media content' })
  @IsString()
  url: string;

  @ApiProperty({
    enum: MediaType,
    description: 'Type of the media (image or video)',
  })
  @IsString()
  type: MediaType;

  @ApiProperty({
    required: false,
    description: 'Optional description of the media',
  })
  @IsString()
  @IsOptional()
  description?: string;
}

export class CreateFeedDto {
  @ApiProperty({
    required: false,
    description: 'Optional text content for the feed',
  })
  @IsString()
  @IsOptional()
  textContent?: string;

  @ApiProperty({
    required: false,
    description: 'Optional array of media content',
    type: [MediaContentDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MediaContentDto)
  @IsOptional()
  mediaContent?: MediaContentDto[];
}
