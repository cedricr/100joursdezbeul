<script lang="ts">
</script>

<svelte:head><title>Règles du jeu | 100 jours de zbeul</title></svelte:head>

<main role="main">
	<div class="mx-auto mt-16 max-w-2xl">
		<p>
			En partant des <a
				href="https://france.attac.org/se-mobiliser/retraites-pour-le-droit-a-une-retraite-digne-et-heureuse/article/on-ne-les-lache-pas-la-carte-des-mobilisations"
				>données</a
			>
			compilées par Attac, on assigne manuellement à chaque événement un type de personne ciblée et un
			type d’action. Les données finales sont accessibles dans le
			<a href="https://github.com/cedricr/100joursdezbeul/blob/main/src/lib/assets/data.json"
				>code source</a
			>. Vérifications sont les bienvenues&nbsp;!
		</p>

		<p>
			Chacune de ces actions attribue un certain nombre de points au département où elles se
			passent&nbsp;; le type de personne ciblée permet de multiplier ces points. Là où plusieurs
			personnalités sont ciblées, les points sont comptés pour chacune.
		</p>

		<h2>Barème</h2>
		<p class="italic">
			(Les règles suivantes vont sans doute évoluer rapidement dans les prochains jours en fonction
			de vos retours. Détails dans le <a
				href="https://github.com/cedricr/100joursdezbeul/blob/main/src/lib/constants.ts#L14"
				>code source</a
			>)
		</p>
		<h3>Types d’actions</h3>
		<ul>
			<li>
				<a href="/comment-participer/#chahut" class="no-underline hover:underline">Chahut</a> (casserolade,
				huée…) — 1 point
			</li>
			<li>
				<a href="/comment-participer/#manifestation" class="no-underline hover:underline"
					>Manifestation</a
				> — 1 point
			</li>
			<li>
				<a href="/comment-participer/#action-creative" class="no-underline hover:underline"
					>Action créative</a
				> (poursuite en forêt, etc…) — 2 points
			</li>
			<li>
				<a href="/comment-participer/#sobirete-energetique" class="no-underline hover:underline"
					>Mise en sobriété énergétique</a
				> — 3 points
			</li>
			<li>
				<a href="/comment-participer/#fuite" class="no-underline hover:underline"
					>Action conduisant au départ précipité d’une personnalité</a
				> — 4 points
			</li>
			<li>
				<a href="/comment-participer/#annulation" class="no-underline hover:underline"
					>Annulation d’une visite 🎉</a
				> — 5 points
			</li>
		</ul>
		<h3>Personnalités</h3>
		<ul>
			<li>Secrétaire d’État — pas de changement</li>
			<li>Ministre délégué·e — x2</li>
			<li>Ministre — x3</li>
			<li>Présidente de l’Assemblée Nationale — x4</li>
			<li>Première ministre — x5</li>
			<li>Président de la République — x6</li>
		</ul>
	</div>
</main>

<style lang="postcss">
	h2 {
		@apply mb-6 mt-12;
	}
	h3 {
		@apply mb-8 mt-12 text-center text-2xl;
	}

	p {
		@apply mb-3 text-lg;
	}
	ul {
		@apply mx-auto mb-6 max-w-lg list-disc;
	}
	li {
		@apply mb-3;
	}
</style>
