<script lang="ts">
	import {
		dateToLabel,
		filterEventsForDate,
		filterEventsForDepartment,
		getDepartmentName,
		getPointsDisplay,
		getScoreForEvents
	} from '$lib/utils';
	import Event from '$lib/event.svelte';
	import { DEPARTMENTS } from '$lib/constants';

	export let data;

	const formattedDate = dateToLabel(data.date);
	const events = filterEventsForDate(data.date, data.actions);

	function getScore(departmentCode: string): number {
		return getScoreForEvents(filterEventsForDepartment(departmentCode, events));
	}
</script>

<svelte:head>
	<title>Le zbeul du {formattedDate} | 100 jours de zbeul</title>
</svelte:head>

<h2 class="zbeul mb-16 mt-16 text-4xl">Le zbeul du {formattedDate}</h2>

<div class="mx-auto mb-24 mt-10 max-w-2xl text-xl">
	{#if events.length}
		{#each DEPARTMENTS.map((d) => d.code) as deptCode}
			{@const deptEvents = filterEventsForDepartment(deptCode, events)}
			{#if deptEvents.length}
				<h3 class="zbeul mb-6 mt-10 text-2xl">
					<a href="/departement/{deptCode}">{getDepartmentName(deptCode)}</a>&nbsp;: +{@html getPointsDisplay(
						getScore(deptCode)
					)}
				</h3>
				<ul>
					{#each deptEvents as event}
						<Event {event} titleLevel={4} hideDate />
					{/each}
				</ul>
			{/if}
		{/each}
	{:else}
		Aucun événement pris en compte ce jour-là.
	{/if}
</div>
