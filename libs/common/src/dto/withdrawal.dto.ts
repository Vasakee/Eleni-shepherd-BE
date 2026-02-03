import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class WithdrawalDto {
  @ApiProperty({
    name: 'amount',
    description: 'Amount',
    example: '5000',
  })
  @IsNotEmpty()
  @IsString()
  amount: string;
}
