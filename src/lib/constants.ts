// Extrait de l'API découpage administratif
// https://geo.api.gouv.fr/decoupage-administratif

import departements from '$lib/assets/departements.json?raw';

export const startDay = '2023-04-18';

export const DEPARTMENTS = JSON.parse(departements) as {
	nom: string;
	code: string;
	codeRegion: string;
}[];

export const ACTION_SCORE = {
	annulation: 5,
	fuite: 4,
	sobriete: 3,
	creatif: 2,
	manif: 1,
	chahut: 1
};

export const TARGET_MULTIPLIER = {
	'secretaire-etat': 1,
	'ministre-del': 2,
	'ministre': 3,
	'ministre-int': 4,
	'presidente-an': 4,
	'premiere-min': 5,
	'president-rep': 6
};
