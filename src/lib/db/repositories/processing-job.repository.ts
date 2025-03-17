import { BaseRepository } from './base.repository';
import { ProcessingJob } from '../models';
import { IProcessingJob } from '../interfaces';

export class ProcessingJobRepository extends BaseRepository<IProcessingJob> {
  constructor() {
    super(ProcessingJob);
  }

  async findByImageId(imageId: string): Promise<IProcessingJob[]> {
    return this.find({ imageId });
  }

  async findByStatus(status: 'pending' | 'processing' | 'completed' | 'failed'): Promise<IProcessingJob[]> {
    return this.find({ status });
  }

  async findPendingJobs(limit: number = 10): Promise<IProcessingJob[]> {
    return this.find(
      { status: 'pending' }, 
      { sort: { createdAt: 1 }, limit }
    );
  }

  async updateStatus(id: string, status: 'pending' | 'processing' | 'completed' | 'failed', error?: string): Promise<IProcessingJob | null> {
    const updateData: any = { status };
    
    if (status === 'processing') {
      updateData.startedAt = new Date();
    } else if (status === 'completed' || status === 'failed') {
      updateData.completedAt = new Date();
    }
    
    if (error && status === 'failed') {
      updateData['result.error'] = error;
    }
    
    return this.update(id, updateData);
  }
}

// Singleton instance
export const processingJobRepository = new ProcessingJobRepository(); 