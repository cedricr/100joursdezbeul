import { dev } from '$app/environment';
import { ACTION_SCORE, DEPARTMENTS, TARGET_MULTIPLIER } from '$lib/constants';
import type {
	ActionCode,
	ActionEvent,
	ActionTarget,
	DepartmentResult,
	GristAction,
	GristMinistry,
	GristRole,
	GristTarget
} from '$lib/types';
import { dateToString, sum } from '$lib/utils';
import { GristDocAPI } from 'grist-api';

export const prerender = !dev;
export const csr = dev;

// const DOC_URL = 'https://100joursdezbeul.getgrist.com/62uY9YoxQE56Ma1uRZQZqo/100-jours-de-zbeul';
const DOC_URL = 'https://100joursdezbeul.getgrist.com/3UFxMh17Rwp6/100-jours-de-zbeul-emergency';

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

function recordIsValid(record: GristAction) {
	return (
		record.date &&
		record.lieu &&
		DEPARTMENTS.map((dep) => dep.code).includes(record.departement) &&
		record.description
	);
}

function parseActions(
	actions: GristAction[],
	targets: GristTarget[],
	roles: GristRole[],
	ministries: GristMinistry[]
): ActionEvent[] {
	const invalidRecords = actions.filter((record) => !recordIsValid(record));
	if (invalidRecords.length) {
		console.error('Données invalides, ignorées: ');
		console.table(invalidRecords);
	}

	const rolesDict: {
		[id: number]: { code: ActionTarget; intitule: string };
	} = {};
	roles.forEach((role) => {
		rolesDict[role.id] = {
			code: role.code,
			intitule: role.intitule
		};
	});
	// console.log(rolesDict);

	const ministriesDict: {
		[id: number]: { nom: string };
	} = {};
	ministries.forEach((ministry) => {
		ministriesDict[ministry.id] = {
			nom: ministry.nom
		};
	});
	// console.log(ministriesDict);

	const targetsDict: {
		[id: number]: {
			nom: string;
			titre: string;
			role: { code: ActionTarget; intitule: string };
			ministeres: { nom: string }[];
		};
	} = {};
	// console.log(targets);

	targets.forEach((target) => {
		const ministereIds = target.ministeres?.slice(1) as number[];
		targetsDict[target.id] = {
			nom: target.nom,
			titre: target.titre,
			role: rolesDict[target.role],
			ministeres: ministereIds?.map((id: number) => ministriesDict[id]) || []
		};
	});
	// console.log(targetsDict);

	const result = actions
		.filter((record) => recordIsValid(record))
		.map((record) => {
			const acts = record.actions.slice(1) as ActionCode[];
			const cibleIds = record.cibles.slice(1) as number[];
			const cibles = cibleIds.map((id: number) => targetsDict[id]);
			return {
				ville: record.lieu,
				departement: record.departement,
				date: dateToString(new Date(record.date * 1000)),
				description: record.description,
				liens: [record.lien1, record.lien2, record.lien3].filter((lien) => !!lien),
				actions: acts,
				cibles,
				score:
					sum(acts.map((action) => ACTION_SCORE[action])) *
					sum(cibles.map((target) => TARGET_MULTIPLIER[target.role.code]))
			};
		});
	// console.dir(result, { depth: null });
	return result;
}

export const load = async () => {
	console.log('Chargement des données Grist');
	const api = new GristDocAPI(DOC_URL);
	const actions = (await api.fetchTable('Actions')) as GristAction[];
	// console.log(actions);
	const targets = (await api.fetchTable('Cibles')) as GristTarget[];
	// console.log(targets);
	const roles = (await api.fetchTable('Roles')) as GristRole[];
	// console.log(roles);
	const ministries = (await api.fetchTable('Ministeres')) as GristMinistry[];
	// console.log(ministries);
	const actionEvents = parseActions(actions, targets, roles, ministries);
	return {
		actionEvents,
		leaderboard: generateLeaderboard(actionEvents)
	};
};
