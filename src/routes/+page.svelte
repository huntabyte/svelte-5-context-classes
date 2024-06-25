<h1 class="mb-4 text-xl font-semibold">Home page</h1>

<form
	onsubmit={(e) => {
		e.preventDefault();
	}}
	class="flex w-1/4 flex-col gap-2"
>
	<div class="flex flex-col gap-1">
		<label for="title">Title</label>
		<input class="rounded-md border border-gray-800" id="title" />
	</div>

	<div class="flex flex-col gap-1">
		<label for="message">Message</label>
		<input class="rounded-md border border-gray-800" id="message" />
	</div>
	<button class="rounded-md bg-gray-300 p-1"> Add toast! </button>
</form>
