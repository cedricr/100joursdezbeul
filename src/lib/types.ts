export type ActionCode =
	| 'manif'
	| 'annulation'
	| 'chahut'
	| 'sobriete'
	| 'action-creative'
	| 'fuite';

export type ActionTarget =
	| 'secretaire-detat'
	| 'ministre-delegue-e'
	| 'ministre'
	| 'PAN'
	| 'PM'
	| 'PR';

export interface Action {
	code: ActionCode;
	target: ActionTarget;
}

export interface ActionEvent {
	ville: string;
	codeInsee: string;
	description: string;
	actions: Action[];
}

export interface DayData {
	date: string;
	evenements: ActionEvent[];
}

export interface DepartmentResult {
	[departmentCode: string]: number;
}
