<script lang="ts">
	import '../app.postcss';
	import logoJO from '$lib/assets/logo-jo.svg';
	import logoSI from '$lib/assets/logo-si.png';
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
		</ul>
	</nav>
</header>
<main role="main" id="main">
	<slot />
</main>
<footer class="my-8" role="contentinfo">
	<hr class="mb-4" />

	<ul class="text-center">
		<li class="inline">
			<a href="/plan-site">Plan du site</a><span aria-hidden="true">&nbsp;·</span>
		</li>
		<li class="inline">
			<a href="https://github.com/cedricr/100joursdezbeul">Code source</a><span aria-hidden="true">
				&nbsp;·</span
			>
		</li>
		<li class="inline">
			<a href="mailto:100joursdezbeul@solidairesinformatique.org">Contact</a><span
				aria-hidden="true"
				>&nbsp;·
			</span>
		</li>
		<li class="inline">
			<a href="/mentions-legales">Mentions légales</a>
		</li>
	</ul>

	<div class="mx-auto mt-8 w-fit">
		<a href="https://solidairesinformatique.org">
			<img alt="Solidaires Informatique" src={logoSI} width="200" height="73" />
		</a>
	</div>
</footer>

<style lang="postcss">
	.main-nav li {
		@apply inline-block p-2;
	}

	.main-nav a {
		@apply decoration-[#0084c7] decoration-2 hover:decoration-1;
	}
</style>
