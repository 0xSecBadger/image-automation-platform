import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connectToDatabase, disconnectFromDatabase } from '../config';

describe('MongoDB Configuration', () => {
  let mongoServer: MongoMemoryServer;
  
  beforeAll(async () => {
    // Create an in-memory MongoDB server
    mongoServer = await MongoMemoryServer.create();
    process.env.MONGODB_URI = mongoServer.getUri();
  });
  
  afterAll(async () => {
    // Clean up after tests
    await mongoose.disconnect();
    await mongoServer.stop();
  });
  
  it('should connect to the database', async () => {
    const connection = await connectToDatabase();
    expect(connection).toBeDefined();
    expect(mongoose.connection.readyState).toBe(1); // 1 = connected
  });
  
  it('should reuse existing connection', async () => {
    // First connection
    await connectToDatabase();
    
    // Spy on mongoose.connect to see if it's called again
    const connectSpy = jest.spyOn(mongoose, 'connect');
    
    // Second connection attempt should reuse the existing connection
    await connectToDatabase();
    
    expect(connectSpy).not.toHaveBeenCalled();
    connectSpy.mockRestore();
  });
  
  it('should disconnect from the database', async () => {
    // First ensure we're connected
    await connectToDatabase();
    expect(mongoose.connection.readyState).toBe(1);
    
    // Now disconnect
    await disconnectFromDatabase();
    
    // 0 = disconnected
    expect(mongoose.connection.readyState).toBe(0);
  });
}); 