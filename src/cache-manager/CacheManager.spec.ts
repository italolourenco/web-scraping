
import MockRedisClient = require('mock-redis-client');
import { CacheManager } from '../../src/cache-manager/CacheManager';
export const redis = createRedis();

export function createRedis() {
  // tslint:disable-next-line:only-arrow-functions
  const mockRedis = function() {
    const value = '';
  };
  mockRedis.prototype = new MockRedisClient();
  // tslint:disable-next-line:no-empty
  mockRedis.prototype.set = (
    key: string,
    value: string,
  ) => {
    //
  };
  mockRedis.prototype.get = (key: string, func: any): string => {
    return;
  };
  mockRedis.prototype.put = (key: string, value: string, func: any): string => {
    return;
  };
  return new mockRedis();
}

describe('Test case for CacheManager', () => {
  it('should throw error for "Unable to create CacheManager without a RedisClient"', () => {
    expect(() => {
      const manager = new CacheManager(undefined);
    }).toThrowError('Unable to create CacheManager without a RedisClient');
  });

  it('should set correct value', async done => {
    try {
      const key = 'keyValid';
      const value = 'myvalue';
      spyOn(redis, 'set').and.callFake((_key, _value, func) => {
        func(undefined, value);
      });
      const cacheManager = new CacheManager(redis as any);
      await cacheManager.set(key, value);
      expect(redis.set).toHaveBeenCalledWith(
        key,
        value,
        jasmine.anything()
      );
    } catch (error) {
      expect(error).toBeUndefined();
    }
    done();
  });

  it('should get the correct value', async done => {
    try {
      const key = 'keyValid';
      const value = 'myvalue';
      spyOn(redis, 'get').and.callFake((_key, func) => {
        func(undefined, value);
      });
      const cacheManager = new CacheManager(redis as any);
      const response = await cacheManager.get(key);
      expect(response).toBe(value);
      expect(redis.get).toHaveBeenCalledWith(
        `${key}`,
        jasmine.any(Function)
      );
    } catch (error) {
      expect(error).toBeUndefined();
    }
    done();
  });

});