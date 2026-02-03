import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  _id: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly firstName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly lastName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly gender: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly dateOfBirth: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly nationality: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly bankName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly accountName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly coverImage: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly profileImage: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly accountNumber: string;
}
