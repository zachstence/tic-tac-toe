<script lang="ts">
	import { onMount } from 'svelte';
	import { GameStore } from '$lib/client';
	import type { PageServerData } from './$types';
	import { Socket } from '$lib/client/socket';

	export let data: PageServerData;

	let game: GameStore;
	onMount(() => {
		const socket = new Socket();
		game = new GameStore(socket, data.game);
		game.join(data.game.id, 'Zach');
	});
</script>

<table>
	<tbody>
		<tr>
			<td></td>
			<td></td>
			<td></td>
		</tr>
		<tr>
			<td></td>
			<td></td>
			<td></td>
		</tr>
		<tr>
			<td></td>
			<td></td>
			<td></td>
		</tr>
	</tbody>
</table>

<details>
	<summary>Game State</summary>
	<pre>{JSON.stringify($game, null, 2)}</pre>
</details>
