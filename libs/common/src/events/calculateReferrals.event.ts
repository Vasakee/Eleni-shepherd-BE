import mongoose from 'mongoose';

class CalculateReferral {
  public id: mongoose.Types.ObjectId;
  constructor({ id }: { id: mongoose.Types.ObjectId }) {
    this.id = id;
  }
}

export default CalculateReferral;
