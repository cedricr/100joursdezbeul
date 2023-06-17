import type { IRecord } from 'grist-api';

export type ActionCode = 'annulation' | 'chahut' | 'sobriete' | 'creatif' | 'fuite';

export type ActionTarget =
	| 'snu'
	| 'secretaire-etat'
	| 'ministre-del'
	| 'ministre'
	| 'ministre-int'
	| 'presidente-an'
	| 'premiere-min'
	| 'president-rep';

export interface HumanizedLink {
	url: string;
	text: string;
}

export interface ActionEvent {
	date: string;
	ville: string;
	departement: string;
	description: string;
	actions: ActionCode[];
	cibles: {
		nom: string;
		titre: string;
		role: {
			code: ActionTarget;
			intitule: string;
		};
		ministeres: { nom: string }[];
	}[];
	liens: string[];
	score: number;
}

export interface GristAction extends IRecord {
	id: number;
	lieu: string;
	departement: string;
	date: number;
	description: string;
	lien1: string;
	lien2: string;
	lien3: string;
	actions: ['L', ...ActionCode[]];
	cibles: ['L', ...number[]];
}

export interface GristTarget extends IRecord {
	id: number;
	nom: string;
	role: number;
	titre: string;
	ministeres: ['L', ...number[]];
}

export interface GristRole extends IRecord {
	id: number;
	code: ActionTarget;
	intitule: string;
}

export interface GristMinistry extends IRecord {
	id: number;
	nom: string;
}
