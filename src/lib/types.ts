type ActionCode = 'non-accueil' | 'casserolade';

	type ActionTarget = 'ministre-regalien' | 'ministre' | 'plusieurs-ministres' | 'PR';

	interface Action {
		code: ActionCode;
		target: ActionTarget;
	}

	interface Event {
		dept: string;
		ville: string;
		codeInsee: string;
		description: string;
		actions: Action[];
	}

	interface DayData {
		date: string;
		evenements: Event[];
	}

	interface DepartmentResult {
		[departmentCode: string]: number;
	}
