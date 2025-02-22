import Redis from "ioredis";

// Create new Redis client
const redis = new Redis()
const DEFAULT_EXPIRY = 60 * 60 // 1 hour

const getOrSetCache = (key, cb, expiry = DEFAULT_EXPIRY) => {
	return new Promise((resolve, reject) => {
		redis.get(key, async (err, data) => {
			if (err) reject(err)
			if (data !== null) return resolve(JSON.parse(data))

			const freshData = await cb()
			redis.setex(key, expiry, JSON.stringify(freshData))
			resolve(freshData)
		})
	})
}

export default getOrSetCache;