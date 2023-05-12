<script lang="ts">
	import { TARGETS } from '$lib/constants';

	const targets = TARGETS;
</script>

<svelte:head><title>Personnalités | 100 jours de zbeul</title></svelte:head>

<div class="mx-auto mb-16 mt-16 max-w-2xl">
	<h2 class="zbeul mb-16 mt-16 text-4xl">Personnalités</h2>

	<ul>
		{#each targets as target}
			<li class="mb-5 flex items-center gap-4 text-xl">
				<img
					class="image h-10 w-10 rounded-full object-cover"
					src={target.image}
					alt={`Photo de ${target.nom}`}
				/>
				<a class="link no-underline hover:underline" href="/personnalite/{target.nom}">
					<div class="text-xl">
						{target.nom}<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							class="icon-link ml-1.5 inline-block w-3.5 fill-blue-600"
							aria-hidden="true"
							><path
								d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"
							/></svg
						>
					</div>
					<div class="text-sm text-slate-700">{target.titre}</div>
				</a>
			</li>
		{/each}
	</ul>
</div>
