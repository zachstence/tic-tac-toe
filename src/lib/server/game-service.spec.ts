import { describe, it, expect, vi } from 'vitest';

import { GameState, type Game } from '$lib/schemas';
import { GameService } from './game-service';
import { RedisService } from './redis-service';

vi.mock('./redis-service');

const gameService = new GameService(new RedisService());

describe('GameService', () => {
	describe('checkWinner', () => {
		it('should find a winner in a row', () => {
			const game: Game = {
				id: 'gameId',
				state: GameState.Playing,
				players: [
					{
						id: 'player1Id',
						name: 'name',
						positions: [
							{ x: 0, y: 0 },
							{ x: 2, y: 0 },
							{ x: 1, y: 0 }
						]
					},
					{
						id: 'player2Id',
						name: 'name',
						positions: [
							{ x: 0, y: 1 },
							{ x: 1, y: 1 },
							{ x: 2, y: 2 }
						]
					}
				]
			};

			gameService.setWinner(game);

			expect(game.winningPlayerId).toEqual('player1Id');
		});

		it('should find a winner in a column', () => {
			const game: Game = {
				id: 'gameId',
				state: GameState.Playing,
				players: [
					{
						id: 'player1Id',
						name: 'name',
						positions: [
							{ x: 0, y: 0 },
							{ x: 2, y: 2 },
							{ x: 0, y: 2 }
						]
					},
					{
						id: 'player2Id',
						name: 'name',
						positions: [
							{ x: 1, y: 2 },
							{ x: 1, y: 0 },
							{ x: 1, y: 1 }
						]
					}
				]
			};

			gameService.setWinner(game);

			expect(game.winningPlayerId).toEqual('player2Id');
		});

		it('should find a winner in a diagonal', () => {
			const game: Game = {
				id: 'gameId',
				state: GameState.Playing,
				players: [
					{
						id: 'player1Id',
						name: 'name',
						positions: [
							{ x: 0, y: 0 },
							{ x: 1, y: 0 },
							{ x: 0, y: 1 }
						]
					},
					{
						id: 'player2Id',
						name: 'name',
						positions: [
							{ x: 1, y: 1 },
							{ x: 2, y: 0 },
							{ x: 0, y: 2 }
						]
					}
				]
			};

			gameService.setWinner(game);

			expect(game.winningPlayerId).toEqual('player2Id');
		});
	});
});
