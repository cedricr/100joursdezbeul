<script lang="ts">
</script>

<svelte:head><title>Comment participer | 100 jours de zbeul</title></svelte:head>

<main role="main">
	<div class="mx-auto mt-16 max-w-2xl">
		<p>Vous souhaitez participer à l’action&nbsp;? Voici comment&nbsp;!</p>

		<p>
			Chacune des actions suivantes contribue à la mise en place d’une stratégie de résistance à la
			politique du gouvernement.
		</p>

		<h2>Actions participants au classement</h2>
		<ul>
			<li id="chahut">
				<h3>Chahut</h3>
				<p>Lors d'une visite, organiser casserolades ou huées</p>
			</li>

			<li id="manifestation">
				<h3>Manifestation</h3>
				<p>Tenue d'une manifestation sur le lieu de visite d'une personnalité.</p>
			</li>

			<li id="action-creative">
				<h3>Action créative</h3>
				<p>
					Faire preuve d'originalité dans l'expression des revendications. l'on pourait cité en
					exemple poursuite en forêt, etc…
				</p>
			</li>

			<li id="sobirete-energetique">
				<h3>Mise en sobriété énergétique</h3>
				<p>
					Intervention de camarades afin de limiter la consommation énergétique et préserver
					l'environnement par une transition énergétique accélérée.
				</p>
			</li>

			<li id="fuite">
				<h3>Action conduisant au départ précipité d’une personnalité</h3>
				<p>
					Lors de la visite d'une personnalité, celle-ci décide d'accélérer le pas et de rentrer
					plus tôt que prévu.
				</p>
			</li>

			<li id="annulation">
				<h3>Annulation d’une visite 🎉</h3>
				<p>Lorsqu'une personnalité renonce à une partie ou la totalité de la visite prévue.</p>
			</li>
		</ul>

		<h2>Actions non prises en compte</h2>
		<p>Certaines actions ne sont pas prises en compte dans le classement.</p>
	</div>
</main>

<style lang="postcss">
	h2 {
		@apply mb-6 mt-12;
	}
	h3 {
		@apply mb-8 mt-12 text-2xl;
	}

	p {
		@apply mb-3 text-lg;
	}
	ul {
		@apply mx-auto mb-6 max-w-lg list-none;
	}
	li {
		@apply mb-3;
	}
</style>
