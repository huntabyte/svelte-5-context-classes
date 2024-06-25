<script lang="ts">
	const posts = [
		{
			title: 'Post 1',
			slug: '1'
		},
		{
			title: 'Post 2',
			slug: '2'
		},
		{
			title: 'Post 3',
			slug: '3'
		}
	];
</script>

<h1 class="mb-4 text-xl font-semibold">Posts page</h1>

<div class="flex flex-col gap-2">
	{#each posts as post}
		<a href="/posts/{post.slug}" class="hover:underline">{post.title}</a>
	{/each}
</div>
