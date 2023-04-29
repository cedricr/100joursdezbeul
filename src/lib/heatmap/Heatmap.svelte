<script lang="ts">
	import { LEADERBOARD, getDepartmentName } from '$lib/utils';
	import { onMount } from 'svelte';
	import { france } from './france';

	let canvasElement: HTMLCanvasElement;

	onMount(draw);

	function draw() {
		const index = Object.fromEntries(
			LEADERBOARD.map(([dpt, score]) => [getDepartmentName(dpt), score])
		);
		const maxValue = LEADERBOARD.reduce((max, [, score]) => Math.max(max, score), 0);

		const projection = window.d3.geoConicConformalFrance();
		projection.fitWidth = (size: number, object: any) => projection.fitSize([size, 1000], object);

		const departments = window.ChartGeo.topojson.feature(france, france.objects.fra).features;

		const chart = new window.Chart(canvasElement, {
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

<svelte:head>
	<script src="https://cdn.jsdelivr.net/npm/d3@v6"></script>
	<script src="https://cdn.jsdelivr.net/npm/d3-composite-projections"></script>
	<script src="../../../node_modules/chart.js/dist/chart.umd.js"></script>
	<script src="../../../node_modules/chartjs-chart-geo/build/index.umd.js"></script>
</svelte:head>

<canvas bind:this={canvasElement} width="100%" height="100%" />
