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
	<div class="mx-auto mb-6 mt-10 max-w-md text-xl">
		<table class="ranking">
			<thead>
				<tr>
					<th scope="col">Département</th>
					<th scope="col">Rang</th>
					<th scope="col">Points</th>
				</tr>
			</thead>
			<tbody>
				{#each resultLines as [code, score], i}
					<tr class="ranking-line">
						<th scope="row">
							<a href="/departement/{code}" class="ranking-link no-underline hover:underline">
								{getDepartmentName(code)}
							</a>
						</th>
						<td class="text-right">
							{#if i === 0}
								<span role="img" aria-label="1">🥇</span>
							{:else if i === 1}
								<span role="img" aria-label="2">🥈</span>
							{:else if i === 2}
								<span role="img" aria-label="3">🥉</span>
							{:else}
								{i + 1}
							{/if}
						</td>
						<td class="text-right">
							{score} pts
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
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
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

	.ranking {
		width: 100%;
		text-align: left;
	}

	.ranking thead {
		background-color: #e5e7eb;
	}

	.ranking tr {
		position: relative;
	}

	.ranking th,
	.ranking td {
		border-width: 1px 0;
		border-style: solid;
		border-color: #e5e7eb;
		padding: 0.5rem;
	}

	.ranking th:nth-child(2),
	.ranking td:nth-child(2) {
		text-align: center;
	}

	.ranking th:last-child {
		text-align: center;
	}
	.ranking td:last-child {
		text-align: right;
	}

	.ranking-line th {
		@apply font-normal;
	}

	.ranking .ranking-line:nth-child(-n + 3),
	.ranking .ranking-line:nth-child(-n + 3) th {
		@apply font-bold;
	}

	.ranking .ranking-line:nth-child(-n + 3) > :nth-child(2) {
		font-size: 125%;
	}

	.ranking-link::before {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		content: '';
	}
</style>
