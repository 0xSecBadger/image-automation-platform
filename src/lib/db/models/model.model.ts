import mongoose, { Schema } from 'mongoose';
import { IModel } from '../interfaces';

const ModelSchema = new Schema<IModel>(
  {
    name: { type: String, required: true },
    version: { type: String, required: true },
    description: { type: String },
    type: { 
      type: String, 
      required: true, 
      enum: ['classification', 'detection', 'segmentation', 'generation'] 
    },
    path: { type: String, required: true },
    params: { type: Schema.Types.Mixed },
    metrics: { type: Schema.Types.Mixed },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
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
ModelSchema.index({ name: 1, version: 1 }, { unique: true });
ModelSchema.index({ type: 1 });
ModelSchema.index({ userId: 1 });

// Make sure the model is only defined once
export const Model = mongoose.models.Model || mongoose.model<IModel>('Model', ModelSchema); 