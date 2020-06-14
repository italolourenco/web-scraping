import { ICacheManager } from './CacheManagerFactory';
import { RedisClient } from 'redis';
import { promisify } from 'util';

export class CacheManager implements ICacheManager {

    private getAsync: any;
    private setAsync: any;

    constructor(private client: RedisClient) {
        if (client) {
            this.getAsync = promisify(client.get).bind(client);
            this.setAsync = promisify(client.set).bind(client);
        } else {
            throw new Error('Unable to create CacheManager without a RedisClient');
        }
    }

    public getRedisClient(): RedisClient {
        return this.client
    }

    async get(key: string): Promise<string> {
        return await this.getAsync(key);
    }


    public async set(key: string, value: string): Promise<void> {
        await this.setAsync(key, value);
    }

}