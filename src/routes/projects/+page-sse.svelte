<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { messageStore } from '$lib/stores/messages';

	export let channelName = 'default';

	let messages: string[] = [];
	let eventSource: EventSource | null = null;

	function connectToSSE() {
		eventSource = new EventSource(`/api/sse?channel=${channelName}`);

		eventSource.onmessage = (event) => {
			const data = JSON.parse(event.data);
			messageStore.set(data.messages);
		};

		eventSource.onerror = () => {
			console.error('Error with the SSE connection.');
			eventSource?.close();
		};
	}

	onMount(() => {
		connectToSSE();
	});

	onDestroy(() => {
		eventSource?.close();
		messageStore.reset();
	});

	messageStore.subscribe((value) => {
		messages = value;
	});
</script>

<div>
	<h2>{channelName} Messages</h2>
	{#if messages.length === 0}
		<p>No messages yet.</p>
	{:else}
		<ul>
			{#each messages as message}
				<li>{message}</li>
			{/each}
		</ul>
	{/if}
</div>
