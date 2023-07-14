<script lang="ts">
	import logoSI from '$lib/assets/logo-si.png';
	import logoSolidaires from '$lib/assets/logo-solidaires.png';
	import logoAttac from '$lib/assets/logo-attac.png';
</script>

<footer class="mx-2 my-8 flex flex-col gap-4 sm:mx-4" role="contentinfo">
	<hr class="mb-4" />

	<ul class="text-center">
		<li class="inline">
			<a href="/presse">Revue de presse</a><span aria-hidden="true">&nbsp;·</span>
		</li>
		<li class="inline">
			<a href="/plan-site">Plan du site</a><span aria-hidden="true">&nbsp;·</span>
		</li>

		<li class="inline">
			<a href="/mentions-legales">Mentions légales &amp; crédits</a><span aria-hidden="true"
				>&nbsp;·</span
			>
		</li>

		<li class="inline">
			<a href="https://syndicat.solidaires.org/@100joursdezbeul" rel="me" class="inline-block">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 40 40"
					class="mastodon w-4"
					role="img"
					aria-labelledby="100-jours-mastodon-title"
				>
					<title id="100-jours-mastodon-title">Le compte Mastodon de 100 jours de zbeul</title><path
						d="M39.5509 13.4038C39.5509 4.94663 33.6041 2.46931 33.6041 2.46931C30.6067 1.18679 25.4589 0.646888 20.1104 0.605957H19.9786C14.63 0.646888 9.48647 1.18679 6.48693 2.46931C6.48693 2.46931 0.54013 4.94858 0.54013 13.4038C0.54013 15.3393 0.500387 17.6549 0.565231 20.1107C0.780679 28.3808 2.1926 36.532 10.3985 38.5552C14.1824 39.4888 17.4309 39.6837 20.0455 39.5493C24.7896 39.3037 27.4524 37.9724 27.4524 37.9724L27.2955 34.7642C27.2955 34.7642 23.9048 35.7602 20.0978 35.6393C16.3243 35.5185 12.3438 35.2612 11.733 30.9439C11.6753 30.5427 11.6474 30.1383 11.6493 29.7335C11.6493 29.7335 15.3517 30.5775 20.0455 30.7782C22.9154 30.901 25.6054 30.6223 28.3393 30.3183C33.5811 29.7355 38.1453 26.726 38.7184 23.9758C39.6262 19.643 39.5509 13.4038 39.5509 13.4038ZM32.5374 24.2994H28.1845V14.3609C28.1845 12.2656 27.239 11.2033 25.346 11.2033C23.2543 11.2033 22.2063 12.4644 22.2063 14.9592V20.3992H17.8785V14.9592C17.8785 12.4644 16.8305 11.2033 14.7367 11.2033C12.8437 11.2033 11.8982 12.2675 11.8982 14.3609V24.2994H7.54534V14.0607C7.54534 11.9673 8.11638 10.3047 9.26684 9.07486C10.4508 7.84497 12.0007 7.21345 13.9272 7.21345C16.1549 7.21345 17.8429 8.01064 18.9578 9.60697L20.0414 11.3007L21.127 9.60697C22.2419 8.01064 23.9299 7.21345 26.1576 7.21345C28.082 7.21345 29.634 7.84497 30.818 9.07486C31.9663 10.3047 32.5374 11.9673 32.5374 14.0607V24.2994Z"
					/>
				</svg>
			</a>
		</li>
	</ul>

	<ul class="text-center">
		<li class="inline">
			<a href="https://github.com/cedricr/100joursdezbeul">Code source</a><span aria-hidden="true">
				&nbsp;·</span
			>
		</li>
		<li class="inline">
			<a href="https://100joursdezbeul.getgrist.com/62uY9YoxQE56/100-jours-de-zbeul"
				>Données brutes</a
			>
		</li>
	</ul>

	<ul class="items-top mt-4 flex flex-row justify-center gap-9">
		<li>
			<a href="https://solidairesinformatique.org">
				<img alt="Solidaires Informatique" src={logoSI} width="200" height="72" />
			</a>
		</li>
		<li>
			<a href="https://solidaires.org">
				<img alt="Union syndicale Solidaires" src={logoSolidaires} width="200" height="70" />
			</a>
		</li>
		<li class="relative bottom-2">
			<a href="https://france.attac.org">
				<img alt="Attac" src={logoAttac} width="60" height="70" />
			</a>
		</li>
	</ul>
</footer>

<style lang="postcss">
	a:hover .mastodon,
	a:focus .mastodon {
		fill: #6364ff;
	}

	a:hover .twitter,
	a:focus .twitter {
		fill: #1da1f2;
	}
</style>
