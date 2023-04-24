<script lang="ts">
	import type { ActionEvent } from '$lib/types';

	export let event: ActionEvent;

	function getDateLabel(datestring: string) {
		return new Date(datestring).toLocaleDateString('fr-FR', { dateStyle: 'medium' });
	}
</script>

<li class="mb-2 flex flex-row">
	<span class="block w-36 shrink-0"><strong>{getDateLabel(event.date)}&nbsp;:</strong></span>
	<span class="block"
		>{event.description} — <span class="text-[#dd0220]">{event.score} pts</span>
	</span>
</li>
