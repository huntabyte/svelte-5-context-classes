<script lang="ts">
	import { getToastState } from '$lib/toast-state.svelte';

	const toastState = getToastState();

	let title = $state('');
	let message = $state('');
	let titleInput = $state<HTMLInputElement>();
</script>

<h1 class="mb-4 text-xl font-semibold">Home page</h1>

<form
	onsubmit={(e) => {
		e.preventDefault();
		toastState.add(title, message);
		title = '';
		message = '';
		titleInput?.focus();
	}}
	class="flex w-1/4 flex-col gap-2"
>
	<div class="flex flex-col gap-1">
		<label for="title">Title</label>
		<input
			class="rounded-md border border-gray-800"
			id="title"
			bind:this={titleInput}
			bind:value={title}
		/>
	</div>

	<div class="flex flex-col gap-1">
		<label for="message">Message</label>
		<input class="rounded-md border border-gray-800" id="message" bind:value={message} />
	</div>
	<button class="rounded-md bg-gray-300 p-1"> Add toast! </button>
</form>
