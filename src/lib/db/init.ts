import { connectToDatabase, disconnectFromDatabase } from './config';
import mongoose from 'mongoose';

// Connection states in mongoose:
// 0 = disconnected
// 1 = connected
// 2 = connecting
// 3 = disconnecting

export async function initDatabase(): Promise<void> {
  try {
    // Check if we're already connected
    if ((mongoose.connection.readyState as any) === 1) {
      console.log('MongoDB is already connected');
      return;
    }
    
    // Connect to the database
    await connectToDatabase();
    
    // Verify connection
    if ((mongoose.connection.readyState as any) !== 1) {
      throw new Error('Failed to establish MongoDB connection');
    }
    
    console.log('MongoDB initialized successfully');
  } catch (error) {
    console.error('Failed to initialize MongoDB:', error);
    throw error;
  }
}

export async function closeDatabase(): Promise<void> {
  try {
    await disconnectFromDatabase();
    console.log('MongoDB connection closed successfully');
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
    throw error;
  }
} 