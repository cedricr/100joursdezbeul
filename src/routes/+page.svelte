<script lang="ts">
	import Thanks from '$lib/thanks.svelte';

	import { LEADERBOARD, getDayNumber, getDepartmentName, getNationalStats } from '$lib/utils';

	const dayNumber = getDayNumber();

	const resultLines = LEADERBOARD;
	const now = new Date();
	const formattedDate = now.toLocaleDateString('fr', { dateStyle: 'medium' });
	const nationalStats = getNationalStats();
</script>

<svelte:head><title>100 jours de zbeul</title></svelte:head>

<main role="main">
	<p class="mb-16 mt-24 text-center">
		<span class="zbeul olympic-red mb-0 block text-8xl leading-[5rem]">
			{100 - dayNumber}
		</span>
		<span class="mt-0 block text-xl">jours restants</span>
	</p>

	<!-- TODO
		<p>
			Toustes ensembles, nous sommes fort-es de {nationalStats.total} points.
			Nous comptabilisons :
			{nationalStats.manif} manifs
			{nationalStats.annulation} annulations de venues
			{nationalStats.chahut} chahuts
			{nationalStats.sobriete} mises en sobriété
			{nationalStats.creatif} actions créatives
			{nationalStats.fuite} fuites
		</p>
	-->


	<h2 class="zbeul mb-2">Classement temporaire au {formattedDate}</h2>
	<p class="mb-2 text-center italic">(tenant compte des données jusqu’au 26 avril inclus)</p>
	<p class="mb-6 text-center italic">
		Cliquez sur le nom du département pour avoir le détail du décompte.
	</p>
	<div class="mx-auto mb-6 mt-10 max-w-sm text-xl">
		<div class="ranking grid grid-auto-1-auto gap-y-3 gap-x-2">
			{#each resultLines as [code, score], i}
			<div class="text-right">
				{#if i === 0}
					<span role="img" aria-label="1">🥇</span>
				{:else if i === 1}
					<span role="img" aria-label="2">🥈</span>
				{:else if i === 2}
					<span role="img" aria-label="3">🥉</span>
				{:else}
					{i + 1}
				{/if}
			</div>
			<a href="/departement/{code}" class="no-underline hover:underline">
      				{getDepartmentName(code)}
  			</a>
  			<div class="text-right">{score} pts</div>
			{/each}
		</div>
	</div>

	<p class="mb-20 text-center text-lg">
		<a href="/regles-du-jeu">Règles du jeu</a>
		<br />
		<a href="/comment-participer">Comment participer</a>
	</p>

	<Thanks />
</main>

<style lang="postcss">
	.olympic-red {
		@apply text-[#dd0220];
	}

	.grid-auto-1-auto {
  		grid-template-columns: auto 1fr auto;
	}

	.ranking > :nth-child(-n+9) {
		@apply font-bold;
	}
</style>
