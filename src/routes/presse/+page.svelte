<script lang="ts">
	import rawMediaRefs from '$lib/assets/media-refs?raw';
	import { dateToShortLabel } from '$lib/utils';
	interface MediaRef {
		source: string;
		link: string;
		image: string;
		title: string;
		date: string;
	}
	const mediaRefs = JSON.parse(rawMediaRefs) as MediaRef[];
</script>

<svelte:head><title>Presse | 100 jours de zbeul</title></svelte:head>

<div class="mx-auto mb-16 mt-16 max-w-2xl">
	<h2 class="zbeul mb-16 mt-16 text-4xl">Revue de presse</h2>

	<ul>
		{#each mediaRefs as ref}
			<li class="mb-7 flex items-start gap-6 text-xl">
				<img class="image h-8 w-8 rounded-full" src={ref.image} alt="" />
				<p class="text-lg">
					<span class="italic">{ref.title}</span>
					<br /><span class="text-sm">
						<a class="py-1 font-bold underline" href={ref.link}>{ref.source}</a>, le {dateToShortLabel(
							ref.date
						)}.</span
					>
				</p>
			</li>
		{/each}
	</ul>
</div>

<style lang="postcss">
	.tag {
		@apply py-1 pr-2 text-sm font-bold;
	}
</style>
