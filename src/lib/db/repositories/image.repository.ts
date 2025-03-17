import { BaseRepository } from './base.repository';
import { Image } from '../models';
import { IImage } from '../interfaces';

export class ImageRepository extends BaseRepository<IImage> {
  constructor() {
    super(Image);
  }

  async findByTags(tags: string[]): Promise<IImage[]> {
    return this.find({ tags: { $in: tags } });
  }

  async findByMimeType(mimeType: string): Promise<IImage[]> {
    return this.find({ mimetype: mimeType });
  }

  async findByUserId(userId: string): Promise<IImage[]> {
    return this.find({ userId });
  }
}

// Singleton instance
export const imageRepository = new ImageRepository(); 