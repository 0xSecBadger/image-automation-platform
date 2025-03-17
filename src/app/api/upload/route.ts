import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { ImageProcessor, ProcessingOptions } from '@/lib/imageProcessor';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('images');
    const processingOptions = JSON.parse(formData.get('options') as string || '{}') as ProcessingOptions;

    const imageProcessor = new ImageProcessor();
    const uploadPromises = files.map(async (file: any) => {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Create unique filename
      const filename = `${Date.now()}-${file.name}`;
      const filepath = join(process.cwd(), 'public', 'uploads', filename);

      // Save original file
      await writeFile(filepath, new Uint8Array(buffer));

      // Process the image
      const result = await imageProcessor.processImage(filename, {
        resize: processingOptions.resize || {
          width: 800,
          height: 600,
          fit: 'cover'
        },
        compress: processingOptions.compress || {
          quality: 80
        },
        format: processingOptions.format || 'webp'
      });

      return {
        original: filename,
        processed: result
      };
    });

    const results = await Promise.all(uploadPromises);

    return NextResponse.json({
      success: true,
      results
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, error: 'Upload failed' },
      { status: 500 }
    );
  }
} 