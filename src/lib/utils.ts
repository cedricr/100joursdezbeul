import dayjs, { type Dayjs } from 'dayjs';
import AdvancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/fr';

dayjs.extend(AdvancedFormat);
dayjs.locale('fr');

import { DEPARTMENTS, startDay } from './constants';
import type { ActionEvent, HumanizedLink } from './types';

export function sum(array: number[]): number {
	return array.reduce((a, b) => a + b, 0);
}

export function dateToString(date: Date | Dayjs): string {
	return dayjs(date).format('YYYY-MM-DD');
}

export function dateToLabel(date: Date | Dayjs | string): string {
	return dayjs(date).format('dddd Do MMMM');
}

export function dateToShortLabel(date: Date | Dayjs | string): string {
	return dayjs(date).format('Do MMMM');
}

export function getDayNumber(): number {
	const now = dayjs();
	const elapsedDays = now.diff(startDay, 'day') + 1;
	return elapsedDays;
}

export function getLatestDate(events: ActionEvent[]): Date {
	const dates = events.map((event) => new Date(event.date));
	return dates.sort((a, b) => b.getTime() - a.getTime())[0];
}

export function sortEventsByDescendingDate(events: ActionEvent[]) {
	return events.sort((evt1, evt2) => Date.parse(evt2.date) - Date.parse(evt1.date));
}

export function getDepartmentName(code: string): string {
	const dept = DEPARTMENTS.find((elt) => elt.code === code);
	if (!dept) {
		throw new Error(`le département ${code} est inconnu`);
	}
	return `${dept.nom} (${code})`;
}

export function filterEventsForDepartment(
	departmentCode: string,
	events: ActionEvent[]
): ActionEvent[] {
	return events.filter((event) => {
		return event.departement === departmentCode;
	});
}

export function filterEventsForDate(dateStr: string, events: ActionEvent[]): ActionEvent[] {
	return events.filter((event) => {
		return event.date === dateStr;
	});
}

export function filterEventsUntilDate(dateStr: string, events: ActionEvent[]): ActionEvent[] {
	return events.filter((event) => {
		return new Date(event.date) <= new Date(dateStr);
	});
}

export function getScoreForEvents(events: ActionEvent[]): number {
	return sum(events.map((evt) => evt.score));
}

export function getDepartmentScoreForDate(
	departmentCode: string,
	dateStr: string,
	allEvents: ActionEvent[]
): number {
	return getScoreForEvents(
		filterEventsForDepartment(departmentCode, filterEventsForDate(dateStr, allEvents))
	);
}

export function getDepartmentScoreUntilDate(
	departmentCode: string,
	dateStr: string,
	allEvents: ActionEvent[]
): number {
	return getScoreForEvents(
		filterEventsForDepartment(departmentCode, filterEventsUntilDate(dateStr, allEvents))
	);
}

export function getDepartmentScore(departmentCode: string, allEvents: ActionEvent[]): number {
	return getScoreForEvents(filterEventsForDepartment(departmentCode, allEvents));
}

export function getNationalScoreForDate(dateStr: string, allEvents: ActionEvent[]): number {
	return getScoreForEvents(filterEventsForDate(dateStr, allEvents));
}

export function getNationalScoreUntilDate(dateStr: string, allEvents: ActionEvent[]): number {
	return getScoreForEvents(filterEventsUntilDate(dateStr, allEvents));
}

export function getNationalScore(allEvents: ActionEvent[]): number {
	return getScoreForEvents(allEvents);
}

export function getPointsDisplay(nPoints: number) {
	return nPoints <= 1 ? `${nPoints}&nbsp;point` : `${nPoints}&nbsp;points`;
}

export function getNationalStats(allEvents: ActionEvent[]) {
	const stats: { [id: string]: number } = {};
	const sites: string[] = [];
	const cibles: string[][] = [];

	allEvents.forEach((event) => {
		event.actions.forEach((action) => {
			stats[action] = (stats[action] || 0) + 1;
		});
		sites.push(event.departement + event.ville);
		cibles.push(event.cibles.map((x) => x.nom));
		stats['total'] = (stats['total'] || 0) + event.score;
	});

	stats['sites'] = new Set(sites).size;
	stats['cibles'] = new Set(cibles.flat()).size;
	return stats;
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
