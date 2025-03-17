'use client';

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import ImagePreview from './ImagePreview';
import ProcessingResults from './ProcessingResults';
import { ProcessingOptions } from '@/lib/imageProcessor';

export default function ImageUploader() {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [processingOptions, setProcessingOptions] = useState<ProcessingOptions>({
    resize: {
      width: 800,
      height: 600,
      fit: 'cover'
    },
    compress: {
      quality: 80
    },
    format: 'webp'
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prev => [...prev, ...acceptedFiles]);
    setResults([]); // Clear previous results
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    }
  });

  const handleUpload = async () => {
    if (files.length === 0) return;
    
    setProcessing(true);
    try {
      const formData = new FormData();
      files.forEach(file => {
        formData.append('images', file);
      });
      formData.append('options', JSON.stringify(processingOptions));

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');
      
      const result = await response.json();
      console.log('Upload successful:', result);
      setResults(result.results);
      setFiles([]);
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setProcessing(false);
    }
  };

  const updateProcessingOptions = (
    field: keyof ProcessingOptions,
    value: any
  ) => {
    setProcessingOptions(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Processing Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Resize</label>
            <input
              type="number"
              placeholder="Width"
              className="w-full p-2 border rounded"
              value={processingOptions.resize?.width}
              onChange={(e) =>
                updateProcessingOptions('resize', {
                  ...processingOptions.resize,
                  width: parseInt(e.target.value) || undefined
                })
              }
            />
            <input
              type="number"
              placeholder="Height"
              className="w-full p-2 border rounded mt-2"
              value={processingOptions.resize?.height}
              onChange={(e) =>
                updateProcessingOptions('resize', {
                  ...processingOptions.resize,
                  height: parseInt(e.target.value) || undefined
                })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Quality</label>
            <input
              type="number"
              min="1"
              max="100"
              className="w-full p-2 border rounded"
              value={processingOptions.compress?.quality}
              onChange={(e) =>
                updateProcessingOptions('compress', {
                  quality: parseInt(e.target.value) || 80
                })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Format</label>
            <select
              className="w-full p-2 border rounded"
              value={processingOptions.format}
              onChange={(e) =>
                updateProcessingOptions('format', e.target.value)
              }
            >
              <option value="webp">WebP</option>
              <option value="jpeg">JPEG</option>
              <option value="png">PNG</option>
            </select>
          </div>
        </div>
      </div>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the images here ...</p>
        ) : (
          <p>Drag 'n' drop images here, or click to select files</p>
        )}
      </div>

      {files.length > 0 && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {files.map((file, index) => (
              <ImagePreview key={index} file={file} />
            ))}
          </div>
          <button
            onClick={handleUpload}
            disabled={processing}
            className={`w-full py-2 px-4 rounded-lg text-white
              ${processing ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
          >
            {processing ? 'Processing...' : `Upload ${files.length} image${files.length === 1 ? '' : 's'}`}
          </button>
        </div>
      )}

      {results.length > 0 && <ProcessingResults results={results} />}
    </div>
  );
} 