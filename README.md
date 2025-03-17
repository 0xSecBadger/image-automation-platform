# Image Automation Platform

A modern web platform for uploading, processing, and automating image transformations with metadata storage and fine-tuning capabilities.

## Overview

Image Automation Platform is designed to handle bulk image processing, metadata storage, and automation tasks. This project provides a user-friendly interface for uploading images and applying various transformations with configurable parameters. The platform now includes MongoDB integration for storing metadata about images, processing jobs, and fine-tuning models.

## 🚀 Features

- Upload multiple images via drag-and-drop interface
- Preview images before processing
- Configure image processing parameters (resize, compression, format conversion)
- Side-by-side comparison of original and processed images
- Automatic local processing pipeline
- Download processed images
- **New:** Metadata storage with MongoDB for images, processing jobs, and fine-tuning models
- **New:** Repository pattern for data access

## 🛠 Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS, React Dropzone
- **Backend:** Next.js API Routes, Sharp.js for image processing
- **Database:** MongoDB with Mongoose ODM
- **Storage:** Local file system (first stage)
- **Testing:** Jest, MongoDB Memory Server for testing
- **Build Tools:** TypeScript, ESLint, PostCSS

## 📋 Prerequisites

- Node.js 16+ and npm
- Git
- MongoDB (local or remote instance)

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

4. Set up environment variables:
```bash
# Create a .env file in the root directory
echo "MONGODB_URI=mongodb://localhost:27017/image-automation" > .env
echo "NODE_ENV=development" >> .env
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

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
│   └── lib/                  # Utility functions and libraries
│       ├── db/               # Database related code
│       │   ├── config.ts     # MongoDB connection configuration
│       │   ├── init.ts       # Database initialization functions
│       │   ├── interfaces/   # TypeScript interfaces for DB models
│       │   ├── models/       # Mongoose models (Image, ProcessingJob, Model)
│       │   ├── repositories/ # Repository pattern implementation
│       │   └── __tests__/    # Tests for database functionality
│       │
│       └── imageProcessor.ts # Image processing logic with Sharp.js
│
├── public/                   # Static assets
│   ├── uploads/              # Directory for uploaded images
│   └── processed/            # Directory for processed images
│
├── jest.config.js            # Jest configuration
├── .env                      # Environment variables
├── TODO.md                   # Detailed todo list
└── ... configuration files
```

## ⚙️ Configuration

### MongoDB Configuration

The MongoDB connection is configured in `src/lib/db/config.ts`. The connection settings can be adjusted through environment variables:

- `MONGODB_URI`: Connection string for your MongoDB instance (default: mongodb://localhost:27017/image-automation)
- `NODE_ENV`: Environment setting, affects caching and error handling

### Image Processing Options

The image processing options can be configured in the `imageProcessor.ts` file. Current options include:

- **Resize:** Width, height, and fit strategy
- **Compression:** Quality level
- **Format Conversion:** Output format (WebP, JPEG, PNG)

## 🧩 Core Components

### Database Layer

The application uses MongoDB with Mongoose ODM for metadata storage. Key components include:

- **Models**: Mongoose schemas for Images, ProcessingJobs, and fine-tuning Models
- **Repositories**: Implementation of the Repository pattern for database operations
- **Interfaces**: TypeScript interfaces defining the structure of data models

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

## 🧪 Testing

The application now includes tests for the database layer using Jest and MongoDB Memory Server. Run tests with:

```bash
npm test
```

Testing highlights:
- Repository tests to validate CRUD operations
- MongoDB connection tests
- In-memory MongoDB for isolated testing

## 🗺️ Roadmap

This project is actively developing with a focus on building a complete image processing and fine-tuning platform. Check the [TODO.md](./TODO.md) file for a detailed breakdown of planned enhancements, organized into categories:

1. Core Architecture (Database, Authentication, Job Queue)
2. Fine-Tuning Pipeline
3. Image Processing Enhancements
4. Automation Framework
5. User Interface Improvements
6. Testing and Quality Assurance
7. DevOps and Deployment

## 👥 Contributing

Contributions are welcome! Please refer to the TODO.md file for areas that need work.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License. 