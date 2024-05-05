<script lang="ts">
	import { Socket } from '$lib/client/socket';
	import { onMount } from 'svelte';

	onMount(() => {
		const socket = new Socket();
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
