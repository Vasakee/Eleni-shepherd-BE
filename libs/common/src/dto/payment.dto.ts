import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaymentDto {
  /*@ApiProperty({
    name: 'amount',
    description: 'amount to be paid',
    example: '10000'
  })
  @IsString()
  @IsNotEmpty()
  amount: string;*/

  @ApiProperty({
    name: 'payment method',
    description: 'The method of payment',
    example: 'paystack',
  })
  @IsString()
  @IsNotEmpty()
  paymentMethod: string;

  @ApiProperty({
    name: 'redirect_Url',
    description: 'The URL to redirect after payment',
    example: 'https://redirect.com',
  })
  @IsString()
  @IsNotEmpty()
  redirect_url: string;
}
