import MockRedisClient = require('mock-redis-client');
import { CacheManagerFactory } from '../../src/cache-manager/CacheManagerFactory';

describe('Test case for CacheManagerFactory', () => {
  it('should create an instance', () => {
    const factory = CacheManagerFactory.getInstance(
      undefined,
      undefined,
      MockRedisClient.createMockRedis
    );
    expect(factory).toBeDefined()
  });

  it('should create an instance', () => {
    const factory = CacheManagerFactory.getInstance('localhost', 5000);
    expect(factory).toBeDefined()
  });

  it('it should fail as the constructor args are invalid', () => {
    const factory = CacheManagerFactory.getInstance(
      undefined,
      undefined,
      MockRedisClient.createMockRedis
    );
    expect(factory).toBeDefined()
    expect(() => {
      const value = factory.createCacheManager();
    }).toThrow()
  });
});