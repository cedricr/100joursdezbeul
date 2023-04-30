export type ActionCode = 'manif' | 'annulation' | 'chahut' | 'sobriete' | 'creatif' | 'fuite';

export type ActionTarget =
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
	liens: string;
	score: number;
}

export interface DepartmentResult {
	[departmentCode: string]: number;
}
