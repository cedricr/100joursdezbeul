import dayjs from 'dayjs';
import { ACTION_SCORE, DEPARTMENTS, REGIONS, TARGET_MULTIPLIER, startDay } from './constants';
import type { ActionEvent, DepartmentResult, HumanizedLink, MetaData } from './types';
import rawData from '$lib/assets/data.json?raw';
import rawMetaData from '$lib/assets/metadata.json?raw';
import regions from "$lib/assets/regions.json?raw";

export const DATA = enrichData(JSON.parse(rawData)) as ActionEvent[];
export const METADATA = JSON.parse(rawMetaData) as MetaData;

export const LEADERBOARD = generateLeaderboard();
export const LEADERBOARD_REGION = generateLeaderboardRegion();

export function getDayNumber(): number {
	const now = dayjs();
	const elapsedDays = now.diff(startDay, 'day') + 1;
	return elapsedDays;
}

export function sum(array: number[]): number {
	return array.reduce((a, b) => a + b);
}

export function enrichData(data: ActionEvent[]) {
	data.forEach((event) => {
		const score = sum(event.actions.map((action) => ACTION_SCORE[action]));
		const multiplier = sum(event.cibles.map((target) => TARGET_MULTIPLIER[target]));
		event.score = score * multiplier;
		event.region = getDepartementByCode(event.departement).codeRegion
	});
	return data;
}

export function generateLeaderboard() {
	const departmentsResults: DepartmentResult = {};
	DATA.forEach((event) => {
		const dept = event.departement;
		departmentsResults[dept] = (departmentsResults[dept] || 0) + event.score;
	});
	return Object.entries(departmentsResults).sort((d1, d2) => {
		return d2[1] - d1[1];
	});
}

export function generateLeaderboardRegion() {
	const regionsResults: DepartmentResult = {};
	DATA.forEach((event) => {
		const region = event.region;
		regionsResults[region] = (regionsResults[region] || 0) + event.score;
	});
	return Object.entries(regionsResults).sort((d1, d2) => {
		return d2[1] - d1[1];
	});
}

function getDepartementByCode(code: string) {
	const dept = DEPARTMENTS.find((elt) => elt.code === code);
	if (!dept) {
		throw new Error(`le département ${code} est inconnu`);
	}
	return dept;
}

export function getDepartmentName(code: string): string {
	return getDepartementByCode(code).nom;
}

export function getRegionName(code: string): string {
	const region = REGIONS.find((elt) => elt.code === code);
	if (!region) {
		throw new Error(`la région ${code} est inconnue`);
	}

	return region.nom
}

export function getDepartmentScore(code: string): number {
	return LEADERBOARD.find((line) => line[0] === code)[1];
}
export function getRegionScore(code: string): number {
	return LEADERBOARD_REGION.find((line) => line[0] === code)[1];
}

export function getPointsDisplay(nPoints: number) {
	return nPoints <= 1 ? `${nPoints}&nbsp;pt` : `${nPoints}&nbsp;pts`;
}

export function humanizeLink(link: string): HumanizedLink {
	const url = new URL(link);
	let linkText = url.hostname
	switch (url.hostname){
		case "twitter.com": {
			const twitterProfile = url.pathname.split('/')[1]
			linkText = `Tweet de @${twitterProfile}`
			break;
		}
		case 'www.youtube.com':
			linkText = 'Vidéo Youtube'
			break;
	}

	return {
		url: link,
		text: linkText
	}
}
