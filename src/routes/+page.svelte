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
		<ol class="flex flex-col gap-3">
			{#each resultLines as result, i}
				<li class="flex flex-row justify-between gap-3" class:winner={i === 0}>
					<div>
						{i + 1}.
						<a href="/departement/{result[0]}" class="no-underline hover:underline"
							>{getDepartmentName(result[0])}</a
						>
					</div>
					<div>{result[1]} pts</div>
				</li>
			{/each}
		</ol>
	</div>

	<p class="mb-20 text-center text-lg"><a href="/regles-du-jeu">Règles du jeu</a></p>

	<Thanks />
</main>

<style lang="postcss">
	.olympic-red {
		@apply text-[#dd0220];
	}

	ol > li:first-child {
		@apply text-4xl font-bold text-[#dd0220];
	}

	ol > li:nth-child(2) {
		@apply text-3xl font-bold;
	}
	
	ol > li:nth-child(3) {
		@apply text-2xl font-bold;
	}
</style>
