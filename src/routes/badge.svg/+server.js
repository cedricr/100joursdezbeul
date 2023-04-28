import pkg from 'badgen';
const { badgen } = pkg;

import { LEADERBOARD } from '$lib/utils';

export const prerender = true;

const total_points = LEADERBOARD.reduce((acc, elem) => acc + elem[1], 0);

/** @type {import('./$types').RequestHandler} */
export async function GET({ request }) {
	const svgString = badgen({
		label: 'zbeul 📣',
		status: `${total_points} points`,
		color: 'green'
	});

	return new Response(svgString, {
		headers: {
			'Content-Type': 'image/svg+xml'
		}
	});
}
