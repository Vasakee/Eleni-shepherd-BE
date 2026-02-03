import { IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class WithdrawalRequestDTO {
  @ApiProperty({
    name: 'status',
    description: 'status',
    example: 'success | failed | pending',
  })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({
    name: 'references',
    description: 'references',
  })
  @IsArray()
  readonly references: string[];
}
