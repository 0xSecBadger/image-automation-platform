import sharp from 'sharp';
import { join } from 'path';
import { Stats } from 'fs';

export interface ProcessingOptions {
  resize?: {
    width?: number;
    height?: number;
    fit?: keyof sharp.FitEnum;
  };
  compress?: {
    quality: number;
  };
  format?: 'jpeg' | 'png' | 'webp';
}

export interface ProcessingResult {
  outputPath: string;
  size: number;
  format: string;
  width: number;
  height: number;
}

export class ImageProcessor {
  private readonly uploadsDir: string;
  private readonly processedDir: string;

  constructor() {
    this.uploadsDir = join(process.cwd(), 'public', 'uploads');
    this.processedDir = join(process.cwd(), 'public', 'processed');
  }

  async processImage(
    filename: string,
    options: ProcessingOptions
  ): Promise<ProcessingResult> {
    const inputPath = join(this.uploadsDir, filename);
    const outputFilename = `processed-${Date.now()}-${filename}`;
    const outputPath = join(this.processedDir, outputFilename);

    let pipeline = sharp(inputPath);

    // Apply resize if specified
    if (options.resize) {
      pipeline = pipeline.resize({
        width: options.resize.width,
        height: options.resize.height,
        fit: options.resize.fit || 'cover',
      });
    }

    // Apply compression and format conversion
    if (options.format) {
      pipeline = pipeline.toFormat(options.format, {
        quality: options.compress?.quality || 80,
      });
    }

    // Process the image
    const outputInfo = await pipeline.toFile(outputPath);

    return {
      outputPath: `/processed/${outputFilename}`,
      size: outputInfo.size,
      format: outputInfo.format || 'unknown',
      width: outputInfo.width || 0,
      height: outputInfo.height || 0,
    };
  }

  async processMultipleImages(
    filenames: string[],
    options: ProcessingOptions
  ): Promise<ProcessingResult[]> {
    return Promise.all(
      filenames.map(filename => this.processImage(filename, options))
    );
  }
} 