import dayjs from 'dayjs';
import { DEPARTMENTS, startDay } from './constants';
import type { Action, ActionEvent, DayData, DepartmentResult } from './types';

export function getDayNumber(): number {
	const now = dayjs();
	const elapsedDays = now.diff(startDay, 'day') + 1;
	return elapsedDays;
}

export function getScore(action: Action) {
	let score: number;
	switch (action.code) {
		case 'annulation':
			score = 5;
			break;
		case 'fuite':
			score = 4;
			break;
		case 'sobriete':
			score = 3;
			break;
		case 'action-creative':
			score = 2;
			break;
		case 'manif':
			score = 1;
			break;
		case 'chahut':
			score = 1;
			break;

		default:
			throw new Error(`type d'action ${action.code} inconnue`);
	}

	switch (action.target) {
		case 'secretaire-detat':
			break;
		case 'ministre-delegue-e':
			score *= 2;
			break;
		case 'ministre':
			score *= 3;
			break;
		case 'PAN':
			score *= 4;
			break;
		case 'PM':
			score *= 5;
			break;
		case 'PR':
			score *= 6;
			break;
		default:
			throw new Error(`type de cible ${action.target} inconnue`);
	}

	return score;
}

export function generateLeaderboard(jsonData: string) {
	const data = JSON.parse(jsonData) as DayData[];
	const departmentsResults: DepartmentResult = {};
	data.forEach((dayData) => {
		dayData.evenements.forEach((evenement: ActionEvent) => {
			evenement.actions.forEach((action) => {
				const dept = evenement.codeInsee.slice(0, 2);
				departmentsResults[dept] = (departmentsResults[dept] || 0) + getScore(action);
			});
		});
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
