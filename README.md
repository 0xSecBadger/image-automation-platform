# Image Automation Platform

A modern web platform for uploading, processing, and automating image transformations with a local-first approach.

## Overview

Image Automation Platform is designed to handle bulk image processing and automation tasks. This project provides a user-friendly interface for uploading images and applying various transformations with configurable parameters. The current implementation focuses on a local-first approach for testing and validation before scaling to production.

## 🚀 Features

- Upload multiple images via drag-and-drop interface
- Preview images before processing
- Configure image processing parameters (resize, compression, format conversion)
- Side-by-side comparison of original and processed images
- Automatic local processing pipeline
- Download processed images

## 🛠 Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS, React Dropzone
- **Backend:** Next.js API Routes, Sharp.js for image processing
- **Storage:** Local file system (first stage)
- **Build Tools:** TypeScript, ESLint, PostCSS

## 📋 Prerequisites

- Node.js 16+ and npm
- Git

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/0xSecBadger/image-automation-platform.git
cd image-automation-platform
```

2. Install dependencies:
```bash
npm install
```

3. Create required directories:
```bash
mkdir -p public/uploads public/processed
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

```
image-automation-platform/
├── src/
│   ├── app/                  # Next.js app router pages
│   │   ├── page.tsx          # Main page component
│   │   ├── layout.tsx        # Root layout
│   │   └── api/              # API routes
│   │       └── upload/       # Image upload and processing endpoint
│   │
│   ├── components/           # React components
│   │   ├── ImageUploader.tsx # Main uploader component
│   │   ├── ImagePreview.tsx  # Image preview component
│   │   └── ProcessingResults.tsx # Results display component
│   │
│   └── lib/                  # Utility functions
│       └── imageProcessor.ts # Image processing logic with Sharp.js
│
├── public/                   # Static assets
│   ├── uploads/              # Directory for uploaded images
│   └── processed/            # Directory for processed images
│
├── TODO.md                   # Detailed todo list
└── ... configuration files
```

## ⚙️ Configuration

### Image Processing Options

The image processing options can be configured in the `imageProcessor.ts` file. Current options include:

- **Resize:** Width, height, and fit strategy
- **Compression:** Quality level
- **Format Conversion:** Output format (WebP, JPEG, PNG)

### Environment Variables

No environment variables are required for local development at this stage.

## 🧩 Core Components

### Image Processor

The `ImageProcessor` class in `src/lib/imageProcessor.ts` is responsible for transforming images using Sharp.js. It supports:

- Image resizing with configurable dimensions
- Format conversion
- Quality adjustments
- Batch processing

### Upload API

The upload API endpoint in `src/app/api/upload/route.ts` handles:

- File upload via FormData
- Saving original images to the local filesystem
- Processing images with the ImageProcessor
- Returning processing results with metadata

## 💻 Development

### Adding New Processing Features

1. Extend the `ProcessingOptions` interface in `imageProcessor.ts`
2. Implement the new processing logic in the `processImage` method
3. Update the UI components to support the new options

### Working with Sharp.js

Sharp is a high-performance Node.js image processing library. Refer to [Sharp documentation](https://sharp.pixelplumbing.com/) when implementing new transformations.

### UI Components

The application uses React components with hooks and Tailwind CSS for styling. When creating new components:

1. Follow the existing patterns for state management
2. Use the Tailwind utility classes for styling
3. Make sure components are responsive
4. Add the 'use client' directive for components using React hooks

## 🧪 Testing

Currently, the project does not have automated tests. Adding tests is a high priority item in the TODO list.

## 🗺️ Roadmap

This project is in its first stage of development with a focus on local processing. Check the [TODO.md](./TODO.md) file for a detailed breakdown of planned enhancements, organized into the following categories:

1. User Interface Improvements
2. Image Processing Optimization
3. Security and Validation
4. Automation Pipeline
5. Testing and Debugging
6. Documentation
7. Deployment and CI/CD

## 👥 Contributing

Contributions are welcome! Please refer to the TODO.md file for areas that need work.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License. 