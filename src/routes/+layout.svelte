<script lang="ts">
	import '../app.postcss';
	import logoJO from '$lib/assets/logo-jo.svg';
	import Footer from './footer.svelte';
</script>

<header role="banner">
	<nav role="navigation" aria-label="Accès rapide" class="mb-2 text-sm">
		<a href="#main">Contenu principal</a>
	</nav>

	<p class="text-center">
		<a href="/" class="inline-block">
			<img src={logoJO} alt="100 jours de zbeul - Accueil" width="300" height="168" />
		</a>
	</p>

	<h1 class="zbeul">100 jours de zbeul</h1>
	<p class="zbeul mb-6 text-center">Quels sont les départements qui zbeulent le plus&nbsp;?</p>

	<nav
		role="navigation"
		aria-label="Menu principal"
		class="main-nav border-y border-solid border-gray-200 py-2"
	>
		<ul class="mx-auto text-center text-lg">
			<li><a href="/">Accueil</a></li>
			<li><a href="/calendrier">Calendrier</a></li>
			<li><a href="/regles-du-jeu">Règles du jeu</a></li>
			<li><a href="/comment-participer">Participer</a></li>
			<li>
				<a
					href="https://framaforms.org/100-jours-de-zbeul-proposer-un-evenement-1682372493"
					class="bg-blue-800 p-2 font-bold text-white no-underline hover:bg-blue-950 focus:bg-blue-950"
				>
					Signaler une action
				</a>
			</li>
		</ul>
	</nav>
</header>

<main role="main" id="main">
	<slot />
</main>

<Footer />

<style lang="postcss">
	.main-nav li {
		@apply inline-block p-2;
	}

	.main-nav a {
		@apply decoration-blue-800 decoration-1 hover:decoration-2;
	}
</style>
