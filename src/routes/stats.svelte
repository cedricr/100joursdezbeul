<script>
	import { getNationalStats } from '$lib/utils';
	export let actions;
	const nationalStats = getNationalStats(actions);
</script>

<div class="flex flex-col justify-center mb-20">
	<h2 class="zbeul mb-4 text-xl">Informations d'ordre général</h2>
	<ul class="mx-auto text-lg">
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
		@apply mb-3 text-base;
	}
</style>
