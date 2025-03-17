import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('images');

    const uploadPromises = files.map(async (file: any) => {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Create unique filename
      const filename = `${Date.now()}-${file.name}`;
      const filepath = join(process.cwd(), 'public', 'uploads', filename);

      // Save file
      await writeFile(filepath, buffer);
      return filename;
    });

    const savedFiles = await Promise.all(uploadPromises);

    return NextResponse.json({
      success: true,
      files: savedFiles
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, error: 'Upload failed' },
      { status: 500 }
    );
  }
} 