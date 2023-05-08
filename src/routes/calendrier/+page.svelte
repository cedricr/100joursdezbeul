<script lang="ts">
	import calendrierAujourdhui from '$lib/assets/icons/calendrier-aujourdhui.svg';
	import calendrierPasse from '$lib/assets/icons/calendrier-passe.svg';
	import { startDay } from '$lib/constants';
	import type { ActionEvent } from '$lib/types';
	import {
		dateToLabel,
		dateToString,
		getLatestDate,
		getNationalScoreForDate,
		getPointsDisplay
	} from '$lib/utils';
	import dayjs from 'dayjs';

	// import calendrierFutur from '$lib/assets/icons/calendrier-futur.svg';
	export let data;
	const startDate = dayjs(startDay);

	const pastDates: { date: string; label: string }[] = [];
	for (let i = 0; i <= 100; i++) {
		const date = startDate.add(i, 'day');

		pastDates.push({ date: dateToString(date), label: dateToLabel(date) });
		if (dateToString(date) === dateToString(getLatestDate(data.actions))) {
			break;
		}
	}
	pastDates.reverse();

	function getCalPointsDisplay(date: string, actions: ActionEvent[]) {
		const numPoints = getNationalScoreForDate(date, actions);
		let suffix = '!';
		if (numPoints === 0) {
			suffix = '😔';
		} else if (numPoints >= 100) {
			suffix = '🎉';
		}

		return `${getPointsDisplay(numPoints)}&nbsp;${suffix}`;
	}
</script>

<svelte:head>
	<title>Calendrier du zbeul national | 100 jours de zbeul</title>
</svelte:head>

<h2 class="zbeul mb-16 mt-16 text-4xl">Calendrier du zbeul national</h2>

<div class="mx-auto mb-24 mt-10 max-w-4xl text-xl">
	<!-- <h3 class="text-3xl font-bold">Mai</h3> -->
	<div class="xs:grid-cols-1 mb-6 mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
		<!-- Bloc date future -->
		<!-- <div class="relative bg-slate-100">
			<div class="flex items-center justify-between bg-[#254093] px-4 py-2 text-white">
				<h4 class="font-bold">
					<a href="" class="link-block hover:no-underline">Lundi 8 mai</a>
				</h4>
				<img role="img" src={calendrierFutur} alt="Date future" />
			</div>
			<div class="p-4 text-base">
				<p>En attente de comptage :</p>
				<ul class="list-disc pl-5">
					<li>Casserolade à Nantes</li>
					<li>Visite de bidule ministre à Paris</li>
				</ul>
			</div>
		</div> -->
		<!-- /bloc -->

		<!-- Bloc date du jour -->
		<!-- <div class="relative bg-slate-100">
			<div class="flex items-center justify-between bg-[#DC0B21] px-4 py-2 text-white">
				<h4 class="font-bold">
					<a href="" class="link-block hover:no-underline">Dimanche 7 mai</a>
				</h4>
				<img role="img" src={calendrierAujourdhui} alt="Aujourd’hui" />
			</div>
			<div class="p-4 text-base">
				<p>En attente de comptage :</p>
				<ul class="list-disc pl-5">
					<li>Casserolade à Nantes</li>
					<li>Visite de bidule ministre à Paris</li>
				</ul>
			</div>
		</div> -->
		<!-- /bloc -->

		<!-- Blocs dates passées -->
		{#each pastDates as date}
			<div class="relative bg-slate-100">
				<div class="flex items-center justify-between bg-slate-600 px-4 py-2 text-white">
					<h4 class="font-bold">
						<a href="/date/{date.date}" class="link-block hover:no-underline">{date.label}</a>
					</h4>
					<img role="img" src={calendrierPasse} alt="Date passée" />
				</div>
				<div class="p-4 text-base">
					<p class="text-center">
						{@html getCalPointsDisplay(date.date, data.actions)}
					</p>
				</div>
			</div>
		{/each}
		<!-- /bloc -->

		<!-- /bloc -->
	</div>
	<!-- /.grid-->

	<!-- <h3 class="text-3xl font-bold">Avril</h3> -->
	<!-- … -->
</div>
