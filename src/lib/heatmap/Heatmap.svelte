<script lang="ts">
	import { LEADERBOARD, getDepartmentName } from '$lib/utils';
	import { onMount } from 'svelte';
	import { franceTopology } from './france';

	let canvasFrance: HTMLCanvasElement;
	let canvasIDF: HTMLCanvasElement;
	let isClickable = false;
	let pointEvent = true;

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
		// Indexe le zbeul par département : {nomDuDepartement:{code,score}}
		const zbeulIndex = Object.fromEntries(
			LEADERBOARD.map(([code, score]) => [getDepartmentName(code), { score, code }])
		);
		const maxValue = LEADERBOARD.reduce((max, [, score]) => Math.max(max, score), 0);

		// Construction des données pour le chart
		const departments = ChartGeo.topojson.feature(
			franceTopology,
			franceTopology.objects.fra
		).features;
		// On veut afficher l'Ile de France à la manière des DOMs pour des raisons de visibilité
		// Impossible de trouver des données topojson avec l'ile de France séparée
		// Donc on extrait les départements d'ile de France et on construit un nouveau topojson ...
		// ... qu'on affichera dans un autre chart (qu'on ne peut pas afficher dans le même à cause de la projection)
		const idfTopology = {
			...franceTopology,
			objects: {
				fra: {
					...franceTopology.objects.fra,
					geometries: franceTopology.objects.fra.geometries.filter((geo) =>
						[
							'Yvelines',
							'Paris',
							'Hauts-de-Seine',
							"Val-d'Oise",
							'Val-de-Marne',
							'Seine-Saint-Denis',
							'Seine-et-Marne',
							'Essonne'
						].includes(geo.properties.name)
					)
				}
			}
		};

		const idf = ChartGeo.topojson.feature(idfTopology, idfTopology.objects.fra).features;

		// Construction des datasets
		const franceDataset = {
			label: 'Départements',
			outline: departments,
			data: departments.map(toData)
		};

		const idfDataset = {
			label: 'IDF',
			outline: idf,
			data: idf.map(toData)
		};

		// La projection
		const projection = window.d3.geoConicConformalFrance();
		projection.fitWidth = (size: number, object: any) => projection.fitSize([size, 1000], object);

		// Construction des charts
		new Chart(canvasFrance, {
			type: 'choropleth',
			data: {
				labels: franceTopology.objects.fra.geometries.map((d, i) => d.properties.name || i),
				datasets: [franceDataset]
			},
			options: {
				plugins: {
					legend: {
						display: false
					}
				},
				showOutline: true,

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
				},

				onClick: onClick(franceDataset),
				onHover: onHover(franceDataset)
			}
		});

		new Chart(canvasIDF, {
			type: 'choropleth',
			data: {
				labels: idfTopology.objects.fra.geometries.map((d, i) => d.properties.name || i),
				datasets: [idfDataset]
			},
			options: {
				plugins: {
					legend: {
						display: false
					}
				},
				showOutline: true,

				responsive: true,
				scales: {
					projection: {
						axis: 'x',
						projection: 'equalEarth'
					},
					color: {
						axis: 'x',
						quantize: 0,
						interpolate: 'oranges',
						display: false,
						legend: {
							display: false
						},
						min: 0,
						max: maxValue
					}
				},
				onClick: onClick(idfDataset),
				onHover: onHover(idfDataset)
			}
		});

		function onClick(dataset: any) {
			return (e: Event, clickedDepartments: any) => {
				const code = getCLickableDepartment(dataset, clickedDepartments);
				if (code > 0) {
					window.open(encodeURI(`departement/${code}`), '_self');
				}
			};
		}
		function onHover(dataset: any) {
			return (e: any, clickedDepartments: any) => {
				if (dataset === idfDataset && clickedDepartments.length === 0) {
					// Propage l'événement à l'autre Canvas qui peut être recourvert
					canvasFrance.dispatchEvent(e.native);
				}
				const code = getCLickableDepartment(dataset, clickedDepartments);
				isClickable = code > 0;
			};
		}

		function getCLickableDepartment(dataset: any, clickedDepartments: any) {
			if (clickedDepartments.length === 0) {
				return -1;
			}
			const { index } = clickedDepartments[0];
			const code = dataset.data[index].code;
			return code > 0 ? code : -1;
		}

		function toData(department: any) {
			const name = department.properties.name;
			const zbeul = zbeulIndex[name];
			return {
				feature: department,
				value: zbeul ? zbeul.score : 0,
				code: zbeul ? zbeul.code : -1
			};
		}
	}
</script>

<div style="width:100%;height:100%;position:relative;">
	<canvas
		style="cursor:{isClickable ? 'pointer' : ''}"
		width="100%"
		height="100%"
		bind:this={canvasFrance}
	/>
	<canvas
		style="cursor:{isClickable ? 'pointer' : ''};position: absolute;top: 40%;left: 40%;"
		bind:this={canvasIDF}
		height="50px"
	/>
</div>
