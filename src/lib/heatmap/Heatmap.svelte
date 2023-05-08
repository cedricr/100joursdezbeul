<script lang="ts">
	import { LEADERBOARD, getDepartmentName } from '$lib/utils';

	import { franceTopology } from './france';

	import { topojson } from './chart-geo.js';
	import { geoConicConformalFrance } from 'd3-composite-projections';

	import { saveToFile, renderChart } from './render.js';

	import carte from '$lib/assets/france.png';

	const IMAGE_SIZE = 512;

	/**
	 * On génère la carte de France choropleth du Zbeul
	 * que l'on sauvegarde dans $lib/assets/france.png
	 * Que l'on référence dans une <img>
	 */

	// Indexe le zbeul par département : {nomDuDepartement:{code,score}}
	const zbeulIndex = Object.fromEntries(
		LEADERBOARD.map(([code, score]) => [getDepartmentName(code), { score, code }])
	);
	const maxZbeul = LEADERBOARD.reduce((max, [, score]) => Math.max(max, score), 0);

	// Génération des choropleth
	const departments = topojson.feature(franceTopology, franceTopology.objects.fra).features;

	const franceDataset = {
		label: 'Départements',
		outline: departments,
		data: departments.map(toData)
	};

	const projection = geoConicConformalFrance();
	projection.fitWidth = (size, object) => projection.fitSize([size, 1000], object);

	const confFrance = {
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
					display: false,
					legend: {
						display: false
					},
					min: 0,
					max: maxZbeul
				}
			}
		}
	};

	///
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

	const idf = topojson.feature(idfTopology, idfTopology.objects.fra).features;

	const idfDataset = {
		label: 'IDF',
		outline: idf,
		data: idf.map(toData)
	};

	const confIdf = {
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
					max: maxZbeul
				}
			}
		}
	};

	// Rendu
	const franceChart = renderChart(confFrance, IMAGE_SIZE, IMAGE_SIZE);
	const idfChart = renderChart(confIdf, IMAGE_SIZE / 2, IMAGE_SIZE / 2);

	// IDF en dessous de la Réunion
	const reference = franceChart._metasets[0].data.filter(({ feature }) => feature.id === 'RE.')[0];
	const { y2, height } = reference.getBounds();

	const idfSize = IMAGE_SIZE / 4;
	const x0 = IMAGE_SIZE - idfSize;
	const y0 = Math.round(y2 + height); // en dessous + hauteur de la Réunion

	franceChart.canvas.getContext('2d').drawImage(idfChart.canvas, x0, y0, idfSize, idfSize);

	const infographics = [
		...franceChart._metasets[0].data.map((geof: any) => {
			const svgPath = geof.projectionScale.geoPath.context(null)(geof.feature);
			const dptName = geof.feature.properties.name;
			const { code, score } = zbeulIndex[dptName] ?? { code: -1, score: 0 };
			return {
				coords: svgPath,
				code,
				title: `${geof.feature.properties.name} ${score}`
			};
		}),
		...idfChart._metasets[0].data.map((geof: any) => {
			const svgPath = geof.projectionScale.geoPath.context(null)(geof.feature);
			const dptName = geof.feature.properties.name;
			const { code, score } = zbeulIndex[dptName] ?? { code: -1, score: 0 };
			return {
				coords: svgPath,
				code,
				title: `${geof.feature.properties.name} ${score}`,
				tr: `translate(${x0} ${y0}) scale(0.5 0.5)`
			};
		})
	];

	saveToFile(franceChart.canvas, 'src/lib/assets/france.png');

	function toData(department: any) {
		const name = department.properties.name;
		const zbeul = zbeulIndex[name];
		return {
			feature: department,
			value: zbeul ? zbeul.score : 0,
			code: zbeul ? zbeul.code : -1
		};
	}
</script>

<div style="width:100%;height:100%;position:relative;">
	<img src={carte} alt="100 jours de zbeul - En France" />
	<div style="width:100%;height:100%;top:0px;bottom:0px;position: absolute;">
		<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
			{#each infographics as { coords, title, code, tr }}
				{#if code > 0}
					<a href="/departement/{code}" {title} target="_parent">
						<path d={coords} stroke="none" fill="transparent" transform={tr}>
							<title>{title}</title>
						</path>
					</a>
				{:else}
					<path d={coords} stroke="none" fill="transparent" transform={tr}>
						<title>{title}</title>
					</path>
				{/if}
			{/each}
		</svg>
	</div>
</div>
