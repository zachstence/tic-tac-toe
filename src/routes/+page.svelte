<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	let games = data.games;

	const createGame = async (): Promise<void> => {
		const response = await fetch('/games', { method: 'POST' });
		const { gameId } = await response.json();
		goto(`games/${gameId}`);
	};

	const deleteGame = async (gameId: string): Promise<void> => {
		await fetch(`/games/${gameId}`, { method: 'DELETE' });

		const response = await fetch('/games');
		const data = await response.json();
		games = data.games;
	};
</script>

<button on:click={createGame}>Create Game</button>

<table>
	<thead>
		<tr>
			<th>ID</th>
			<th>Num Players</th>
		</tr>
	</thead>
	<tbody>
		{#each games as game}
			<tr>
				<td>{game.id}</td>
				<td>{game.players.length}</td>
				<td>
					<a href={`games/${game.id}`}>Join</a>
					<button on:click={() => deleteGame(game.id)}>Delete</button>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
