<script lang="ts">
   const linksPromise = import(/* @vite-ignore */ './links.json');
</script>

<svelte:head><title>Presse | 100 jours de zbeul</title></svelte:head>

<main role="main">
	<div class="mx-auto mt-16 max-w-2xl">
    
    
		<h2>Revue de presse</h2>
    
		<ul>
			{#await linksPromise then links}
			{#each links as link}
			<li class="flex items-center gap-2 mb-3">
				<img class="image w-12 h-12 rounded-full" src="{link.img}" alt="" width="384" height="512">
				<a class="link text-lg font-medium no-underline hover:underline" target="_blank" href="{link.source}" rel="noreferrer">
					{link.content}
				</a>
			</li>
			{/each}
			{/await}
		</ul>
	</div>
</main>

<style lang="postcss">

</style>
