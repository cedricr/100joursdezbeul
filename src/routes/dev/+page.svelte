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

<div class="text-4xl text-center mb-6 mt-8 zbeul">Jour {dayNumber}</div>

<p class="text-2xl text-center mb-6">{180 - dayNumber} jours restants</p>

<p class="text-center mb-12"><a href="/regles-du-jeu">Règles du jeu</a></p>

<h2 class="zbeul mb-6">Classement au {formattedDate}</h2>

<div class="mx-auto w-fit text-xl mb-32">
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
		@apply text-[#dd0220] font-bold;
	}
</style>
