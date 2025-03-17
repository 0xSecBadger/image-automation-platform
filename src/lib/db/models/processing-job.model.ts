import mongoose, { Schema } from 'mongoose';
import { IProcessingJob } from '../interfaces';

const ProcessingJobSchema = new Schema<IProcessingJob>(
  {
    imageId: { type: String, required: true },
    status: { 
      type: String, 
      required: true, 
      enum: ['pending', 'processing', 'completed', 'failed'],
      default: 'pending'
    },
    operations: [{
      type: { type: String, required: true },
      params: { type: Schema.Types.Mixed, required: true }
    }],
    result: {
      outputPath: { type: String },
      error: { type: String }
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    startedAt: { type: Date },
    completedAt: { type: Date },
    userId: { type: String }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    },
    versionKey: false
  }
);

// Create indexes for common queries
ProcessingJobSchema.index({ imageId: 1 });
ProcessingJobSchema.index({ status: 1 });
ProcessingJobSchema.index({ userId: 1 });
ProcessingJobSchema.index({ createdAt: 1 });

// Make sure the model is only defined once
export const ProcessingJob = mongoose.models.ProcessingJob || 
  mongoose.model<IProcessingJob>('ProcessingJob', ProcessingJobSchema); 