<script lang="ts">
	import type { Snippet } from 'svelte';
	import Toaster from '$lib/components/toaster.svelte';
	import Nav from '$lib/components/nav.svelte';
	import '../app.css';

	let { children }: { children: Snippet } = $props();
</script>

<Toaster />
<Nav />

<main class="p-4">
	{@render children()}
</main>
