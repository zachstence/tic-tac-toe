<script lang="ts">
	import { onMount } from 'svelte';
	import { GameStore } from '$lib/client';
	import type { PageServerData } from './$types';
	import { Socket } from '$lib/client/socket';
	import { Position } from '$lib/schemas';

	export let data: PageServerData;

	let game: GameStore;
	onMount(() => {
		const socket = new Socket();
		game = new GameStore(socket, data.game);
		game.join('Zach');
	});

	const allPositions: Position[][] = [
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
		]
	];
</script>

{#if game}
	<table>
		<tbody>
			{#each allPositions as row}
				<tr>
					{#each row as position}
						{@const x = $game.players[0]?.positions.find(
							(p) => p.x === position.x && p.y === position.y
						)}
						{@const o = $game.players[1]?.positions.find(
							(p) => p.x === position.x && p.y === position.y
						)}
						<td>
							<button on:click={() => game.play(position)} disabled={Boolean(x) || Boolean(o)}>
								{#if x}
									X
								{:else if o}
									O
								{/if}
							</button>
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
{/if}

<details>
	<summary>Game State</summary>
	<pre>{JSON.stringify($game, null, 2)}</pre>
</details>

<style>
	table {
		border-collapse: collapse;
	}

	button {
		width: 100px;
		height: 100px;
		border: 1px solid black;
	}
</style>
