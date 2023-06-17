<script lang="ts">
	import Leaderboard from '$lib/leaderboard.svelte';
	import { dateToLabel, dateToString } from '$lib/utils';

	export let data;

	$: formattedDate = dateToLabel(data.date);
</script>

<svelte:head>
	<title>Classement du {formattedDate} | 100 jours de zbeul</title>
</svelte:head>

<p class="my-10" />

<Leaderboard date={data.date} actions={data.actions} />
