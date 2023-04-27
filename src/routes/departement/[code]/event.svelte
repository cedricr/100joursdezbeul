<script lang="ts">
	import { ACTION_LABEL, ACTION_SCORE, TARGET_LABEL, TARGET_MULTIPLIER } from '$lib/constants';
	import type { ActionEvent } from '$lib/types';
	import { getPointsDisplay } from '$lib/utils';

	export let event: ActionEvent;

	function getDateLabel(datestring: string) {
		return new Date(datestring).toLocaleDateString('fr-FR', { dateStyle: 'short' }).slice(0, 5);
	}
</script>

<li class="mb-2 flex flex-row">
	<div class="w-20 shrink-0">
		<strong>{getDateLabel(event.date)}&nbsp;:</strong>
		<span class="text-[#dd0220]">{@html getPointsDisplay(event.score)}</span><br />
	</div>
	<div>
		{event.description}
		<div class="mt-1 flex flex-wrap gap-1">
			{#each event.actions as action}
				<div class="tag action">
					{ACTION_LABEL[action]}&nbsp;: {@html getPointsDisplay(ACTION_SCORE[action])}
				</div>
			{/each}
		</div>
		<div class="mt-1 flex flex-wrap gap-1">
			{#each event.cibles as cible}
				<div class="tag target">
					{TARGET_LABEL[cible]}&nbsp;: x{TARGET_MULTIPLIER[cible]}
				</div>
			{/each}
		</div>
	</div>
</li>

<style lang="postcss">
	.tag {
		@apply whitespace-nowrap py-0.5 pr-2 text-xs font-bold;
	}

	.action {
		@apply text-slate-700;
	}

	.target {
		@apply text-slate-700;
	}
</style>
