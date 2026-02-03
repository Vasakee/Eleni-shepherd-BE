import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Category } from '../model/ticket.schema';
import { ApiProperty } from '@nestjs/swagger';

export class createTicketDto {
  @ApiProperty({
    name: 'email',
    description: 'Ticket Creator Email',
    example: 'doe@example.com',
  })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;

  @ApiProperty({
    name: 'Category',
    description: 'Category of the ticket to be created',
    example: 'Transfer',
  })
  @IsNotEmpty()
  @IsEnum(Category, { message: 'Please select a category' })
  readonly category: Category;

  @ApiProperty({
    name: 'message',
    description: 'Message contained in the ticket',
    example: 'I cannot make withdrawals',
  })
  @IsNotEmpty()
  @IsString()
  readonly message: string;
}
