import { BaseRepository } from './base.repository';
import { Model } from '../models';
import { IModel } from '../interfaces';

export class ModelRepository extends BaseRepository<IModel> {
  constructor() {
    super(Model);
  }

  async findByType(type: 'classification' | 'detection' | 'segmentation' | 'generation'): Promise<IModel[]> {
    return this.find({ type });
  }

  async findByName(name: string): Promise<IModel[]> {
    return this.find({ name });
  }

  async findLatestVersion(name: string): Promise<IModel | null> {
    const models = await this.find(
      { name },
      { sort: { version: -1 }, limit: 1 }
    );
    
    return models.length > 0 ? models[0] : null;
  }

  async findByNameAndVersion(name: string, version: string): Promise<IModel | null> {
    return this.findOne({ name, version });
  }
}

// Singleton instance
export const modelRepository = new ModelRepository(); 