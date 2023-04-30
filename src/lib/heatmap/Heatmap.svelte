<script lang="ts">
	import { LEADERBOARD, getDepartmentName } from '$lib/utils';
	import { onMount } from 'svelte';
	import { france } from './france';

	let canvasElement: HTMLCanvasElement;

	onMount(async () => {
		/*
			Note to maintainers:
		  	TLDR : chart must be visible both in real site and in netlify preview
			Initialy chartjs and chartgeo plugin were imported from node_modules in svelte:head tags,
			but it did not work in netlify (imports failed, and imported code was inlined in html).
			Then, I had to import as below using await and from cdn ... but chartgeo is not in cdn.
			So I copied chartgeo localy (index.umd.js), but it failed again in netlify, now with "require" being unknown.
			So I modified, index.umd.js and removed all references to module loading.
			There might be a better way, but I did not find it.
		*/

		await import('https://cdn.jsdelivr.net/npm/d3@v6');
		await import('https://cdn.jsdelivr.net/npm/d3-composite-projections');
		await import('https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.3.0/chart.umd.js');
		await import('./index.umd.js'); // Chart geo plugin
		draw();
	});

	function draw() {
		const index = Object.fromEntries(
			LEADERBOARD.map(([dpt, score]) => [getDepartmentName(dpt), score])
		);
		const maxValue = LEADERBOARD.reduce((max, [, score]) => Math.max(max, score), 0);

		const projection = window.d3.geoConicConformalFrance();
		projection.fitWidth = (size: number, object: any) => projection.fitSize([size, 1000], object);
		console.log(window.ChartGeo);
		const departments = ChartGeo.topojson.feature(france, france.objects.fra).features;

		const chart = new Chart(canvasElement, {
			type: 'choropleth',
			data: {
				labels: france.objects.fra.geometries.map((d, i) => d.properties.name || i),
				datasets: [
					{
						label: 'Regions',
						outline: departments,
						data: departments.map((department: any) => {
							const name = department.properties.name;
							/* if (!index[name]) {
								console.warn('Département inconnu', name);
							} */
							return { feature: department, value: index[name] ?? 0 };
						})
					}
				]
			},
			options: {
				plugins: {
					legend: {
						display: false
					}
				},
				showOutline: true,
				//outlineBorderColor: '#ff00ff',

				responsive: true,
				scales: {
					projection: {
						axis: 'x',
						projection: projection,
						projectionOffset: [0, -100]
					},
					color: {
						axis: 'x',
						quantize: 0,
						interpolate: 'oranges',
						legend: {
							position: 'bottom',
							align: 'bottom'
						},
						min: 0,
						max: maxValue
					}
				}
			}
		});
	}
</script>

<canvas bind:this={canvasElement} width="100%" height="100%" />
