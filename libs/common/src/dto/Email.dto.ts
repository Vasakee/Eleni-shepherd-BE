import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmailDto {
  @ApiProperty({ description: 'The email address of the user' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'The plan user selected' })
  @IsNotEmpty()
  @IsString()
  plan: string;

  @ApiProperty({ description: 'Referral Code' })
  @IsString()
  @IsOptional()
  referralCode: string;

  @ApiProperty({ description: 'Username' })
  @IsString()
  @IsOptional()
  username: string;

  @ApiProperty({ description: 'ReferredBy' })
  @IsString()
  @IsOptional()
  referredBy: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly phoneNumber: string;

  @ApiProperty({ description: 'The user firstName' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: 'The user lastName' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ description: "The user's unique userName" })
  @IsString()
  @IsNotEmpty()
  userName: string;

  @ApiProperty({ description: 'The user password' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

// firstName: z.string().min(3, { message: "First name is required" }),
// lastName: z.string().min(3, { message: "Last name is required" }),
// userName: z.string().min(3, { message: "Username is required" }),
// referralCode: z.string().optional(),
// password: z
//   .string()
//   .min(6, { message: "Password must be at least 6 characters" })
//   .regex(passwordRegex, {
//     message:
//       "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character",
//   }),
// confirmPassword: z
//   .string()
//   .min(6, { message: "Confirm Password is required" })
//   .optional(),
// referredBy: z
//   .string()
//   .min(3, { message: "ReferredBy is required" })
//   .optional(),
// phoneNumber: z.string().min(11, { message: "Phone Number is required" }),
// email: z.string().email({ message: "Email is required" }),
// })
