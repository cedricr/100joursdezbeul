// Extrait de l'API découpage administratif
// https://geo.api.gouv.fr/decoupage-administratif

import departements from '$lib/assets/departements.json?raw';

export const startDay = '2023-04-18';

export const DEPARTMENTS = JSON.parse(departements) as {
	nom: string;
	code: string;
	codeRegion: string;
}[];

// prettier-ignore
export const ACTION_SCORE = {
	'annulation': 5,
	'fuite': 4,
	'sobriete': 3,
	'creatif': 2,
	'manif': 1,
	'chahut': 1
};

// prettier-ignore
export const ACTION_LABEL = {
	'annulation': 'Annulation d’une visite 🎉',
	'fuite': 'Action conduisant au départ précipité d’une personnalité',
	'sobriete': 'Mise en sobriété énergétique',
	'creatif': 'Action créative',
	'manif': 'Manifestation',
	'chahut': 'Chahut'
};

// prettier-ignore
export const TARGET_MULTIPLIER = {
	'secretaire-etat': 1,
	'ministre-del': 2,
	'ministre': 3,
	'ministre-int': 4,
	'presidente-an': 4,
	'premiere-min': 5,
	'president-rep': 6
};

// prettier-ignore
export const TARGET_LABEL = {
	'secretaire-etat': 'Secrétaire d’État',
	'ministre-del': 'Ministre délégué·e',
	'ministre': 'Ministre',
	'ministre-int': 'Ministre de l’intérieur',
	'presidente-an': 'Présidente de l’Assemblée Nationale',
	'premiere-min': 'Première ministre',
	'president-rep': 'Président de la République'
};
