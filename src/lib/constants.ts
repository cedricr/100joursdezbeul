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
export const ACTION_DESCRIPTION = {
	'annulation': 'Lorsqu’une personnalité renonce à une partie ou la totalité de la visite prévue.',
	'fuite': 'Lors de la visite d’une personnalité, celle-ci décide d’accélérer le pas et de rentrer plus tôt que prévu.',
	'sobriete': 'Intervention de camarades afin de limiter la consommation énergétique et préserver	l’environnement par une transition énergétique accélérée et locale des membres du gouvernement.',
	'securite': 'Le gouvernement triche, et ne laisse pas les camarades venir l’acclamer.',
	'creatif': 'Faire preuve d’originalité dans l’expression des revendications. Par exemple les opérations escargot, banderoles originales citées dans des articles, venir déguisé, etc.',
	'chahut': 'Lors d’une visite, organiser manifestations, casserolades, charivaris, cacophonies ou huées.',
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
	'2B',
	'28',
	'32',
	'52',
	'55',
	'58',
	'70',
	'80',
	'971',
	'972',
	'976'
];
