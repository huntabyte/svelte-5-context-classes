import { redis } from '$lib/server/redis';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const { message } = await request.json();
	await redis.publish('myChannel', message);
	return json({ success: true });
};
