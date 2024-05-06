import { nanoid } from 'nanoid';
import type { RedisService } from './redis-service';
import { GameSchema, GameState, Position, type Game, type Player } from '$lib/schemas';

export class GameService {
	constructor(private readonly redisService: RedisService) {}

	create = async (): Promise<Game> => {
		const id = nanoid();
		const game: Game = {
			id,
			state: GameState.WaitingForPlayers,
			players: []
		};
		const key = this.buildKey(id);
		await this.redisService.setJson(key, game);
		return game;
	};

	getById = async (gameId: string): Promise<Game> => {
		const key = this.buildKey(gameId);
		const rawGame = (await this.redisService.getJson(key)) as Game;
		const game = GameSchema.parse(rawGame);
		return game;
	};

	list = async (): Promise<Game[]> => {
		const keyQuery = await this.buildKey('*');
		const keys = await this.redisService.listKeys(keyQuery);
		const games = await Promise.all(
			keys.map(async (key) => {
				const rawGame = (await this.redisService.getJson(key)) as Game;
				return GameSchema.parse(rawGame);
			})
		);
		return games;
	};

	join = async (gameId: string, socketId: string, name: string): Promise<Game> => {
		const game = await this.getById(gameId);
		if (game.players.length >= 2) throw new Error('Game is full');
		if (game.players.map((p) => p.socketId).includes(socketId))
			throw new Error('Player already in game');

		const player: Player = {
			id: socketId, // TODO separate player id from socket id
			socketId,
			name,
			positions: []
		};

		game.players.push(player);
		game.activePlayerId = game.players[0].id;

		if (game.players.length === 2) {
			game.state = GameState.Playing;
		}

		await this.redisService.setJson(this.buildKey(gameId), game);
		return game;
	};

	play = async (gameId: string, playerId: string, position: Position): Promise<Game> => {
		const game = await this.getById(gameId);
		if (game.state !== GameState.Playing) throw new Error('Game is not playing');
		const player = game.players.find((p) => p.id === playerId);
		if (!player) throw new Error(`Player '${playerId}' is not in game '${gameId}'`);
		if (game.activePlayerId !== playerId) throw new Error('Not your turn');

		const playedPositions = game.players.flatMap((p) => p.positions);
		if (playedPositions.includes(position)) throw new Error('Position already played');

		if (player.positions.length === 3) {
			player.positions.pop();
		}
		player.positions.unshift(position);

		const otherPlayer = game.players.find((p) => p.id !== playerId);
		game.activePlayerId = otherPlayer!.id;

		GameService.setWinner(game);

		await this.redisService.setJson(this.buildKey(gameId), game);
		return game;
	};

	delete = async (gameId: string): Promise<void> => {
		const key = this.buildKey(gameId);
		await this.redisService.remove(key);
	};

	static setWinner = (game: Game): void => {
		const winner = game.players.find((player) => {
			return WINNING_POSITIONS.some((winningPosition) => {
				return winningPosition.every((position) =>
					player.positions.find((p) => p.x === position.x && p.y === position.y)
				);
			});
		});
		if (winner) {
			game.state = GameState.Finished;
			game.winningPlayerId = winner.id;
		}
	};

	private buildKey = (gameId: string): string => {
		return `game:${gameId}`;
	};
}

const WINNING_POSITIONS: [Position, Position, Position][] = [
	[
		{ x: 0, y: 0 },
		{ x: 1, y: 0 },
		{ x: 2, y: 0 }
	],
	[
		{ x: 0, y: 1 },
		{ x: 1, y: 1 },
		{ x: 2, y: 1 }
	],
	[
		{ x: 0, y: 2 },
		{ x: 1, y: 2 },
		{ x: 2, y: 2 }
	],
	[
		{ x: 0, y: 0 },
		{ x: 0, y: 1 },
		{ x: 0, y: 2 }
	],
	[
		{ x: 1, y: 0 },
		{ x: 1, y: 1 },
		{ x: 1, y: 2 }
	],
	[
		{ x: 2, y: 0 },
		{ x: 2, y: 1 },
		{ x: 2, y: 2 }
	],
	[
		{ x: 0, y: 0 },
		{ x: 1, y: 1 },
		{ x: 2, y: 2 }
	],
	[
		{ x: 0, y: 2 },
		{ x: 1, y: 1 },
		{ x: 2, y: 0 }
	]
];
