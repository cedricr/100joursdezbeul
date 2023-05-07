<script lang="ts">
</script>

<svelte:head><title>Plan du site | 100 jours de zbeul</title></svelte:head>

<div class="mx-auto mt-16 max-w-2xl">
	<h2 class="zbeul mb-16 mt-16 text-4xl">Plan du site</h2>
	<ul>
		<li><a href="/">Accueil</a></li>
		<li><a href="/nouveautes">Nouveautés dans le classement</a></li>
		<li><a href="/regles-du-jeu">Règles du jeu</a></li>
		<li><a href="/comment-participer">Comment participer</a></li>
		<li><a href="/presse">Revue de presse</a></li>
	</ul>
</div>

<style lang="postcss">
	h2 {
		@apply mb-6 mt-12;
	}
	h3 {
		@apply mb-8 mt-12 text-2xl;
	}

	p {
		@apply mb-3 text-lg;
	}
	ul {
		@apply mx-auto mb-6 max-w-lg list-disc pl-4;
	}
	li {
		@apply mb-3 text-lg;
	}
</style>
