<script lang="ts">
	import {
		filterEventsForDepartment,
		getDepartmentName,
		getPointsDisplay,
		getScoreForEvents,
		sortEventsByDescendingDate
	} from '$lib/utils';
	import Event from '$lib/event.svelte';

	export let data;

	const events = sortEventsByDescendingDate(
		filterEventsForDepartment(data.department, data.actions)
	);
</script>

<svelte:head><title>{getDepartmentName(data.department)} | 100 jours de zbeul</title></svelte:head>

<h2 class="zbeul mb-12 mt-16 text-4xl">
	{getDepartmentName(data.department)} — {@html getPointsDisplay(getScoreForEvents(events))}
</h2>

<div class="mx-auto mb-24 mt-10 max-w-2xl text-xl">
	{#each events as event}
		<Event {event} />
	{/each}
</div>
