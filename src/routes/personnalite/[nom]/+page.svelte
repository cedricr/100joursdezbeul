<script lang="ts">
	import { filterEventsForName, sortEventsByDescendingDate } from '$lib/utils';
	import Event from '$lib/event.svelte';
	import { TARGETS } from '$lib/constants';

	export let data;

	const events = sortEventsByDescendingDate(filterEventsForName(data.nom, data.actions));

	const target = TARGETS.find((x) => x.nom === data.nom);
</script>

<svelte:head><title>{data.nom} | 100 jours de zbeul</title></svelte:head>

<div class="mx-auto mb-12 mt-16 flex max-w-2xl flex-col items-center gap-6">
	<img
		src={target?.image}
		alt=""
		class="rounded-full object-cover"
		style="height: 100px; width: 100px"
	/>

	<h2 class="zbeul text-4xl">
		{data.nom}
	</h2>

	<h3 class="text-xl">{target?.titre}</h3>

	<ul class="mb-24 mt-10 text-xl">
		{#each events as event}
			<Event {event} />
		{/each}
	</ul>
</div>
