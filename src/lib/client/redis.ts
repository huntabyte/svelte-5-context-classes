import RedisMock from 'ioredis-mock/browser';
// import { createRedisStore } from '$lib/stores/redis-store';
import { RedisStore } from '$lib/stores/redis-rune-store.svelte';

export const redis = new RedisMock(6380); // new Redis(process.env.REDIS_URL);
export const pubsub = redis; //.duplicate();

//export const messageStore = createRedisStore(pubsub, 'myChannel');

export const createProjectStore = (name: string = '') => new RedisStore(pubsub, `${name}@projects`);
export const createTeamStore = (name: string = '') => new RedisStore(pubsub, `${name}@teams`);
export const createMemberStore = (name: string = '') => new RedisStore(pubsub, `${name}@members`);
