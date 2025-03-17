import mongoose, { Schema } from 'mongoose';
import { IImage } from '../interfaces';

const ImageSchema = new Schema<IImage>(
  {
    filename: { type: String, required: true },
    path: { type: String, required: true },
    originalFilename: { type: String },
    size: { type: Number, required: true },
    mimetype: { type: String, required: true },
    metadata: { type: Schema.Types.Mixed },
    tags: [{ type: String }],
    uploadedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    userId: { type: String }
  },
  {
    timestamps: {
      createdAt: 'uploadedAt',
      updatedAt: 'updatedAt'
    },
    versionKey: false
  }
);

// Create indexes for common queries
ImageSchema.index({ tags: 1 });
ImageSchema.index({ userId: 1 });
ImageSchema.index({ mimetype: 1 });

// Make sure the model is only defined once
export const Image = mongoose.models.Image || mongoose.model<IImage>('Image', ImageSchema); 