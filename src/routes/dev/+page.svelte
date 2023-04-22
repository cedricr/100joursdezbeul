<script lang="ts">
	import actions from '$lib/assets/data.json?raw';
	import Thanks from '$lib/thanks.svelte';

	import { generateLeaderboard, getDayNumber, getDepartmentName } from '$lib/utils';

	const dayNumber = getDayNumber();

	const resultLines = generateLeaderboard(actions);
	const now = new Date();
</script>

<svelte:head><title>100 jours de zbeul WIP</title></svelte:head>

<div class="text-3xl text-center mb-6 mt-8">Jour {dayNumber}</div>
<p class="text-2xl text-center mb-6">{180 - dayNumber} jours restants</p>

<p class="text-center mb-24"><a href="/regles-du-jeu">Règles du jeu</a></p>

<h2>Classement au {now.toLocaleDateString('fr', { dateStyle: 'medium' })}</h2>

<div class="mx-auto w-fit text-xl mb-32">
	<ol>
		{#each resultLines as result, i}
			<li>{i + 1}. {getDepartmentName(result[0])} – {result[1]} pts</li>
		{/each}
	</ol>
</div>

<Thanks />
