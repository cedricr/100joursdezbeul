<script lang="ts">
	import Thanks from '$lib/thanks.svelte';

	import { LEADERBOARD, getDayNumber, getDepartmentName } from '$lib/utils';

	const dayNumber = getDayNumber();

	const append = (a, x) => a.concat([x]);

	const resultLines = LEADERBOARD
		.map(([code, score]) => ({code, score}))
		.reduce((acc, x, i) => append(acc,
		{
			...x,
			rank: i > 0 && x.score === acc[i - 1].score ? acc[i - 1].rank : i + 1
		}), []);

	const now = new Date();
	const formattedDate = now.toLocaleDateString('fr', { dateStyle: 'medium' });
</script>

<svelte:head><title>100 jours de zbeul</title></svelte:head>

<main role="main">
	<p class="mb-16 mt-24 text-center">
		<span class="zbeul olympic-red mb-0 block text-8xl leading-[5rem]">
			{100 - dayNumber}
		</span>
		<span class="mt-0 block text-xl">jours restants</span>
	</p>

	<h2 class="zbeul mb-2">Classement temporaire au {formattedDate}</h2>
	<p class="mb-2 text-center italic">(tenant compte des données jusqu’au 27 avril inclus)</p>
	<p class="mb-6 text-center italic">
		Cliquez sur le nom du département pour avoir le détail du décompte.
	</p>
	<div class="mx-auto mb-6 mt-10 max-w-sm text-xl">
		<div class="ranking grid-auto-1-auto grid gap-x-2 gap-y-3">
			{#each resultLines as {code, score, rank}}
				<div class="text-right">
					{#if rank === 1}
						<span role="img" aria-label="1">🥇</span>
					{:else if rank === 2}
						<span role="img" aria-label="2">🥈</span>
					{:else if rank === 3}
						<span role="img" aria-label="3">🥉</span>
					{:else}
						{rank}
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
		<a href="/comment-participer">Comment participer</a> <br />
		<a href="/presse">Revue de presse</a>
		<br />
		<a
			href="https://framaforms.org/100-jours-de-zbeul-proposer-un-evenement-1682372493"
			class="font-bold">Signaler une action</a
		>
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

	.ranking > :nth-child(-n + 9) {
		@apply font-bold;
	}
</style>
