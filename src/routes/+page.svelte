<script lang="ts">
	import parkingImg from '$lib/assets/annie-spratt-Y3te8rqlzyw-unsplash-small.jpg';
	import { getDayNumber } from '$lib/utils';

	const dayNumber = getDayNumber();
</script>

<svelte:head><title>100 jours de zbeul</title></svelte:head>

<div class="text-3xl text-center mb-6 mt-8">Jour {dayNumber}</div>
<p class="text-2xl text-center mb-6">{180 - dayNumber} jours restants</p>

<p class="text-center mb-6">Très bientôt…</p>

<figure class="mx-auto w-fit">
	<img
		src={parkingImg}
		alt="Batterie de vieilles casseroles et poêles en cuivre suspendues au mur."
		width="320"
		height="480"
	/>
	<figcaption>
		Photo par <a href="https://unsplash.com/@anniespratt">Annie Spratt</a> on
		<a href="https://unsplash.com/photos/Y3te8rqlzyw">Unsplash</a>
	</figcaption>
</figure>
