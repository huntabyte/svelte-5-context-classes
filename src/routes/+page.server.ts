import type { PageServerLoad } from './$types';
import { messageStore } from '$lib/server/redis'; // Adjust the import path as needed
import type { Readable } from 'svelte/store';

export const load: PageServerLoad = (): { messages: Readable<string[]> } => {
	return {
		messages: {
			subscribe: messageStore.subscribe
		}
	};
};
