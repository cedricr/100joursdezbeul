<script lang="ts">
	import { getDayNumber, getLatestDate } from '$lib/utils';
	import Leaderboard from '$lib/leaderboard.svelte';

	export let data;
	const dayNumber = getDayNumber();
</script>

<svelte:head>
	<title>100 jours de zbeul</title>
</svelte:head>

<p class="my-10 text-center sm:mt-16">
	<span class="zbeul olympic-red mb-0 block text-8xl leading-[5rem]">
		{100 - dayNumber}
	</span>
	<span class="mt-0 block text-xl">jours restants</span>
</p>

<Leaderboard date={getLatestDate(data.actions)} actions={data.actions} />
