import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class UpdateTicketDto {
  @IsBoolean()
  resolved?: boolean;

  @ApiProperty({
    description: 'Date when the ticket was resolved',
    example: '2024-11-15T14:30:00.000Z',
  })
  @IsString()
  resolvedAt?: Date;
}
