import { Document } from 'mongoose';

export interface IImage extends Document {
  filename: string;
  path: string;
  originalFilename?: string;
  size: number;
  mimetype: string;
  metadata?: Record<string, any>;
  tags?: string[];
  uploadedAt: Date;
  updatedAt: Date;
  userId?: string;
}

export interface IProcessingJob extends Document {
  imageId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  operations: Array<{
    type: string;
    params: Record<string, any>;
  }>;
  result?: {
    outputPath?: string;
    error?: string;
  };
  createdAt: Date;
  updatedAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  userId?: string;
}

export interface IModel extends Document {
  name: string;
  version: string;
  description?: string;
  type: 'classification' | 'detection' | 'segmentation' | 'generation';
  path: string;
  params?: Record<string, any>;
  metrics?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
  userId?: string;
} 