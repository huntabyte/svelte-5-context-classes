import { writable, type Writable } from 'svelte/store';
import type { Redis } from 'ioredis';

export function createRedisStore(
	pubsub: Redis,
	channel: string
): Writable<string[]> & { reset: () => void } {
	const { subscribe, set, update } = writable<string[]>([]);

	let isConnected = false;

	async function connectAndSubscribe() {
		if (isConnected) return;

		try {
			await pubsub.connect();
			isConnected = true;

			await pubsub.subscribe(channel);
			console.log(`Subscribed to channel: ${channel}`);

			pubsub.on('message', (receivedChannel: string, message: string) => {
				if (receivedChannel === channel) {
					update((messages) => [...messages, message]);
				}
			});
		} catch (error) {
			console.error('Error connecting to Redis:', error);
			isConnected = false;
		}
	}

	pubsub.on('error', (err: Error) => {
		console.error('Redis Client Error', err);
		isConnected = false;
		setTimeout(connectAndSubscribe, 5000); // Try to reconnect after 5 seconds
	});

	connectAndSubscribe();

	return {
		subscribe,
		set, // Allow setting the entire array if needed
		update, // Allow updating the array if needed
		reset: () => set([])
	};
}
