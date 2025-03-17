import React, { useEffect, useState } from 'react';

interface ImagePreviewProps {
  file: File;
}

export default function ImagePreview({ file }: ImagePreviewProps) {
  const [preview, setPreview] = useState<string>();

  useEffect(() => {
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  return (
    <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
      {preview && (
        <img
          src={preview}
          alt={file.name}
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
} 