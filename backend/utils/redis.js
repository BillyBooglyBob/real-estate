import { createClient } from 'redis';
import dotenv from 'dotenv';
dotenv.config();

const DEFAULT_EXPIRATION = 3600;

const client = createClient({
  username: 'default',
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: 'redis-13885.c291.ap-southeast-2-1.ec2.redns.redis-cloud.com',
    port: 13885
  }
});

// error handling and logging
client.on('error', err => console.error('Redis Client Error:', err));
client.on('connect', () => console.log('Redis Client Connected'));
client.on('ready', () => console.log(`Redis Client Ready`));
client.on('reconnecting', () => console.log('Redis Client Reconnecting'));
client.on('end', () => console.log('Redis Client Connection Ended'));

// Connect with retry logic
const connectRedis = async () => {
  try {
    await client.connect();
  } catch (err) {
    console.error('Failed to connect to Redis:', err);
    // Optional: implement retry logic here if needed
  }
};

const getOrSetCache = async (key, cb) => {
  try {
    // Ensure connection
    if (!client.isOpen) {
      await connectRedis();
    }

    console.log("Connected to Redis");

    // Get data from cache
    const data = await client.get(key);
    if (data !== null) {
      console.log("Cache Hit");
      return JSON.parse(data);
    }

    // If no cache, get fresh data
    console.log("Cache Miss");
    const freshData = await cb();

    // Set cache with expiration
    await client.setEx(key, DEFAULT_EXPIRATION, JSON.stringify(freshData));

    return freshData;
  } catch (error) {
    console.error('Redis Cache Error:', error);
    // Fallback to direct callback if Redis fails
    return await cb();
  }
};

// Initialize connection
connectRedis();

export { getOrSetCache, client };