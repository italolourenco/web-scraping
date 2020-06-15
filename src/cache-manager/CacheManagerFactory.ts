import { CacheManager } from './CacheManager';
import { RedisClient, createClient } from 'redis';

export interface ICacheManager {
    get(key: string): Promise<string>;
    set(key: string, value: string): void;
}

export class CacheManagerFactory {
    private static instance: CacheManagerFactory;
    private redis: RedisClient;
    private internalCreateClient: Function;

    private constructor(private host?: string, private port?: number, customRedisClient?: Function) {
        if (!this.host) {
            this.host = process.env.REDIS_URL;
        }
        if (!this.port) {
            this.port = Number(process.env.REDIS_PORT);
        }
        if (customRedisClient) {
            this.internalCreateClient = customRedisClient;
        } else {
            this.internalCreateClient = createClient;
        }
    }

    static getInstance(host?: string, port?: number, createClient?: any): CacheManagerFactory {
        if (!CacheManagerFactory.instance) {
            CacheManagerFactory.instance = new CacheManagerFactory(host, port, createClient);
        }
        return CacheManagerFactory.instance;
    }

    public createCacheManager(): CacheManager {
        if (!this.redis) {
            this.redis = this.internalCreateClient(this.port, this.host);
            if(process.env.REDIS_PASSWORD){
                this.redis.auth(process.env.REDIS_PASSWORD)
            }
        }
        return new CacheManager(this.redis);
    }
}