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
	'chahut': 1,
	'creatif': 2,
	'sobriete': 3,
	'securite': 3,
	'fuite': 4,
	'annulation': 5,
} as const;

// prettier-ignore
export const ACTION_LABEL = {
	'annulation': 'Annulation d’une visite 🎉',
	'fuite': 'Action conduisant au départ précipité d’une personnalité',
	'sobriete': 'Mise en sobriété énergétique',
	'securite': 'Débauche sécuritaire',
	'creatif': 'Action créative',
	'chahut': 'Chahut (manifestation, casserolade, huée…)'
} as const;

// prettier-ignore
export const TARGET_MULTIPLIER = {
	'snu': 1,
	'secretaire-etat': 1,
	'ministre-del': 2,
	'ministre': 3,
	'ministre-int': 4,
	'presidente-an': 4,
	'premiere-min': 5,
	'president-rep': 6
} as const;
