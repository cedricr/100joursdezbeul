<script lang="ts">
	import actions from '$lib/assets/data.json?raw';
	import Thanks from '$lib/thanks.svelte';

	import { generateLeaderboard, getDayNumber, getDepartmentName } from '$lib/utils';

	const dayNumber = getDayNumber();

	const resultLines = generateLeaderboard(actions);
	const now = new Date();
	const formattedDate = now.toLocaleDateString('fr', { dateStyle: 'medium' });
</script>

<svelte:head><title>100 jours de zbeul WIP</title></svelte:head>

<div class="zbeul mb-6 mt-8 text-center text-4xl">Jour {dayNumber}</div>

<p class="mb-6 text-center text-2xl">{100 - dayNumber} jours restants</p>

<p class="mb-12 text-center"><a href="/regles-du-jeu">Règles du jeu</a></p>

<h2 class="zbeul mb-6">Classement au {formattedDate}</h2>

<div class="mx-auto mb-32 w-fit text-xl">
	<ol>
		{#each resultLines as result, i}
			<li class="mb-3" class:winner={i === 0}>
				{i + 1}. {getDepartmentName(result[0])} – {result[1]} pts
			</li>
		{/each}
	</ol>
</div>

<Thanks />

<style lang="postcss">
	.winner {
		@apply font-bold text-[#dd0220];
	}
</style>
