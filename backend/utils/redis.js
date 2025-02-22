import Redis from 'redis';

const DEFAULT_EXPIRATION = 3600;

// Create Redis client with options
const client = Redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

// Connect to Redis
client.connect().catch(console.error);

// Error handling
client.on('error', err => console.error('Redis Client Error:', err));
client.on('connect', () => console.log('Redis Client Connected'));
client.on('ready', () => console.log('Redis Client Ready'));
client.on('reconnecting', () => console.log('Redis Client Reconnecting'));
client.on('end', () => console.log('Redis Client Connection Ended'));

const getOrSetCache = async (key, cb) => {
  try {
    // Check if client is connected
    if (!client.isOpen) {
      await client.connect();
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
    // If Redis fails, fallback to direct callback
    return await cb();
  }
};

export { getOrSetCache, client };