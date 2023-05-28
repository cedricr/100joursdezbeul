<script lang="ts">
	import { ACTION_LABEL, ACTION_SCORE, TARGET_MULTIPLIER } from '$lib/constants';
	import type { ActionEvent } from '$lib/types';
	import { dateToShortLabel, getPointsDisplay, humanizeLink } from '$lib/utils';

	export let event: ActionEvent;
	export let hideDate = false;
	export let titleLevel = 3;

	const liens = event.liens.filter((lien) => !!lien).map((lien) => humanizeLink(lien));

	$: titleElt = `h${titleLevel}`;
	$: subTitleElt = `h${titleLevel + 1}`;
</script>

<svelte:element this={titleElt} class="mainTitle">
	{#if !hideDate}<span><a href="/date/{event.date}">{dateToShortLabel(event.date)}</a></span>,{/if}
	{event.ville} —
	<span class="text-[#dd0220]">{@html getPointsDisplay(event.score)}</span>
</svelte:element>
<p>
	{event.description}
</p>
<div class="flex-wrap sm:flex">
	<div class="sm:w-1/2">
		<svelte:element this={subTitleElt} class="subTitle">Types d'action&nbsp;:</svelte:element>
		<ul>
			{#each event.actions as action}
				<li class="tag action">
					{ACTION_LABEL[action]}&nbsp;: {@html getPointsDisplay(ACTION_SCORE[action])}
				</li>
			{/each}
		</ul>
	</div>
	{#if event.cibles.length}
		<div class="sm:w-1/2">
			<svelte:element this={subTitleElt} class="subTitle">Personnalités&nbsp;:</svelte:element>
			<ul>
				{#each event.cibles as target}
					<li class="tag target">
						{target.role.intitule}&nbsp;: ×{TARGET_MULTIPLIER[target.role.code]}
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>

<svelte:element this={subTitleElt} class="subTitle">Sources&nbsp;:</svelte:element>
<ul>
	{#each liens as link}
		<li class="tag target inline">
			<a href={link.url}>{link.text}</a>
		</li>
	{/each}
</ul>

<style lang="postcss">
	.mainTitle {
		@apply mb-8 mt-12 text-center text-2xl font-bold;
	}

	.subTitle {
		@apply mb-1 mt-4 text-base font-bold;
	}

	.tag {
		@apply py-1 pr-2 text-sm font-bold;
	}

	.action {
		@apply text-slate-700;
	}

	.target {
		@apply text-slate-700;
	}
</style>
