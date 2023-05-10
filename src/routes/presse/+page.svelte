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

<div class="mx-auto mb-16 mt-16 max-w-2xl">
	<h2 class="zbeul mb-16 mt-16 text-4xl">Revue de presse</h2>

	<ul>
		{#each mediaRefs as link}
			<li class="mb-5 flex items-center gap-4 text-xl">
				<img class="image h-10 w-10 rounded-full" src={link.image} alt="" />
				<a class="link text-xl no-underline hover:underline" href={link.source}>
					{link.content}<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						class="icon-link"
						aria-hidden="true"
						><path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z" /></svg
					>
				</a>
			</li>
		{/each}
	</ul>
</div>
