<script lang="ts">
	import dayjs from 'dayjs';

	import casseroleOr from '$lib/assets/icons/casserole-or.svg';
	import casseroleArgent from '$lib/assets/icons/casserole-argent.svg';
	import casseroleBronze from '$lib/assets/icons/casserole-bronze.svg';
	// import evolHaut from '$lib/assets/icons/evol-haut.svg';
	import {
		dateToShortLabel,
		dateToString,
		filterEventsUntilDate,
		getDepartmentName,
		getLatestDate
	} from '$lib/utils';
	import type { ActionEvent, DepartmentResult } from '$lib/types';
	import { startDay } from './constants';

	export let actions: ActionEvent[];
	export let date: Date;

	$: validActions = filterEventsUntilDate(dateToString(date), actions);
	const append = (a, x) => a.concat([x]);

	function generateLeaderboard(actionEvents: ActionEvent[]) {
		const departmentsResults: DepartmentResult = {};
		actionEvents.forEach((event) => {
			const dept = event.departement;
			departmentsResults[dept] = (departmentsResults[dept] || 0) + event.score;
		});
		return Object.entries(departmentsResults).sort((d1, d2) => {
			return d2[1] - d1[1];
		});
	}

	$: resultLines = generateLeaderboard(validActions)
		.map(([code, score]) => ({ code, score }))
		.reduce(
			(acc, x, i) =>
				append(acc, {
					...x,
					rank: i > 0 && x.score === acc[i - 1].score ? acc[i - 1].rank : i + 1
				}),
			[]
		);

	$: formattedDate = dateToShortLabel(date);
	$: previousDay = dayjs(date).subtract(1, 'day');
	$: nextDay = dayjs(date).add(1, 'day');

	$: latestDate = getLatestDate(actions);
	$: hasNextDate = dayjs(latestDate).isAfter(dayjs(date), 'day');
	$: hasPreviousDate = dayjs(startDay).isBefore(dayjs(date), 'day');
</script>

<div class="text-center">
	{#if hasPreviousDate}
		<a href="/classement/{dateToString(previousDay)}" class="zbeul text-4xl no-underline">
			<span aria-hidden="true">&lt;&nbsp;</span><span class="sr-only">jour précédent</span>
		</a>
	{:else}
		<span aria-hidden="true" class="zbeul text-4xl text-gray-300">&lt;&nbsp;</span>
	{/if}

	<h2 class="zbeul mb-2 inline">Classement au {formattedDate}</h2>
	{#if hasNextDate}
		<a href="/classement/{dateToString(nextDay)}" class="zbeul text-4xl no-underline">
			<span aria-hidden="true">&nbsp;&gt;</span><span class="sr-only">jour suivant</span>
		</a>
	{:else}
		<span aria-hidden="true" class="zbeul text-4xl text-gray-300">&nbsp;&gt;</span>
	{/if}
</div>
<div class="mx-auto mb-6 mt-10 max-w-lg text-base sm:text-xl">
	<table class="ranking w-full text-left">
		<thead class="text-base">
			<tr>
				<th scope="col" class="p-1 sm:p-2">Département</th>
				<th scope="col" class="p-1 text-center sm:p-2">Classement</th>
				<th scope="col" class="p-1 text-right sm:p-2">Score</th>
			</tr>
		</thead>
		<tbody>
			{#each resultLines as { code, score, rank }}
				<tr
					class="ranking-line relative border-l-4 border-transparent"
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
							class="relative block pr-4 no-underline"
							class:font-bold={rank < 4}
						>
							{getDepartmentName(code)}<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								class="icon-link absolute right-0 top-0.5 ml-1.5 w-3.5 duration-200 ease-out"
								aria-hidden="true"
								class:fill-yellow-800={rank === 1}
								class:fill-slate-800={rank === 2}
								class:fill-orange-800={rank === 3}
								class:fill-blue-800={rank > 3}
								><path
									d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"
								/></svg
							>
						</a>
					</th>
					<td class="p-1 text-center sm:p-2">
						{#if rank === 1}
							<img
								role="img"
								src={casseroleOr}
								alt="Premier (casserole d’or)"
								width="35"
								height="35"
								class="m-auto inline"
							/>
						{:else if rank === 2}
							<img
								role="img"
								src={casseroleArgent}
								alt="Deuxième (casserole d’argent)"
								width="35"
								height="35"
								class="m-auto inline"
							/>
						{:else if rank === 3}
							<img
								role="img"
								src={casseroleBronze}
								alt="Troisième (casserole de bronze)"
								width="35"
								height="35"
								class="m-auto inline"
							/>
						{:else}
							<span aria-hidden="true">{rank}<sup>e</sup></span>
							<span class="sr-only">{rank}<sup>ème</sup></span>
						{/if}
						<!-- <img
							role="img"
							src={evolHaut}
							alt="en progression"
							width="35"
							height="35"
							class="inline"
						/> -->
					</td>
					<td class="whitespace-nowrap p-1 text-right sm:p-2" class:font-bold={rank < 4}>
						{score}&thinsp;<span class="text-sm" aria-hidden="true">pts</span><span class="sr-only"
							>points</span
						>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style lang="postcss">
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
