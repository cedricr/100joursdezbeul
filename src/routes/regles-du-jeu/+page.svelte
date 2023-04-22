<script lang="ts">
</script>

<svelte:head><title>Règles du jeu | 100 jours de zbeul</title></svelte:head>

<div class="mx-auto mt-16 max-w-2xl">
	<p>
		En partant des <a
			href="https://france.attac.org/se-mobiliser/retraites-pour-le-droit-a-une-retraite-digne-et-heureuse/article/on-ne-les-lache-pas-la-carte-des-mobilisations"
			>données</a
		>
		compilées par Attac, on assigne à chaque événement un type de personne ciblée (secrétaire d’État,
		ministre déléguée, ministre, Première ministre, présidente de l’AN, président de la République) et
		un type d’action (manifestation, chahut, mise en sobriété, action conduisant à une fuite de la personnalité,
		ou action créative). Les données finales sont accessibles dans le
		<a href="https://github.com/cedricr/100joursdezbeul/blob/main/src/lib/assets/data.json"
			>code source</a
		>.
	</p>

	<p>
		Chacune de ces actions attribue un certain nombre de points au département où elle se
		passe&nbsp;; le type de personne ciblée permet de multiplier ces points. Pour les événements où
		plusieurs personnalités sont ciblées, les points sont comptés pour chacune.
	</p>

	<p>
		Les barèmes, consultables dans le <a
			href="https://github.com/cedricr/100joursdezbeul/blob/main/src/lib/utils.ts#L11"
			>code source</a
		>, vont sans doute évoluer rapidement dans les prochains jours.
	</p>
</div>

<style lang="postcss">
	p {
		@apply mb-3 text-lg;
	}
</style>
