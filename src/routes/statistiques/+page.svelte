<script lang="ts">
	import { getNationalStats } from '$lib/utils';
	export let data;
	const nationalStats = getNationalStats(data.actions);
</script>

<svelte:head><title>Statistiques nationale | 100 jours de zbeul</title></svelte:head>

<div class="mx-auto mt-16 max-w-2xl">
	<h2 class="zbeul mb-16 mt-16 text-4xl">Statistiques nationale</h2>
	<ul class="mx-auto">
		<li>
			🔥 <span class="font-bold">{nationalStats.total}</span> points totaux comptabilisés
		</li>
		<li>
			🏟️ <span class="font-bold">{nationalStats.sites}</span> sites de compétition
		</li>
		<li>
			🥳 <span class="font-bold">{nationalStats.cibles}</span> personalités participantes
		</li>
		<li>
			🔊 <span class="font-bold">{nationalStats.chahut}</span> chahuts
		</li>
		<li>
			🎨 <span class="font-bold">{nationalStats.creatif}</span> actions créatives
		</li>
		<li>
			🕯️ <span class="font-bold">{nationalStats.sobriete}</span> mises en sobriété énergétique
		</li>
		<li>
			🚁 <span class="font-bold">{nationalStats.fuite}</span> fuites précipités d’une personnalité
		</li>
		<li>
			❌ <span class="font-bold">{nationalStats.annulation}</span> annulations de venues
		</li>
	</ul>
</div>

<style lang="postcss">
	li {
		@apply mb-5 text-xl;
	}
</style>
