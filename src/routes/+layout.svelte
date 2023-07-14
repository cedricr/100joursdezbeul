<script lang="ts">
	import '../app.postcss';
	import logoJO from '$lib/assets/logo-jo.svg';
	import Footer from './footer.svelte';
</script>

<header role="banner">
	<div class="flex flex-col-reverse">
		<nav role="navigation" aria-label="Accès rapide" class="m-2 mb-3 text-sm text-gray-600 sm:m-4">
			<ul>
				<li class="inline">
					<a href="#main">Contenu principal</a><span aria-hidden="true"> &nbsp;·</span>
				</li>
				<li class="inline"><a href="/accessibilite">Accessibilité</a></li>
			</ul>
		</nav>

		<div class="bg-black text-center">
			<p class="p-4 text-xl font-bold uppercase text-white md:text-2xl">
				<a
					href="https://solidaires.org/sinformer-et-agir/actualites-et-mobilisations/communiques/notre-pays-est-en-deuil-et-en-colere/"
					>Justice pour Nahel. Non aux violences policières.</a
				>
			</p>
		</div>
	</div>
	<div class="m-2 sm:m-4">
		<div class="flex items-center md:block">
			<p class="mr-2 w-[25%] text-center sm:mr-6 md:mr-0 md:w-auto">
				<a href="/" class="inline-block">
					<img src={logoJO} alt="100 jours de zbeul - Accueil" width="300" height="168" />
				</a>
			</p>

			<h1 class="zbeul">100 jours de zbeul</h1>
		</div>
		<p class="zbeul mb-6 text-center">Quels sont les départements qui zbeulent le plus&nbsp;?</p>
	</div>

	<nav
		role="navigation"
		aria-label="Menu principal"
		class="main-nav border-y border-solid border-gray-200 py-2"
	>
		<ul class="mx-auto max-w-2xl text-center text-lg">
			<li><a href="/" title="Scores - Page d’accueil">Scores</a></li>
			<li><a href="/regles-du-jeu">Règles du jeu</a></li>
			<li>
				<a
					href="https://france.attac.org/se-mobiliser/retraites-pour-le-droit-a-une-retraite-digne-et-heureuse/article/on-ne-les-lache-pas-la-carte-des-mobilisations"
				>
					La carte du zbeul
				</a>
			</li>
		</ul>
	</nav>

	<nav role="navigation" aria-label="Vues secondaires des résultats" class="main-nav bg-gray-200">
		<ul class="mx-auto text-center">
			<li><a href="/calendrier">Calendrier</a></li>
			<li><a href="/statistiques">Statistiques</a></li>
		</ul>
	</nav>
</header>

<main role="main" id="main" class="m-2 sm:m-4">
	<slot />
</main>

<Footer />

<style lang="postcss">
	.main-nav li {
		@apply inline-block p-1 sm:p-2;
	}

	.main-nav a {
		@apply decoration-blue-800 decoration-1 hover:decoration-2;
	}
</style>
