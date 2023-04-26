import { badgen } from 'badgen';
import { LEADERBOARD, getDepartmentName, getDepartmentScore } from '$lib/utils';

const dept_emoji = new Map([
	['38', '⛰️'],
	['75', '⛵'],
	['2A', '💣'],
	['2B', '💣']
]);

const leader_code = LEADERBOARD[0][0];

const medals = new Map([
	[LEADERBOARD[0][0], "🥇"],
	[LEADERBOARD[1][0], "🥈"],
	[LEADERBOARD[2][0], "🥉"],
])


function color(dept_code) {
	if (leader_code === dept_code) {
		return 'red';
	} else if (medals.has(dept_code)){
        return 'orange';
	} else if (getDepartmentScore(dept_code) > 0) {
		return 'green';
	}
	return 'gray';
}

function dept_string(dept_code) {
	const emoji = dept_emoji.get(dept_code) || '📣';
	return `${emoji}${getDepartmentName(dept_code)}`;
}

function score_string(dept_code) {
	const score = getDepartmentScore(dept_code);
    const medal = medals.get(dept_code) || ''
	return `${score} points ${medal}`
}

/** @type {import('./$types').RequestHandler} */
export async function GET({ request }) {
	/* on pourrait mieux faire que de parser le chemin à la main j'imagine ? */
	const dept_code = new URL(request.url).pathname.split('/')[2];

	const svgString = badgen({
		label: `zbeul | ${dept_string(dept_code)}`,
		status: score_string(dept_code),
		color: color(dept_code)
	});

	return new Response(svgString, {
		headers: {
			'Content-Type': 'image/svg+xml'
		}
	});
}
