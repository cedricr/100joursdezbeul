<script lang="ts">
	import '../app.postcss';
	import logoJO from '$lib/assets/logo-jo-small.jpg';
</script>

<header>
	<a href="/"
		><img
			src={logoJO}
			alt="Parodie du logo des Jeux Olympiques (cinq anneaux bleu, jaune, noir, vert, et rouge entrecroisé) les anneaux ont un manche ce qui en fait des casseroles."
			title="Source : https://nitter.net/Teddyruptif/status/1649460414676172803"
			class="mx-auto block text-center"
			width="300"
			height="178"
		/></a
	>

	<h1 class="zbeul">100 jours de zbeul</h1>
	<p class="zbeul mb-6 text-center">Quels sont les départements qui zbeulent le plus&nbsp;?</p>
</header>
<slot />
<footer class="mt-8">
	<hr class="mb-2" />
	<p><a href="https://github.com/cedricr/100joursdezbeul">Code source</a></p>
</footer>
