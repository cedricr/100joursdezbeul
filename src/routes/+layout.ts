import { dev } from '$app/environment';
import { ACTION_SCORE, DEPARTMENTS, TARGET_MULTIPLIER } from '$lib/constants';
import type {
	ActionCode,
	ActionEvent,
	ActionTarget,
	DepartmentResult,
	GristRecord
} from '$lib/types';
import { sum } from '$lib/utils';
import { GristDocAPI } from 'grist-api';

export const prerender = !dev;
export const csr = dev;

const DOC_URL = 'https://100joursdezbeul.getgrist.com/62uY9YoxQE56Ma1uRZQZqo/100-jours-de-zbeul';

function generateLeaderboard(actionEvents: ActionEvent[]) {
	const departmentsResults: DepartmentResult = {};
	actionEvents.forEach((event) => {
		const dept = event.departement;
		departmentsResults[dept] = (departmentsResults[dept] || 0) + event.score;
	});
	return Object.entries(departmentsResults).sort((d1, d2) => {
		return d2[1] - d1[1];
	});
}

function recordIsValid(record: GristRecord) {
	return (
		record.date &&
		record.lieu &&
		DEPARTMENTS.map((dep) => dep.code).includes(record.departement) &&
		record.actions.slice(1).every((action) => Object.keys(ACTION_SCORE).includes(action)) &&
		record.cibles.slice(1).every((cible) => Object.keys(TARGET_MULTIPLIER).includes(cible)) &&
		record.description
	);
}

function parseRecords(data: GristRecord[]): ActionEvent[] {
	const invalidRecords = data.filter((record) => !recordIsValid(record));
	if (invalidRecords.length) {
		console.error('Données invalides, ignorées: ');
		console.table(invalidRecords);
	}
	const result = data
		.filter((record) => recordIsValid(record))
		.map((record) => {
			const actions = record.actions.slice(1) as ActionCode[];
			const cibles = record.cibles.slice(1) as ActionTarget[];
			return {
				ville: record.lieu,
				departement: record.departement,
				date: new Date(record.date * 1000).toString(),
				description: record.description,
				liens: [record.lien1, record.lien2, record.lien3].filter((lien) => !!lien),
				actions,
				cibles,
				score:
					sum(actions.map((action) => ACTION_SCORE[action])) *
					sum(cibles.map((target) => TARGET_MULTIPLIER[target]))
			};
		});
	return result;
}

export const load = async () => {
	const api = new GristDocAPI(DOC_URL);
	const records = (await api.fetchTable('Zbeul')) as GristRecord[];
	const actionEvents = parseRecords(records);
	return {
		actionEvents,
		leaderboard: generateLeaderboard(actionEvents)
	};
};
