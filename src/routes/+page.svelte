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
	<p class="mb-2 text-center italic">(tenant compte des données jusqu’au 26 avril inclus)</p>
	<p class="mb-6 text-center italic">
		Cliquez sur le nom du département pour avoir le détail du décompte.
	</p>
	<div class="mx-auto mb-6 mt-10 max-w-sm text-xl">
		<ul class="ranking">
			{#each resultLines as [code, score], i}
				<li class="ranking-item grid-auto-1-auto grid gap-x-2">
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
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							class="icon-link"
							aria-hidden="true"
							><path
								d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"
							/></svg
						>
					</a>
					<div class="text-right">{score} pts</div>
				</li>
			{/each}
		</ul>
	</div>

	<p class="mb-20 text-center text-lg">
		<a href="/regles-du-jeu">Règles du jeu</a>
		<br />
		<a href="/comment-participer">Comment participer</a>
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

	.ranking > :nth-child(-n + 3) {
		@apply font-bold;
	}

	.ranking-item {
		padding: 0.5rem 0;
	}
</style>
