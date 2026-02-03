import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class WalletCreditDTO {
  @IsNotEmpty()
  @IsNumber()
  readonly amount: number;

  @IsString()
  readonly _id: string;
}
