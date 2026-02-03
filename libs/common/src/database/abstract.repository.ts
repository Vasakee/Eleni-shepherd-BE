import { HttpException, Logger, NotFoundException } from '@nestjs/common';
import mongoose, {
  Model,
  FilterQuery,
  UpdateQuery,
  SaveOptions,
} from 'mongoose';

export abstract class AbstractRepository {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<any>) {}

  async create(
    document: Record<string, any>,
    options?: SaveOptions,
  ): Promise<any> {
    try {
      const _id = new mongoose.Types.ObjectId();
      const createdDocument = new this.model({
        _id,
        ...document,
      });
      await createdDocument.save(options);
      return { _id, ...document };
    } catch (error) {
      // duplicate key error
      if (error.code === 11000) {
        this.logger.error('Document already exists', error.keyValue);
        // throw new HttpException(`${Object.values(error.keyValue).toString()} already exists`, 400);
        throw new HttpException(
          `${Object.keys(error.keyValue).toString()} already exists`,
          400,
        );
      }
      this.logger.error('Error creating document', error);
      throw new HttpException(error, 500);
    }
  }

  async findOne(filterQuery: FilterQuery<any>): Promise<any> {
    const document = await this.model.findOne(filterQuery, {}, { lean: true });

    if (!document) {
      this.logger.warn('Document not found', filterQuery);
      throw new NotFoundException('Document not found.');
    }

    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<any>,
    update: UpdateQuery<any>,
  ) {
    const document = await this.model.findOneAndUpdate(filterQuery, update, {
      lean: true,
      new: true,
    });

    if (!document) {
      this.logger.warn(`Document not found with filterQuery:`, filterQuery);
      throw new NotFoundException('Document not found.');
    }

    return document;
  }

  async upsert(filterQuery: FilterQuery<any>, document: Record<string, any>) {
    return this.model.findOneAndUpdate(filterQuery, document, {
      lean: true,
      upsert: true,
      new: true,
    });
  }

  async find(filterQuery: FilterQuery<any>) {
    return this.model.find(filterQuery, {}, { lean: true });
  }

  async countDocuments(filterQuery: FilterQuery<any>) {
    return this.model.countDocuments(filterQuery);
  }

  async startTransaction() {
    return await mongoose.startSession();
  }

  async commitTransaction(session: mongoose.ClientSession) {
    return await session.commitTransaction();
  }
}
