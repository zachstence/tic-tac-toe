import { gameService } from '$lib/server';
import { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const game = await gameService.getById(params.gameId);
	return { game };
};
