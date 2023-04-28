<script lang="ts">
	import { ACTION_LABEL, ACTION_SCORE, TARGET_LABEL, TARGET_MULTIPLIER } from '$lib/constants';
	import { getPointsDisplay } from '$lib/utils';
</script>

<svelte:head><title>Règles du jeu | 100 jours de zbeul</title></svelte:head>

<main role="main">
	<div class="mx-auto mt-16 max-w-2xl">
		<p>
			En partant des <a
				href="https://france.attac.org/se-mobiliser/retraites-pour-le-droit-a-une-retraite-digne-et-heureuse/article/on-ne-les-lache-pas-la-carte-des-mobilisations"
				>données</a
			>
			compilées par Attac, on assigne manuellement à chaque événement un type de personne ciblée et un
			type d’action. Les données finales sont accessibles dans le
			<a href="https://github.com/cedricr/100joursdezbeul/blob/main/src/lib/assets/data.json"
				>code source</a
			>. Les vérifications sont les bienvenues&nbsp;!
		</p>

		<p>
			Chacune de ces actions attribue un certain nombre de points au département où elles se
			passent&nbsp;; le type de personne ciblée permet de multiplier ces points. Là où plusieurs
			personnalités sont ciblées, les points sont comptés pour chacune.
		</p>

		<h2>Barème</h2>

		<h3>Types d’actions</h3>
		<ul>
			{#each Object.keys(ACTION_SCORE) as action}
				<li>
					<span id={action}>{ACTION_LABEL[action]}</span>
					— {@html getPointsDisplay(ACTION_SCORE[action])}
				</li>
			{/each}
		</ul>
		<h3>Personnalités</h3>
		<ul>
			{#each Object.keys(TARGET_MULTIPLIER) as target}
				<li>
					<span id={target}>{TARGET_LABEL[target]}</span>
					— x{TARGET_MULTIPLIER[target]}
				</li>
			{/each}
		</ul>
	</div>
</main>

<style lang="postcss">
	h2 {
		@apply mb-6 mt-12;
	}
	h3 {
		@apply mb-8 mt-12 text-center text-2xl;
	}

	p {
		@apply mb-3 text-lg;
	}
	ul {
		@apply mx-auto mb-6 max-w-lg list-disc;
	}
	li {
		@apply mb-3;
	}
</style>
