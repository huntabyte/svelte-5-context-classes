<script lang="ts">
	import Toast from './toast.svelte';

	const toast = {
		id: crypto.randomUUID(),
		title: 'Event added!',
		message: 'Be sure to subscribe to Huntabyte!'
	};
</script>

<div class="absolute right-2 top-2 flex flex-col gap-2">
	<Toast {toast} />
</div>
