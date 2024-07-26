<script lang="ts">
	import { page } from '$app/stores';

	let { channelName } = $props();

	// get id from path
	const id = $page.params?.['id'];

	let messages = $state<string[]>([]);
</script>

<div>
	<h1>Project team ${id}</h1>
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
