<script lang="ts">
	import Thanks from '$lib/thanks.svelte';

	import { LEADERBOARD, getDayNumber, getDepartmentName } from '$lib/utils';

	const dayNumber = getDayNumber();

	const resultLines = LEADERBOARD;
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
	<p class="mb-2 text-center italic">(tenant compte des données jusqu’au 24 avril inclus)</p>
	<p class="mb-6 text-center italic">
		Cliquez sur le nom du département pour avoir le détail du décompte.
	</p>
	<div class="mx-auto mb-6 mt-10 max-w-sm text-xl">
		<div class="ranking grid grid-auto-1-auto gap-y-3 gap-x-2">

			{#each resultLines as result, i}
			<span class="inline-flex items-center justify-end px-2 py-1 font-bold leading-none rounded">
				{i + 1}.
			</span>
  			<a href="/departement/{result[0]}" class="no-underline hover:underline">
    			<span class="inline-flex items-center justify-center px-2 py-1 font-bold leading-none rounded">
      				{getDepartmentName(result[0])}</span>
  			</a>
  			<div class="text-right">{result[1]} pts</div>
			{/each}
		</div>
	</div>

	<p class="mb-20 text-center text-lg"><a href="/regles-du-jeu">Règles du jeu</a></p>

	<Thanks />
</main>

<style lang="postcss">
	.olympic-red {
		@apply text-[#dd0220];
	}

	.grid-auto-1-auto {
  		grid-template-columns: auto 1fr auto;
	}


	.ranking > span:nth-of-type(1),
	.ranking > a:nth-of-type(1) > span {
		@apply text-yellow-100 bg-yellow-700;
	}

	.ranking > span:nth-of-type(2),
	.ranking > a:nth-of-type(2) > span {
		@apply text-gray-100 bg-gray-700;
	}

	.ranking > span:nth-of-type(3),
	.ranking > a:nth-of-type(3) > span {
		@apply text-orange-100 bg-orange-700;
	}

</style>
