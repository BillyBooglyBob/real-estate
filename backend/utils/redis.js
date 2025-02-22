import Redis from 'redis';

const DEFAULT_EXPIRATION = 3600;

// Helper function to format Redis Cloud URL
const getRedisConfig = () => {
  const redisUrl = process.env.REDIS_URL;

  if (!redisUrl) {
    console.log('No Redis URL provided, falling back to localhost');
    return {
      url: 'redis://localhost:6379'
    };
  }

  try {
    // Parse the URL to separate host and port correctly
    const url = new URL(redisUrl);

    return {
      socket: {
        host: url.hostname,
        port: parseInt(url.port),
        reconnectStrategy: (retries) => {
          return Math.min(retries * 50, 1000);
        }
      },
      username: url.username || 'default',
      password: url.password,
      database: 0
    };
  } catch (err) {
    console.error('Invalid Redis URL format:', err);
    throw new Error('Invalid Redis URL configuration');
  }
};

// Create Redis client with proper config
const client = Redis.createClient(getRedisConfig());

// Enhanced error handling and logging
client.on('error', err => {
  const config = getRedisConfig();
  console.error('Redis Client Error:', err);
  console.error('Redis Configuration:', {
    host: config.socket.host,
    port: config.socket.port,
    username: config.username
    // password omitted for security
  });
});

client.on('connect', () => {
  const config = getRedisConfig();
  console.log(`Redis Client Connected to ${config.socket.host}:${config.socket.port}`);
});
client.on('ready', () => console.log('Redis Client Ready'));
client.on('reconnecting', () => console.log('Redis Client Reconnecting'));
client.on('end', () => console.log('Redis Client Connection Ended'));

const connectRedis = async () => {
  try {
    await client.connect();
  } catch (err) {
    console.error('Failed to connect to Redis:', err);
    const config = getRedisConfig();
    console.error('Connection Details:', {
      host: config.socket.host,
      port: config.socket.port,
      username: config.username
    });
  }
};

const getOrSetCache = async (key, cb) => {
  try {
    if (!client.isOpen) {
      await connectRedis();
    }

    const data = await client.get(key);
    if (data !== null) {
      return JSON.parse(data);
    }

    const freshData = await cb();
    await client.setEx(key, DEFAULT_EXPIRATION, JSON.stringify(freshData));
    return freshData;
  } catch (error) {
    console.error('Redis Cache Error:', error);
    return await cb();
  }
};

// Initialize connection
connectRedis();

export { getOrSetCache, client };