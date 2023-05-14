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
	'chahut': 'Chahut (manifestation, casserolade, huée…)',
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
	'president-rep': 6,
} as const;

export const MAY_FIRST_PARTICIPANTS = [
	'01',
	'02',
	'03',
	'04',
	'05',
	'06',
	'07',
	'08',
	'09',
	'10',
	'11',
	'12',
	'13',
	'14',
	'15',
	'16',
	'17',
	'18',
	'19',
	'21',
	'22',
	'23',
	'24',
	'25',
	'26',
	'27',
	'29',
	'30',
	'31',
	'33',
	'34',
	'35',
	'36',
	'37',
	'38',
	'39',
	'40',
	'41',
	'42',
	'43',
	'44',
	'45',
	'46',
	'47',
	'48',
	'49',
	'50',
	'51',
	'53',
	'54',
	'56',
	'57',
	'59',
	'60',
	'61',
	'62',
	'63',
	'64',
	'65',
	'66',
	'67',
	'68',
	'69',
	'71',
	'72',
	'73',
	'74',
	'75',
	'76',
	'77',
	'78',
	'79',
	'81',
	'82',
	'83',
	'84',
	'85',
	'86',
	'87',
	'88',
	'89',
	'90',
	'91',
	'92',
	'93',
	'94',
	'95',
	'973',
	'974',
	'2A',
	'2B'
];
