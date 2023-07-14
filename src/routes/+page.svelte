<script lang="ts">
	import { getDayNumber, getLatestDate } from '$lib/utils';
	import Leaderboard from '$lib/leaderboard.svelte';

	export let data;
	const dayNumber = getDayNumber();
</script>

<svelte:head>
	<title>100 jours de zbeul</title>
</svelte:head>

<p class="my-14" />

<Leaderboard date={getLatestDate(data.actions)} actions={data.actions} ended />
