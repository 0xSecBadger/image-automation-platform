import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { 
  imageRepository, 
  processingJobRepository, 
  modelRepository 
} from '../repositories';
import { IImage, IProcessingJob, IModel } from '../interfaces';

describe('MongoDB Repositories', () => {
  let mongoServer: MongoMemoryServer;
  
  beforeAll(async () => {
    // Create an in-memory MongoDB server
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });
  
  afterAll(async () => {
    // Clean up after tests
    await mongoose.disconnect();
    await mongoServer.stop();
  });
  
  beforeEach(async () => {
    // Clear all collections before each test
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany({});
    }
  });
  
  describe('ImageRepository', () => {
    it('should create an image', async () => {
      const imageData = {
        filename: 'test-image.jpg',
        path: '/uploads/test-image.jpg',
        originalFilename: 'original.jpg',
        size: 1024,
        mimetype: 'image/jpeg',
        tags: ['test', 'sample']
      };
      
      const image = await imageRepository.create(imageData);
      
      expect(image).toBeDefined();
      expect(image.filename).toBe(imageData.filename);
      expect(image.path).toBe(imageData.path);
      expect(image.size).toBe(imageData.size);
      expect(image.mimetype).toBe(imageData.mimetype);
      expect(image.tags).toEqual(expect.arrayContaining(imageData.tags));
    });
    
    it('should find images by tags', async () => {
      // Create test images
      await imageRepository.create({
        filename: 'image1.jpg',
        path: '/uploads/image1.jpg',
        size: 1024,
        mimetype: 'image/jpeg',
        tags: ['landscape', 'nature']
      });
      
      await imageRepository.create({
        filename: 'image2.jpg',
        path: '/uploads/image2.jpg',
        size: 2048,
        mimetype: 'image/jpeg',
        tags: ['portrait', 'people']
      });
      
      await imageRepository.create({
        filename: 'image3.jpg',
        path: '/uploads/image3.jpg',
        size: 3072,
        mimetype: 'image/jpeg',
        tags: ['landscape', 'urban']
      });
      
      // Find images by tag
      const landscapeImages = await imageRepository.findByTags(['landscape']);
      
      expect(landscapeImages).toHaveLength(2);
      expect(landscapeImages[0].tags).toContain('landscape');
      expect(landscapeImages[1].tags).toContain('landscape');
    });
  });
  
  describe('ProcessingJobRepository', () => {
    it('should create a processing job', async () => {
      const jobData = {
        imageId: new mongoose.Types.ObjectId().toString(),
        status: 'pending' as const,
        operations: [
          {
            type: 'resize',
            params: { width: 800, height: 600 }
          }
        ]
      };
      
      const job = await processingJobRepository.create(jobData);
      
      expect(job).toBeDefined();
      expect(job.imageId).toBe(jobData.imageId);
      expect(job.status).toBe('pending');
      expect(job.operations).toHaveLength(1);
      expect(job.operations[0].type).toBe('resize');
    });
    
    it('should update job status', async () => {
      // Create a job
      const job = await processingJobRepository.create({
        imageId: new mongoose.Types.ObjectId().toString(),
        status: 'pending' as const,
        operations: [
          {
            type: 'resize',
            params: { width: 800, height: 600 }
          }
        ]
      });
      
      // Get the job ID as string
      const jobId = (job._id as unknown as mongoose.Types.ObjectId).toString();
      
      // Update status to processing
      const updatedJob = await processingJobRepository.updateStatus(jobId, 'processing');
      
      expect(updatedJob).toBeDefined();
      expect(updatedJob?.status).toBe('processing');
      expect(updatedJob?.startedAt).toBeDefined();
      
      // Update status to failed with error
      const failedJob = await processingJobRepository.updateStatus(
        jobId, 
        'failed', 
        'Image processing failed'
      );
      
      expect(failedJob).toBeDefined();
      expect(failedJob?.status).toBe('failed');
      expect(failedJob?.completedAt).toBeDefined();
      expect(failedJob?.result?.error).toBe('Image processing failed');
    });
  });
  
  describe('ModelRepository', () => {
    it('should create a model', async () => {
      const modelData = {
        name: 'test-model',
        version: '1.0.0',
        description: 'Test model for unit tests',
        type: 'classification' as const,
        path: '/models/test-model-1.0.0',
        params: { layers: 5, dropout: 0.2 },
        metrics: { accuracy: 0.95, loss: 0.05 }
      };
      
      const model = await modelRepository.create(modelData);
      
      expect(model).toBeDefined();
      expect(model.name).toBe(modelData.name);
      expect(model.version).toBe(modelData.version);
      expect(model.type).toBe(modelData.type);
      expect(model.path).toBe(modelData.path);
    });
    
    it('should find latest model version', async () => {
      // Create multiple versions of the same model
      await modelRepository.create({
        name: 'resnet',
        version: '1.0.0',
        type: 'classification' as const,
        path: '/models/resnet-1.0.0'
      });
      
      await modelRepository.create({
        name: 'resnet',
        version: '1.1.0',
        type: 'classification' as const,
        path: '/models/resnet-1.1.0'
      });
      
      await modelRepository.create({
        name: 'resnet',
        version: '2.0.0',
        type: 'classification' as const,
        path: '/models/resnet-2.0.0'
      });
      
      // Find latest version
      const latestModel = await modelRepository.findLatestVersion('resnet');
      
      expect(latestModel).toBeDefined();
      expect(latestModel?.name).toBe('resnet');
      expect(latestModel?.version).toBe('2.0.0');
    });
  });
}); 