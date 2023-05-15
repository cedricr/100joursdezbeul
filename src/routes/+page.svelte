<script lang="ts">
	import medailleOr from '$lib/assets/icons/medaille-or.svg';
	import medailleArgent from '$lib/assets/icons/medaille-argent.svg';
	import medailleBronze from '$lib/assets/icons/medaille-bronze.svg';

	import {
		dateToLabel,
		dateToShortLabel,
		getDayNumber,
		getDepartmentName,
		getLatestDate,
		getPopulationWeightedScore
	} from '$lib/utils';
	import type { ActionEvent, DepartmentResult, Score } from '$lib/types';
	import { ScoreType } from '$lib/constants';
	export let data;
	const dayNumber = getDayNumber();
	let scoreType: ScoreType = ScoreType.RAW;

	const append = (a, x) => a.concat([x]);

	function generateLeaderboard(actionEvents: ActionEvent[]) {
		const departmentsResults: DepartmentResult = {};
		actionEvents.forEach((event) => {
			const dept = event.departement;
			departmentsResults[dept] = {
				raw: (departmentsResults[dept]?.raw || 0) + event.score,
				perPopulation: 0
			};
		});

		Object.entries(departmentsResults).forEach((departmentResult) => {
			departmentsResults[departmentResult[0]] = {
				raw: departmentResult[1].raw,
				perPopulation: getPopulationWeightedScore(departmentResult[0], departmentResult[1].raw)
			};
		});

		return Object.entries(departmentsResults).sort((d1, d2) => d2[1][scoreType] - d1[1][scoreType]);
	}

	$: resultLines = generateLeaderboard(data.actions)
		.map(([code, score]) => ({ code, score }))
		.reduce<{ code: string; score: Score; rank: number }[]>(
			(acc, x, i) =>
				append(acc, {
					...x,
					rank:
						i > 0 && x.score[scoreType] === acc[i - 1].score[scoreType] ? acc[i - 1].rank : i + 1
				}),
			[]
		);

	const now = new Date();
	const formattedDate = dateToShortLabel(now);
	const lastUpdateDate = getLatestDate(data.actions);
	const formattedLastUpdateDate = dateToLabel(lastUpdateDate);
</script>

<svelte:head>
	<title>100 jours de zbeul</title>
</svelte:head>

<p class="mb-16 mt-24 text-center">
	<span class="zbeul olympic-red mb-0 block text-8xl leading-[5rem]">
		{100 - dayNumber}
	</span>
	<span class="mt-0 block text-xl">jours restants</span>
</p>

<h2 class="zbeul mb-2">Classement au {formattedDate}</h2>

<p class="mb-2 text-center italic">
	Derniers événements pris en compte&nbsp;: <a href="/nouveautes">{formattedLastUpdateDate}</a>
</p>

<div class="switch-field-wrapper mt-4 flex justify-center">
	<fieldset class="switch-field flex w-full flex-col items-center justify-center text-center">
		<legend class="mb-2 contents">Type de score</legend>
		<div class="flex">
			<input
				type="radio"
				bind:group={scoreType}
				name="scoreType"
				value={ScoreType.RAW}
				id={ScoreType.RAW}
			/>
			<label for="raw">Score</label>
			<input
				type="radio"
				bind:group={scoreType}
				name="scoreType"
				value={ScoreType.PER_POPULATION}
				id={ScoreType.PER_POPULATION}
			/>
			<label for="perPopulation">Score/Population</label>
		</div>
	</fieldset>
</div>

<div class="mx-auto mb-6 mt-10 max-w-lg text-xl">
	<table class="ranking w-full text-left">
		<thead>
			<tr>
				<th scope="col" class="p-1 sm:p-2">Département</th>
				<th scope="col" class="p-1 text-center sm:p-2">Rang</th>
				<th scope="col" class="p-1 text-center sm:p-2">Points</th>
			</tr>
		</thead>
		<tbody>
			{#each resultLines as { code, score, rank }}
				<tr
					class="ranking-line relative relative border-l-4 border-transparent"
					class:hover:border-yellow-800={rank === 1}
					class:hover:bg-yellow-100={rank === 1}
					class:hover:border-slate-800={rank === 2}
					class:hover:bg-slate-100={rank === 2}
					class:hover:border-orange-800={rank === 3}
					class:hover:bg-orange-100={rank === 3}
					class:hover:border-blue-800={rank > 3}
					class:hover:bg-blue-100={rank > 3}
				>
					<th scope="row" class="p-1 sm:p-2">
						<a
							href="/departement/{code}"
							class="link-block no-underline"
							class:font-bold={rank < 4}
						>
							{getDepartmentName(code)}
						</a>
					</th>
					<td class="p-1 text-center sm:p-2">
						{#if rank === 1}
							<img role="img" src={medailleOr} alt="1 (médaille d’or)" class="m-auto" />
						{:else if rank === 2}
							<img role="img" src={medailleArgent} alt="2 (médaille d’argent)" class="m-auto" />
						{:else if rank === 3}
							<img role="img" src={medailleBronze} alt="3 (médaille de bronze)" class="m-auto" />
						{:else}
							{rank}
						{/if}
					</td>
					<td class="p-1 text-right sm:p-2" class:font-bold={rank < 4}>
						{score[scoreType]}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							class="icon-link ml-1.5 inline-block w-3.5 duration-200 ease-out"
							aria-hidden="true"
							class:fill-yellow-800={rank === 1}
							class:fill-slate-800={rank === 2}
							class:fill-orange-800={rank === 3}
							class:fill-blue-800={rank > 3}
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

<style lang="postcss">
	.olympic-red {
		@apply text-[#dd0220];
	}

	.ranking thead {
		background-color: #e5e7eb;
	}

	.ranking tr:hover svg {
		transform: translate(0.2rem);
	}

	.ranking th,
	.ranking td {
		border-width: 1px 0;
		border-style: solid;
		border-color: #e5e7eb;
	}

	.ranking th:last-child,
	.ranking td:last-child {
		min-width: 7rem;
	}

	.ranking-line th {
		@apply font-normal;
	}
</style>
