<script lang="ts">
	import { DATA, getDepartmentName, getDepartmentScore } from '$lib/utils';
	import Event from './event.svelte';

	export let data;

	function getEvents(department: string) {
		const events = DATA.filter((event) => event.codeInsee.slice(0, 2) === department).sort(
			(evt1, evt2) => Date.parse(evt2.date) - Date.parse(evt1.date)
		);
		return events;
	}

	const events = getEvents(data.department);
</script>

<h2 class="zbeul mb-12 mt-16 text-4xl">
	{getDepartmentName(data.department)} — {getDepartmentScore(data.department)} pts
</h2>

<div class="mx-auto mb-24 mt-10 max-w-2xl text-xl">
	<ul>
		{#each events as event}
			<Event {event} />
		{/each}
	</ul>
</div>
