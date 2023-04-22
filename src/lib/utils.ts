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
		case 'non-accueil':
			score = 10;
			break;
		case 'action-creative':
			score = 7;
			break;
		case 'casserolade':
			score = 5;
			break;
		case 'chahut':
			score = 5;
			break;
		case 'sobriete':
			score = 7;
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
			score *= 5;
			break;
		case 'PM':
			score *= 6;
			break;
		case 'PR':
			score *= 7;
			break;
		default:
			throw new Error(`type de cible ${action.target} inconnue`);
	}

	return score;
}

export function generateLeaderboard(jsonData: string) {
	const data = JSON.parse(jsonData) as DayData[];

	console.log(data);
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
	console.log(code);
	const dept = DEPARTMENTS.find((elt) => elt.code === code);
	if (!dept) {
		throw new Error(`le département ${code} est inconnu`);
	}
	return dept ? dept.nom : '(inconnu)';
}
