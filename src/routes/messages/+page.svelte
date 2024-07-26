<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	let newMessage = '';
	let channelName = 'default';
	let messages = writable<string[]>([]);

	async function fetchMessages() {
		const response = await fetch(`/api/messages?channel=${channelName}`);
		const data = await response.json();
		messages.set(data.messages);
	}

	async function postMessage() {
		if (newMessage.trim() === '') return;
		const response = await fetch('/api/messages', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ message: newMessage })
		});
		const data = await response.json();
		if (response.ok) {
			console.log('Message added:', data.message);
			newMessage = '';
			fetchMessages(); // Refresh messages
		} else {
			console.error('Error:', data.error);
		}
	}

	onMount(() => {
		fetchMessages();
	});
</script>

<div>
	<h2>{channelName} Messages</h2>

	<div class="form-container">
		<input type="text" bind:value={newMessage} placeholder="Enter new message" />
		<button on:click={postMessage}>Post Message</button>
	</div>

	<div class="messages-container">
		{#if $messages.length === 0}
			<p>No messages yet.</p>
		{:else}
			<ul>
				{#each $messages as message}
					<li>{message}</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>

<style>
	.form-container {
		margin-bottom: 1rem;
	}

	.messages-container {
		margin-top: 1rem;
		border: 1px solid #ccc;
		padding: 1rem;
	}
</style>
