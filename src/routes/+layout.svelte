<script lang="ts">
	import '../app.postcss';
	import logoJO from '$lib/assets/logo-jo.svg';
	import logoSI from '$lib/assets/logo-si.png';
</script>

<header role="banner">
	<a href="/">
		<img
			src={logoJO}
			alt="100 jours de zbeul - Accueil"
			class="mx-auto block text-center"
			width="300"
			height="168"
		/></a
	>

	<h1 class="zbeul">100 jours de zbeul</h1>
	<p class="zbeul mb-6 text-center">Quels sont les départements qui zbeulent le plus&nbsp;?</p>
</header>
<slot />
<footer class="my-8" role="contentinfo">
	<hr class="mb-4" />

	<p class="text-center">
		<a href="https://github.com/cedricr/100joursdezbeul">Code source</a> ·
		<a href="mailto:100joursdezbeul@solidairesinformatique.org">Contact</a>
	</p>

	<div class="mx-auto mt-8 w-fit">
		<a href="https://solidairesinformatique.org"
			><img alt="Solidaires Informatique" src={logoSI} width="200" height="73" />
		</a>
	</div>
</footer>
