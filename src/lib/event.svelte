<script lang="ts">
	import { ACTION_LABEL, ACTION_SCORE, TARGET_MULTIPLIER } from '$lib/constants';
	import type { ActionEvent } from '$lib/types';
	import { dateToShortLabel, getPointsDisplay, humanizeLink } from '$lib/utils';

	export let event: ActionEvent;
	export let hideDate = false;

	const liens = event.liens.filter((lien) => !!lien).map((lien) => humanizeLink(lien));
</script>

<li class="mb-8 sm:flex sm:flex-row">
	<div class="w-20 shrink-0">
		{#if !hideDate}<strong><a href="/date/{event.date}">{dateToShortLabel(event.date)}</a></strong
			>{/if}
		<span class="font-bold text-[#dd0220]">{@html getPointsDisplay(event.score)}</span>
	</div>
	<div>
		<span class="font-bold">{event.ville}&nbsp;:</span>
		{event.description}
		<div class="mt-1 flex-wrap gap-1 sm:flex">
			{#each event.actions as action}
				<div class="tag action">
					{ACTION_LABEL[action]}&nbsp;: {@html getPointsDisplay(ACTION_SCORE[action])}
				</div>
			{/each}
		</div>
		<div class="mt-1 flex-wrap gap-1 sm:flex">
			{#each event.cibles as target}
				<div class="tag target">
					<a href="/personnalite/{target.nom}">{target.nom}</a>&nbsp;({target.role.intitule})&nbsp;:
					x{TARGET_MULTIPLIER[target.role.code]}
				</div>
			{/each}
		</div>
		<div class="mt-1 flex-wrap gap-1 sm:flex">
			{#each liens as link}
				<div class="tag target">
					<a href={link.url}>{link.text}</a>
				</div>
			{/each}
		</div>
	</div>
</li>

<style lang="postcss">
	.tag {
		@apply py-0.5 pr-2 text-sm font-bold;
	}

	.action {
		@apply text-slate-700;
	}

	.target {
		@apply text-slate-700;
	}
</style>
