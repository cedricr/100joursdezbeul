<script lang="ts">
</script>

<svelte:head><title>Accessibilité du site | 100 jours de zbeul</title></svelte:head>

<div class="mx-auto mt-16 max-w-2xl text-lg">
	<h2 class="zbeul mb-16 mt-16 text-4xl">Accessibilité du site</h2>

	<p>
		Ce site est réalisé avec les règles d’accessibilité web à l’esprit afin de permettre aux
		personnes handicapées d’accéder à l’information sans barrière et de pouvoir également participer
		au zbeul national.
	</p>
	<p>
		L’équipe de 100 jours de zbeul met <strong
			>un point d’honneur à respecter l’accessibilité</strong
		>, en lien avec
		<a
			href="https://solidaires.org/se-syndiquer/nos-positions/#discriminations-liees-aux-handicaps-a-la-sante-et-a-lage"
			>la position antivalidiste de l’Union Syndicale Solidaires</a
		>. Pour approfondir ce sujet, vous pouvez également lire cet article&nbsp;: «&nbsp;<a
			href="https://www.lalutineduweb.fr/inaccessibilite-politique/"
			>L’(in)accessibilité est politique</a
		>&nbsp;».
	</p>
	<p>
		Ainsi, nous n’acceptons que des contributions au code qui respectent les règles d’accessibilité.
		Le code est relu sous ce prisme et des modifications peuvent être demandées ou apportées en
		conséquence.
	</p>

	<h3>Lien d’accès rapide</h3>
	<p>
		Le premier lien disponible dans chaque page de ce site est «&nbsp;Contenu principal&nbsp;». Ce
		lien permet d’aller directement à la zone de contenu principal sans passer par l’en-tête du site
		afin d’accélérer la navigation si vous naviguez au clavier.
	</p>

	<h3>Aides à la navigation dans le site</h3>
	<p>Ce site web contient deux systèmes de navigation différents :</p>

	<ul>
		<li>
			Un double menu de navigation («&nbsp;Menu principal&nbsp;» et «&nbsp;Vues secondaires des
			résultats&nbsp;») est présent dans l’en-tête du site et permet d’accéder aux rubriques
			principales du site ;
		</li>
		<li>
			Une <a href="/plan-site">page plan du site</a> est présente en lien dans le pied de page du site
			et représente l’architecture générale du site.
		</li>
	</ul>

	<h3>Moyen de contact en cas de problème</h3>
	<p>
		Aucun audit d’accessibilité formel n’a été réalisé sur ce site. Il est donc possible que vous
		rencontriez des problèmes que nous n’aurions pas décelés. Si tel est le cas, <strong
			>n’hésitez pas à
			<a href="mailto:100joursdezbeul@solidairesinformatique.org"
				>nous contacter par <i lang="en">e-mail</i></a
			></strong
		> en nous expliquant le problème rencontré. Nous ferons le maximum pour le corriger au plus vite.
	</p>
</div>

<style lang="postcss">
	ul {
		@apply mb-6 list-disc pl-6 text-lg;
	}

	li,
	p {
		@apply mb-3 text-lg;
	}

	h3 {
		@apply mb-8 mt-12 text-2xl font-bold;
	}
</style>
