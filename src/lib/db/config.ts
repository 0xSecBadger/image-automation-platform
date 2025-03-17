import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/image-automation';

let cachedConnection: typeof mongoose | null = null;

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    const connection = await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Handle connection events
    mongoose.connection.on('error', (error) => {
      console.error('MongoDB connection error:', error);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB connection disconnected');
    });
    
    cachedConnection = connection;
    return connection;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

export async function disconnectFromDatabase(): Promise<void> {
  if (!mongoose.connection) {
    return;
  }
  
  try {
    await mongoose.disconnect();
    cachedConnection = null;
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Failed to disconnect from MongoDB:', error);
    throw error;
  }
} 