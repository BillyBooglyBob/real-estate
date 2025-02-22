import Redis from 'redis';

const DEFAULT_EXPIRATION = 3600;

// Production Redis URL (example: redis://default:password@redis-instance.render.com:6379)
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

const client = Redis.createClient({
  url: REDIS_URL,
  socket: {
    reconnectStrategy: (retries) => {
      // Exponential backoff: wait longer between each retry
      return Math.min(retries * 50, 1000);
    }
  }
});

// Enhanced error handling and logging
client.on('error', err => {
  console.error('Redis Client Error:', err);
  // Don't crash the application on Redis errors
});

client.on('connect', () => console.log('Redis Client Connected'));
client.on('ready', () => console.log(`Redis Client Ready - Connected to ${REDIS_URL}`));
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

    // Get data from cache
    const data = await client.get(key);
    if (data !== null) {
      return JSON.parse(data);
    }

    // If no cache, get fresh data
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