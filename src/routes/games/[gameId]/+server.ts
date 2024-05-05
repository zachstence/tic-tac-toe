import { gameService } from '$lib/server';
import { RequestHandler } from './$types';

export const DELETE: RequestHandler = async ({ params: { gameId } }) => {
	await gameService.delete(gameId);
	return new Response();
};
