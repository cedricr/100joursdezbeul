import { Chart } from 'chart.js';
import { ChoroplethController, GeoFeature, ColorScale, ProjectionScale } from './chart-geo.js';
import { createCanvas } from 'canvas';
import fs from 'fs';

// Fonctions pour générer des charts côté serveur. La magie est dans le module canvas.

Chart.register(ChoroplethController, GeoFeature, ColorScale, ProjectionScale);

export function renderChart(configuration, width = 400, height = 400) {
	const canvas = createCanvas(width, height);
	return new Chart(canvas, configuration);
}

export async function saveToFile(canvas, fileName) {
	return renderToBuffer(canvas).then((image) =>
		fs.promises
			.writeFile(fileName, image, 'base64')
			.then(() => console.log('chart saved in', fileName))
	);
}

function renderToBuffer(canvas, mimeType = 'image/png') {
	return new Promise((resolve, reject) => {
		if (!canvas) {
			throw new Error('Canvas is null');
		}
		canvas.toBuffer((error, buffer) => {
			if (error) {
				return reject(error);
			}
			return resolve(buffer);
		}, mimeType);
	});
}
