import { Document, Model, FilterQuery, UpdateQuery, QueryOptions } from 'mongoose';

export class BaseRepository<T extends Document> {
  constructor(private readonly model: Model<T>) {}

  async create(data: Partial<T>): Promise<T> {
    const createdEntity = new this.model(data);
    return createdEntity.save() as Promise<T>;
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  async findOne(filter: FilterQuery<T>): Promise<T | null> {
    return this.model.findOne(filter).exec();
  }

  async find(filter: FilterQuery<T>, options?: QueryOptions): Promise<T[]> {
    return this.model.find(filter, {}, options).exec();
  }

  async update(id: string, data: UpdateQuery<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id).exec();
  }

  async count(filter: FilterQuery<T>): Promise<number> {
    return this.model.countDocuments(filter).exec();
  }
} 