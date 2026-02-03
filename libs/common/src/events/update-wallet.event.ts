import mongoose from 'mongoose';

class UpdateWalletDto {
  public user: mongoose.Types.ObjectId;
  public amount: number;
  constructor({
    user,
    amount,
  }: {
    user: mongoose.Types.ObjectId;
    amount: number;
  }) {
    this.user = user;
    this.amount = amount;
  }
}

export default UpdateWalletDto;
