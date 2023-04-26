export type ActionCode = 'manif' | 'annulation' | 'chahut' | 'sobriete' | 'creatif' | 'fuite';

export type ActionTarget =
	| 'secretaire-etat'
	| 'ministre-del'
	| 'ministre'
	| 'ministre-int'
	| 'presidente-an'
	| 'premiere-min'
	| 'president-rep';

export interface ActionEvent {
	date: string;
	ville: string;
	codeInsee: string;
	description: string;
	actions: ActionCode[];
	cibles: ActionTarget[];
	score: number;
}

export interface DepartmentResult {
	[departmentCode: string]: number;
}

export interface PresseLink {
	content: string;
	source: string;
	image: string;
}