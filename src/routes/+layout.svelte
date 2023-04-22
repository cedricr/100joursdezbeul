<script lang="ts">
	import '../app.postcss';
	import logoJO from '$lib/assets/logo-jo-small.jpg';
</script>

<header>
	<img
		src={logoJO}
		alt="Parodie du logo des Jeux Olympiques (cinq anneaux bleu, jaune, noir, vert, et rouge entrecroisé) les anneaux ont un manche ce qui en fait des casseroles."
		title="Source : https://nitter.net/Teddyruptif/status/1649460414676172803"
		class="block text-center mx-auto"
		width="300"
		height="178"
	/>

	<h1>100 jours de zbeul</h1>
	<p class="text-center mb-6">Quels sont les départements qui zbeulent le plus&nbsp;?</p>
</header>
<slot />
