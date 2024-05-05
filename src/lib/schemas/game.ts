import { z } from 'zod';
import { PlayerSchema } from './player';

export enum GameState {
	WaitingForPlayers = 'WaitingForPlayers',
	Playing = 'Playing',
	Finished = 'Finished'
}

export const GameSchema = z.object({
	id: z.string(),
	state: z.nativeEnum(GameState),
	players: z.array(PlayerSchema).max(2),
	activePlayerId: z.string().optional(),
	winningPlayerId: z.string().optional()
});

export type Game = z.infer<typeof GameSchema>;
