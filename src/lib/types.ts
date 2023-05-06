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
	cibles: ActionTarget[];
	liens: string[];
	score: number;
}

export interface DepartmentResult {
	[departmentCode: string]: number;
}

export interface GristRecord extends IRecord {
	lieu: string;
	departement: string;
	date: number;
	description: string;
	lien1: string;
	lien2: string;
	lien3: string;
	actions: [string, ...ActionCode[]];
	cibles: [string, ...ActionTarget[]];
}
