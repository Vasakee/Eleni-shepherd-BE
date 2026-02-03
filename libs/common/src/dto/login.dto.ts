import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

/**
 * Data Transfer Object for user login.
 */
export class LoginDto {
  /**
   * User's email address.
   * Must be a valid email format.
   */
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  /**
   * User's password.
   * Must be at least 6 characters long and strong.
   */
  @ApiProperty({
    description: 'User password',
    example: 'StrongPassword123!',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @IsStrongPassword()
  readonly password: string;
}
