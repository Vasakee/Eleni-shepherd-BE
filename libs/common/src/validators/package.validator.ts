import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Package } from '../model';

@ValidatorConstraint({ name: 'PartyExists', async: true })
@Injectable()
export class PackageExistsValidator implements ValidatorConstraintInterface {
  constructor(
    @InjectModel(Package.name) private readonly packageModel: Model<Package>,
  ) {}

  async validate(packageName: string, args: ValidationArguments) {
    const packageExist = await this.packageModel
      .findOne({ name: packageName })
      .exec();
    console.log(packageName);
    return !!packageExist;
  }

  defaultMessage(args: ValidationArguments) {
    return 'The specified package does not exist.';
  }
}
