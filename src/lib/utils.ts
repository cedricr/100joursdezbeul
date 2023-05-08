import dayjs from 'dayjs';
import { DEPARTMENTS, startDay } from './constants';
import type { ActionEvent, HumanizedLink } from './types';

export function sum(array: number[]): number {
	return array.reduce((a, b) => a + b, 0);
}

export function dateToString(date: Date): string {
	return dayjs(date).format('YYYY-MM-DD');
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

export function filterEventsForDate(date: Date, events: ActionEvent[]): ActionEvent[] {
	return events.filter((event) => {
		return new Date(event.date).toDateString() === date.toDateString();
	});
}

export function filterEventsUntilDate(date: Date, events: ActionEvent[]): ActionEvent[] {
	return events.filter((event) => {
		return new Date(event.date) <= date;
	});
}

export function getScoreForEvents(events: ActionEvent[]): number {
	return sum(events.map((evt) => evt.score));
}

export function getDepartmentScoreForDate(
	departmentCode: string,
	date: Date,
	allEvents: ActionEvent[]
): number {
	return getScoreForEvents(
		filterEventsForDepartment(departmentCode, filterEventsForDate(date, allEvents))
	);
}

export function getDepartmentScoreUntilDate(
	departmentCode: string,
	date: Date,
	allEvents: ActionEvent[]
): number {
	return getScoreForEvents(
		filterEventsForDepartment(departmentCode, filterEventsUntilDate(date, allEvents))
	);
}

export function getDepartmentScore(departmentCode: string, allEvents: ActionEvent[]): number {
	return getScoreForEvents(filterEventsForDepartment(departmentCode, allEvents));
}

export function getNationalScoreForDate(date: Date, allEvents: ActionEvent[]): number {
	return getScoreForEvents(filterEventsForDate(date, allEvents));
}

export function getNationalScoreUntilDate(date: Date, allEvents: ActionEvent[]): number {
	return getScoreForEvents(filterEventsUntilDate(date, allEvents));
}

export function getNationalScore(allEvents: ActionEvent[]): number {
	return getScoreForEvents(allEvents);
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
