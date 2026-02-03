import mongoose from 'mongoose';

class UserWalletDto {
  public user: mongoose.Types.ObjectId;
  constructor({ user }: { user: mongoose.Types.ObjectId }) {
    this.user = user;
  }
}

export default UserWalletDto;
