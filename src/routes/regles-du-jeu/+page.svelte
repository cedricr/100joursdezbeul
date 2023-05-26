<script lang="ts">
	import {
		ACTION_LABEL,
		ACTION_SCORE,
		ACTION_DESCRIPTION,
		TARGET_MULTIPLIER
	} from '$lib/constants';
	import { getPointsDisplay } from '$lib/utils';

	export let data;
</script>

<svelte:head><title>Règles du jeu | 100 jours de zbeul</title></svelte:head>

<div class="mx-auto mt-16 max-w-2xl">
	<p class="text-center italic">
		Notre objectif est de valoriser la mobilisation contre la réforme des retraites et d'obtenir son
		retrait. Chacune des actions retenues contribue à l'apaisement voulu par notre président de la
		République, en incitant le gouvernement à retirer la réforme des retraites dans une ambiance
		festive et conviviale.
	</p>

	<h2>Les règles du jeu</h2>
	<ul>
		<li>
			En partant des <a
				href="https://france.attac.org/se-mobiliser/retraites-pour-le-droit-a-une-retraite-digne-et-heureuse/article/on-ne-les-lache-pas-la-carte-des-mobilisations"
				>données compilées par Attac</a
			>, on assigne manuellement à chaque action menées un type d’action (échelle de points) et un
			type de personnalité ciblée (qui multiplie les points) selon le barème ci-dessous. Là où
			plusieurs personnalités sont ciblées, les points sont comptés pour chacune. Une action est
			aussi rattachée au département où elle a eu lieu.
		</li>
		<li>Les actions sont prises en compte à partir du 18 avril 2023.</li>
		<li>
			Nous mettons à jour les données une fois par jour, le soir&nbsp;: les actions du jour sont en
			général prises en compte le lendemain soir.
		</li>
		<li>
			Les données finales sont accessibles dans <a
				href="https://100joursdezbeul.getgrist.com/62uY9YoxQE56/100-jours-de-zbeul"
				>notre base de données Grist</a
			>
			ou dans le
			<a href="https://github.com/cedricr/100joursdezbeul/blob/main/data/">code source</a>. Les
			vérifications sont les bienvenues&nbsp;!
		</li>
	</ul>

	<h3>Types d’action qui attribuent des points</h3>
	<ul>
		{#each Object.keys(ACTION_SCORE) as action}
			<li>
				<span id={action}>{ACTION_LABEL[action]}</span>
				—
				<span class="olympic-red font-bold">{@html getPointsDisplay(ACTION_SCORE[action])}</span>
				<span class="block text-base text-gray-600">{ACTION_DESCRIPTION[action]}</span>
			</li>
		{/each}
	</ul>

	<h3>Personnalités&nbsp;: les coefficients multiplicateurs&nbsp;!</h3>
	<ul>
		{#each Object.values(data.roles) as role}
			<li>
				<span id={role.code}>{role.intitule}</span>
				— <span class="olympic-red font-bold">×{TARGET_MULTIPLIER[role.code]}</span>
			</li>
		{/each}
	</ul>

	<h3>⚠️ Les actions non prises en compte dans le classement</h3>
	<ul>
		<li>Les violences physiques ne sont pas prises en compte et ne donnent pas de point bonus.</li>
		<li>
			Pour le moment, les actions internationales ne sont pas prises en compte mais le sujet est en
			cours de discussion.
		</li>
		<li>
			Pour le moment, les actions sur les personnes non membre du gouvernement (députés de la
			majorité…) ne sont pas prises en compte mais le sujet est en cours de discussion.
		</li>
	</ul>
</div>

<style lang="postcss">
	h2 {
		@apply mb-6 mt-12 font-bold;
	}
	h3 {
		@apply mb-8 mt-12 text-center text-2xl font-bold;
	}

	p {
		@apply mb-3 text-lg;
	}
	ul {
		@apply mb-6 list-disc pl-6 text-lg;
	}
	li {
		@apply mb-3;
	}
</style>
