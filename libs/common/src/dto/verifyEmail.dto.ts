import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyEmailDto {
  @ApiProperty({
    name: 'email',
    description: 'email',
    example: 'doe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    name: 'otp',
    description: 'otp',
    example: '12345',
  })
  @IsString()
  @IsNotEmpty()
  otp: string;

  // @ApiProperty()
  // @IsNotEmpty()
  // @IsString()
  // readonly phoneNumber: string;
}
