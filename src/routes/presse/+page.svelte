<script lang="ts">
	import rawMediaRefs from '$lib/assets/media-refs?raw';

	interface MediaRef {
		content: string;
		source: string;
		image: string;
	}

	const mediaRefs = JSON.parse(rawMediaRefs) as MediaRef[];
</script>

<svelte:head><title>Presse | 100 jours de zbeul</title></svelte:head>

<main role="main">
	<div class="mx-auto mb-16 mt-16 max-w-xl">
		<h2 class="zbeul mb-16 mt-16 text-4xl">Revue de presse</h2>

		<ul>
			{#each mediaRefs as link}
				<li class="mb-3 flex items-center gap-8 text-xl">
					<img class="image h-10 w-10 rounded-full" src={link.image} alt="" />
					<a
						class="link text-xl no-underline hover:underline"
						target="_blank"
						href={link.source}
						rel="noreferrer"
					>
						{link.content}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</main>
