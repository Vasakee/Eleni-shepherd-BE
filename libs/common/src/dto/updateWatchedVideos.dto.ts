import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class UpdateWatchedVideosDto {
  // @ApiProperty({ type: String })
  // @IsNotEmpty()
  // @IsString()
  // readonly videoId: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  readonly url: string;
}
