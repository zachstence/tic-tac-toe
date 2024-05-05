import { gameService } from '$lib/server';
import { z } from 'zod';
import { RequestHandler } from './$types';

const JoinGameSchema = z.object({
	name: z.string()
});

export const POST: RequestHandler = async ({ request, params, locals }) => {
	const gameId = params.gameId;
	const userId = locals.user.id;
	const body = await request.json();
	const { name } = JoinGameSchema.parse(body);

	await gameService.join(gameId, userId, name);

	return new Response(JSON.stringify({ url: `/games/${gameId}` }));
};
