<script lang="ts">
	import { createProjectStore } from '$lib/server/redis';
	import { onDestroy } from 'svelte';

	let { channelName } = $props();

	let messages = $state<string[]>([]);

	// TODO: get id from path
	const projectStore = createProjectStore('id');

	$effect(() => {
		projectStore.subscribe((value) => {
			messages = value;
		});

		onDestroy(() => {
			projectStore.reset();
			projectStore.unsubscribe();
		});
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

<style>
	ul {
		list-style-type: none;
		padding: 0;
	}
	li {
		margin-bottom: 10px;
		padding: 5px;
		border: 1px solid #ccc;
		border-radius: 4px;
	}
</style>
