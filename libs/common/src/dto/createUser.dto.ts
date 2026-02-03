import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly lastName: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly referralCode?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly phoneNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly userName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly dateOfBirth: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly nationality: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @IsStrongPassword()
  readonly password: string;
}
