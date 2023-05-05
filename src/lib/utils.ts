import dayjs from 'dayjs';
import { DEPARTMENTS, startDay } from './constants';
import type { ActionEvent, HumanizedLink } from './types';

export function sum(array: number[]): number {
	return array.reduce((a, b) => a + b);
}

export function getDayNumber(): number {
	const now = dayjs();
	const elapsedDays = now.diff(startDay, 'day') + 1;
	return elapsedDays;
}

export function getLatestDate(events: ActionEvent[]): Date | undefined {
	const dates = events.map((event) => new Date(event.date));
	return dates.sort((a, b) => b - a)[0];
}

export function getDepartmentName(code: string): string {
	const dept = DEPARTMENTS.find((elt) => elt.code === code);
	if (!dept) {
		throw new Error(`le département ${code} est inconnu`);
	}
	return dept ? dept.nom : '(inconnu)';
}

export function getDepartmentScore(code: string, leaderboard): number {
	return leaderboard.find((line) => line[0] === code)[1];
}

export function getPointsDisplay(nPoints: number) {
	return nPoints <= 1 ? `${nPoints}&nbsp;pt` : `${nPoints}&nbsp;pts`;
}

export function humanizeLink(link: string): HumanizedLink {
	let linkText = link;
	try {
		const url = new URL(link);
		linkText = url.hostname;
		switch (url.hostname) {
			case 'twitter.com': {
				const twitterProfile = url.pathname.split('/')[1];
				linkText = `Tweet de @${twitterProfile}`;
				break;
			}
			case 'www.youtube.com':
				linkText = 'Vidéo Youtube';
				break;
		}
	} catch (err) {
		console.error(err, link);
	}

	return {
		url: link,
		text: linkText
	};
}
