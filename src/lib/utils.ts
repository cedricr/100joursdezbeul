import dayjs from 'dayjs';
import { ACTION_SCORE, DEPARTMENTS, TARGET_MULTIPLIER, startDay } from './constants';
import type { ActionEvent, DepartmentResult } from './types';
import rawData from '$lib/assets/data.json?raw';

export const DATA = enrichData(JSON.parse(rawData)) as ActionEvent[];
export const LEADERBOARD = generateLeaderboard();

export function getDayNumber(): number {
	const now = dayjs();
	const elapsedDays = now.diff(startDay, 'day') + 1;
	return elapsedDays;
}

export function enrichData(data: ActionEvent[]) {
	data.forEach((event) => {
		const score = event.actions.map((action) => ACTION_SCORE[action]).reduce((a, b) => a + b);
		const multiplier = event.cibles
			.map((target) => TARGET_MULTIPLIER[target])
			.reduce((a, b) => a + b);
		event.score = score * multiplier;
	});
	return data;
}

export function generateLeaderboard() {
	const departmentsResults: DepartmentResult = {};
	DATA.forEach((event) => {
		const dept = event.codeInsee.slice(0, 2);
		departmentsResults[dept] = (departmentsResults[dept] || 0) + event.score;
	});
	return Object.entries(departmentsResults).sort((d1, d2) => {
		return d2[1] - d1[1];
	});
}

export function getDepartmentName(code: string): string {
	const dept = DEPARTMENTS.find((elt) => elt.code === code);
	if (!dept) {
		throw new Error(`le département ${code} est inconnu`);
	}
	return dept ? dept.nom : '(inconnu)';
}
export function getDepartmentScore(code: string): number {
	return LEADERBOARD.find((line) => line[0] === code)[1];
}
