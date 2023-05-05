<script lang="ts">
	import { getDepartmentName, getLatestDate, getPointsDisplay, sum } from '$lib/utils';
	import Event from '$lib/event.svelte';

	export let data;

	const lastUpdateDate = getLatestDate(data.actionEvents);
	const formattedLastUpdateDate = lastUpdateDate?.toLocaleDateString('fr', { dateStyle: 'medium' });
	const events = data.actionEvents.filter((event) => {
		return new Date(event.date).toDateString() === lastUpdateDate.toDateString();
	});
	const groupedEvents = {};
	events.forEach((event) => {
		if (!(event.departement in groupedEvents)) {
			groupedEvents[event.departement] = [];
		}
		groupedEvents[event.departement].push(event);
	});

	function getScore(deptCode: string): number {
		return sum(groupedEvents[deptCode].map((evt) => evt.score));
	}
</script>

<svelte:head>
	<title>Zbeul du jour | 100 jours de zbeul</title>
</svelte:head>

<h2 class="zbeul mb-16 mt-16 text-4xl">Le zbeul du {formattedLastUpdateDate}</h2>

<div class="mx-auto mb-24 mt-10 max-w-2xl text-xl">
	<ul>
		{#each Object.keys(groupedEvents) as deptCode}
			<h3 class="zbeul mb-6 mt-10 text-2xl">
				{getDepartmentName(deptCode)} +{@html getPointsDisplay(getScore(deptCode))}
			</h3>
			{#each groupedEvents[deptCode] as event}
				<Event {event} hideDate />
			{/each}
		{/each}
	</ul>
</div>
