<script lang="ts">
	import '../app.postcss';
	import logoJO from '$lib/assets/logo-jo-small.jpg';
</script>

<header role="banner">
	<a href="/"
		><img
			src={logoJO}
			alt="100 jours de zbeul - Accueil"
			class="mx-auto block text-center"
			width="300"
			height="178"
		/></a
	>

	<h1 class="zbeul">100 jours de zbeul</h1>
	<p class="zbeul mb-6 text-center">Quels sont les départements qui zbeulent le plus&nbsp;?</p>
</header>
<slot />
<footer class="mt-8" role="contentinfo">
	<hr class="mb-2" />
	<p><a href="https://github.com/cedricr/100joursdezbeul">Code source</a></p>
</footer>
