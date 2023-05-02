<script lang="ts">
	import { DATA, getRegionName, getPointsDisplay, getRegionScore } from '$lib/utils';
	import Event from '../../departement/[code]/event.svelte';

	export let data;

	function getEvents(region: string) {
		const events = DATA.filter((event) => event.region === region).sort(
			(evt1, evt2) => Date.parse(evt2.date) - Date.parse(evt1.date)
		);
		return events;
	}

	const events = getEvents(data.region);
</script>

<svelte:head><title>{getRegionName(data.region)} | 100 jours de zbeul</title></svelte:head>

<h2 class="zbeul mb-12 mt-16 text-4xl">
	{getRegionName(data.region)} — {@html getPointsDisplay(
	getRegionScore(data.region)
)}
</h2>

<div class="mx-auto mb-24 mt-10 max-w-2xl text-xl">
	<ul>
		{#each events as event}
			<Event {event} />
		{/each}
	</ul>
</div>
