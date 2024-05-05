import { gameService } from '$lib/server';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const games = await gameService.list();
	return new Response(JSON.stringify({ games }));
};

export const POST: RequestHandler = async () => {
	const game = await gameService.create();
	return new Response(JSON.stringify({ gameId: game.id }));
};
