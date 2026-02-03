import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly lastName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly phoneNumber: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly userName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly dateOfBirth: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly nationality: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @IsStrongPassword()
  readonly password: string;

  @ApiProperty() // New property for routine
  @IsOptional()
  @IsString()
  readonly routine?: string; // Added routine field

  @ApiProperty()
  @IsString()
  readonly reference: string;

  @ApiProperty()
  @IsString()
  readonly accountType: string;
}
