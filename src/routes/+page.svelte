<script lang="ts">
	import actions from '$lib/assets/data.json?raw';
	import Thanks from '$lib/thanks.svelte';

	import { generateLeaderboard, getDayNumber, getDepartmentName } from '$lib/utils';

	const dayNumber = getDayNumber();

	const resultLines = generateLeaderboard(actions);
	const now = new Date();
	const formattedDate = now.toLocaleDateString('fr', { dateStyle: 'medium' });
</script>

<svelte:head><title>100 jours de zbeul</title></svelte:head>

<main role="main">
	<p class="mb-10 mt-16 text-center">
		<span class="zbeul olympic-red block text-8xl">
			{100 - dayNumber}
		</span>
		<span class="block text-xl">jours restants</span>
	</p>

	<h2 class="zbeul mb-2">Classement temporaire au {formattedDate}</h2>
	<p class="mb-6 text-center italic">tenant compte des données jusqu’au 20 avril inclus.</p>

	<div class="mx-auto mb-6 max-w-sm text-xl">
		<ol>
			{#each resultLines as result, i}
				<li class="mb-3 flex flex-row justify-between gap-3" class:winner={i === 0}>
					<div>{i + 1}. {getDepartmentName(result[0])}</div>
					<div>{result[1]} pts</div>
				</li>
			{/each}
		</ol>
	</div>

	<p class="mb-12 text-center text-lg"><a href="/regles-du-jeu">Règles du jeu</a></p>

	<Thanks />
</main>

<style lang="postcss">
	.olympic-red {
		@apply text-[#dd0220];
	}
	.winner {
		@apply text-4xl font-bold text-[#dd0220];
	}
</style>
