<script lang="ts">
	import { ACTION_LABEL, ACTION_SCORE, TARGET_MULTIPLIER } from '$lib/constants';
	import { getPointsDisplay } from '$lib/utils';

	export let data;
</script>

<svelte:head><title>Règles du jeu | 100 jours de zbeul</title></svelte:head>

<div class="mx-auto mt-16 max-w-2xl">
	<p>
		En partant des <a
			href="https://france.attac.org/se-mobiliser/retraites-pour-le-droit-a-une-retraite-digne-et-heureuse/article/on-ne-les-lache-pas-la-carte-des-mobilisations"
			>données</a
		>
		compilées par Attac, on assigne manuellement à chaque événement un type de personne ciblée et un
		type d’action. Les données finales sont accessibles dans
		<a href="https://100joursdezbeul.getgrist.com/62uY9YoxQE56/100-jours-de-zbeul"
			>notre base de donnée Grist</a
		>
		ou dans le
		<a href="https://github.com/cedricr/100joursdezbeul/blob/main/data/">code source</a>. Les
		vérifications sont les bienvenues&nbsp;!
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
		{#each Object.values(data.roles) as role}
			<li>
				<span id={role.code}>{role.intitule}</span>
				— x{TARGET_MULTIPLIER[role.code]}
			</li>
		{/each}
	</ul>
</div>

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
