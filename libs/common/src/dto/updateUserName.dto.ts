import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateUserNameDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly userName: string;
}
