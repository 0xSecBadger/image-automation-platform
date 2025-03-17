import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import ImagePreview from './ImagePreview';

export default function ImageUploader() {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prev => [...prev, ...acceptedFiles]);
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

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');
      
      const result = await response.json();
      console.log('Upload successful:', result);
      setFiles([]);
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-4">
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
    </div>
  );
} 