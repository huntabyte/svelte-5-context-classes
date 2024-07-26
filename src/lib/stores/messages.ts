import { writable } from 'svelte/store';

function createMessageStore() {
	const { subscribe, set, update } = writable<string[]>([]);

	return {
		subscribe,
		set,
		update,
		reset: () => set([]),
		addMessage: (message: string) => update((messages) => [...messages, message])
	};
}

export const messageStore = createMessageStore();
