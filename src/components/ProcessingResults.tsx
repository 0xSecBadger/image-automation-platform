'use client';

import React from 'react';
import { ProcessingResult } from '@/lib/imageProcessor';

interface ProcessingResultsProps {
  results: {
    original: string;
    processed: ProcessingResult;
  }[];
}

export default function ProcessingResults({ results }: ProcessingResultsProps) {
  if (!results.length) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Processing Results</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {results.map((result, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Original</h3>
                <img
                  src={`/uploads/${result.original}`}
                  alt="Original"
                  className="w-full h-48 object-cover rounded"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Filename: {result.original}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Processed</h3>
                <img
                  src={result.processed.outputPath}
                  alt="Processed"
                  className="w-full h-48 object-cover rounded"
                />
                <div className="text-sm text-gray-500 mt-2 space-y-1">
                  <p>Format: {result.processed.format}</p>
                  <p>Size: {(result.processed.size / 1024).toFixed(2)} KB</p>
                  <p>
                    Dimensions: {result.processed.width}x{result.processed.height}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <a
                href={result.processed.outputPath}
                download
                className="text-blue-500 hover:text-blue-600 text-sm font-medium"
              >
                Download Processed Image
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 