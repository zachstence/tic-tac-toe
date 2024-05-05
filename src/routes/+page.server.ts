import { gameService } from '../lib/server';
import { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const games = await gameService.list();
	return { games };
};
