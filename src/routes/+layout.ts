import { dev } from '$app/environment';
import { ACTION_SCORE, DEPARTMENTS, TARGET_MULTIPLIER } from '$lib/constants';
import type {
	ActionCode,
	ActionEvent,
	ActionTarget,
	GristAction,
	GristMinistry,
	GristRole,
	GristTarget
} from '$lib/types';
import { dateToString, sum } from '$lib/utils';

import ACTIONS from '../../data/actions.json?raw';
import TARGETS from '../../data/cibles.json?raw';
import ROLES from '../../data/roles.json?raw';
import MINISTRIES from '../../data/ministeres.json?raw';

export const prerender = !dev;
export const csr = dev;

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
	const actions = JSON.parse(ACTIONS) as GristAction[];
	// console.log(actions);
	const targets = JSON.parse(TARGETS) as GristTarget[];
	// // console.log(targets);
	const roles = JSON.parse(ROLES) as GristRole[];
	// // console.log(roles);
	const ministries = JSON.parse(MINISTRIES) as GristMinistry[];
	// // console.log(ministries);
	const actionEvents = parseActions(actions, targets, roles, ministries);
	return {
		actionEvents
	};
};
