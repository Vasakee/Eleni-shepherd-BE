import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class TransferDto {
  @ApiProperty({
    name: 'newOwnerUsername',
    description: 'New Refer Owner',
  })
  @IsNotEmpty()
  @IsString()
  readonly newOwnerUsername: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly transferSponsorship: boolean;

  @ApiProperty({
    name: 'owner',
    description: 'Refer Owner',
  })
  @IsNotEmpty()
  @IsString()
  owner: string;
}
