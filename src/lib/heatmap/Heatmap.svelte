<script lang="ts">
	import { LEADERBOARD, getDepartmentName } from '$lib/utils';

	import { franceTopology } from './france';

	import { topojson } from './chart-geo.js';
	import { geoConicConformalFrance } from 'd3-composite-projections';

	import { renderChart } from './render.js';

	/**
	 * On génère la carte de France choropleth du Zbeul
	 * Ensuite on construit le svg qui permet d'avoir les liens de détails et les tooltips
	 */

	// Indexe le zbeul par département : {nomDuDepartement:{code,score}}
	const zbeulIndex = Object.fromEntries(
		LEADERBOARD.map(([code, score]) => [getDepartmentName(code), { score, code }])
	);
	const maxZbeul = LEADERBOARD.reduce((max, [, score]) => Math.max(max, score), 0);

	// Génération des choropleths
	const departments = topojson.feature(franceTopology, franceTopology.objects.fra).features;

	const franceDataset = {
		label: 'Départements',
		outline: departments,
		data: departments.map(toData)
	};

	const projection = geoConicConformalFrance();
	projection.fitWidth = (size: number, object: any) => projection.fitSize([size, 1000], object);

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
	// On veut afficher l'Ile de France à la manière des DOMs pour des raisons de lisibilité
	// Impossible de trouver des données topojson avec l'ile de France séparée
	// Donc on extrait les départements d'ile de France et on construit un nouveau topojson ...
	// ... qu'on affichera dans un autre chart (qu'on ne peut pas afficher dans le même à cause de la projection)
	const idfTopology: any = {
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
	const FRANCE_SIZE = 512;
	const IDF_SIZE = FRANCE_SIZE / 4;
	const franceChart = renderChart(confFrance, FRANCE_SIZE, FRANCE_SIZE);
	const idfChart = renderChart(confIdf, IDF_SIZE, IDF_SIZE);

	// IDF en dessous de la Réunion
	const reference = franceChart._metasets[0].data.filter(({ feature }) => feature.id === 'RE.')[0];
	const { y2, height } = reference.getBounds();

	const x0 = FRANCE_SIZE - IDF_SIZE;
	const y0 = Math.round(y2 + height); // en dessous + hauteur de la Réunion

	const idfTransform = `translate(${x0} ${y0})`;
	const infographics = [
		...franceChart._metasets[0].data.map((geof: any) => {
			geof.projectionScale.geoPath.digits(0); // réduit la taille du svg
			const svgPath = geof.projectionScale.geoPath.context(null)(geof.feature);
			const dptName = geof.feature.properties.name;
			const { backgroundColor: fill, borderColor: stroke, borderWidth: strokeWidth } = geof.options;
			const { code, score } = zbeulIndex[dptName] ?? { code: -1, score: 0 };
			return {
				coords: svgPath,
				code,
				title: `${geof.feature.properties.name} ${score}`,
				stroke,
				fill,
				strokeWidth
			};
		}),
		...idfChart._metasets[0].data.map((geof: any) => {
			geof.projectionScale.geoPath.digits(0); // réduit la taille du svg
			const svgPath = geof.projectionScale.geoPath.context(null)(geof.feature);
			const dptName = geof.feature.properties.name;
			const { backgroundColor: fill, borderColor: stroke, borderWidth: strokeWidth } = geof.options;
			const { code, score } = zbeulIndex[dptName] ?? { code: -1, score: 0 };
			return {
				coords: svgPath,
				code,
				title: `${geof.feature.properties.name} ${score}`,
				tr: idfTransform,
				stroke,
				fill,
				strokeWidth
			};
		})
	];

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
	<svg viewBox="0 0 {FRANCE_SIZE} {FRANCE_SIZE}" xmlns="http://www.w3.org/2000/svg">
		{#each infographics as { coords, title, code, tr, stroke, fill }}
			{#if code > 0}
				<a href="/departement/{code}" {title} target="_parent">
					<path d={coords} {stroke} {fill} stroke-width="1" transform={tr}>
						<title>{title}</title>
					</path>
				</a>
			{:else}
				<path d={coords} {stroke} {fill} stroke-width="1" transform={tr}>
					<title>{title}</title>
				</path>
			{/if}
		{/each}
	</svg>
</div>
