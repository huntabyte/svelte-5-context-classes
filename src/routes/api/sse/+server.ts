// src/routes/api/messages/+server.ts
import { createProjectStore } from '$lib/server/redis';
import type { RequestHandler } from '@sveltejs/kit';

const projectStore = createProjectStore();

export const GET: RequestHandler = async ({ url }) => {
	const channelName = url.searchParams.get('channel') || 'default';

	const stream = new ReadableStream({
		start(controller) {
			const onMessages = (messages: string[], newMessage: string) => {
				const data = `data: ${JSON.stringify({ messages, newMessage, channelName })}\n\n`;
				controller.enqueue(new TextEncoder().encode(data));
			};

			projectStore.subscribe(onMessages);
		},
		cancel() {
			projectStore.unsubscribe();
		}
	});

	return new Response(stream, {
		headers: {
			'Content-Type': 'text/event-stream',
			'Cache-Control': 'no-cache',
			Connection: 'keep-alive'
		}
	});
};
