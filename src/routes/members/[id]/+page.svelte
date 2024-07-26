<script lang="ts">
	import { page } from '$app/stores';
	import { createMemberStore } from '$lib/server/redis';
	import { onDestroy } from 'svelte';

	let { channelName } = $props();

	// get from path
	const id = $page.params?.['id'];
	const memberStore = createMemberStore(id);

	let messages = $state<string[]>([]);

	$effect(() => {
		memberStore.subscribe((value) => {
			messages = value;
		});

		onDestroy(() => {
			memberStore.reset();
			memberStore.unsubscribe();
		});
	});
</script>

<div>
	<h1>Member ${id}</h1>
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
