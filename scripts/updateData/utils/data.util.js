import inseeCodes from '../data/insee.json' assert { type: 'json' };
import inseeRemapping from '../data/inseeRemapping.json' assert { type: 'json' };

const isEmpty = (value) => value;
const normalizeCity = (city) =>
	`${city}`
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replaceAll('-', ' ');

export const getInseeInfo = (city, dep, coords) => {
	const matchingCodes = inseeCodes.filter(
		(code) =>
			normalizeCity(code.LIBELLE) === normalizeCity(city) && (!dep || `${code.COM}`.startsWith(dep))
	);
	if (matchingCodes.length === 1) return matchingCodes[0];
	else if (coords && matchingCodes.length > 1) {
		const matchingCodesByProximity = matchingCodes
			.filter((code) => 'COORD' in code)
			.map((code) => ({
				data: code,
				dist: Math.pow(code.COORD[0] - coords[0], 2) + Math.pow(code.COORD[1] - coords[1], 2)
			}))
			.sort((a, b) => a.dist - b.dist);
		if (matchingCodesByProximity.length > 0 && matchingCodesByProximity[0].dist < 1)
			return matchingCodesByProximity[0].data;
	}
	return {
		LIBELLE: city,
		COM: undefined
	};
};

export const extractLocation = (city, dep, coords) => {
	const realCityName = inseeRemapping[city] || city;
	let inseeInfo = getInseeInfo(realCityName, dep, coords);
	if (dep && !inseeInfo.COM) inseeInfo = getInseeInfo(realCityName); // retry with only the city name in case the department is wrong
	const departement = inseeInfo.COM ? `${inseeInfo.COM}`.slice(0, 2) : '';
	return {
		ville: inseeInfo.LIBELLE,
		codeInsee: inseeInfo.COM,
		departement
	};
};

export const formatDate = (date) => {
	const strMonth = `${date.getMonth() + 1}`.padStart(2, '0');
	const strDay = `${date.getDate()}`.padStart(2, '0');
	return `${date.getFullYear()}-${strMonth}-${strDay}`;
};

export function convertRowToEvent(row) {
	const { codeInsee } = extractLocation(row.ville, row.departement);
	const now = formatDate(new Date());

	const event = Object.keys(row).reduce(
		(properEvent, key) => {
			if (key.toLowerCase().startsWith('action')) {
				properEvent.actions.push(row[key]);
			} else if (key.toLowerCase().startsWith('cible')) {
				properEvent.cibles.push(row[key]);
			} else if (['modif', 'date', 'ajout'].includes(key)) {
				// looks like some dates stay at string...
				properEvent[key] = formatDate(new Date(row[key]));
			} else {
				properEvent[key] = row[key];
			}
			return properEvent;
		},
		/* needed to maintain order */ {
			id: null,
			ville: null,
			departement: null,
			ajout: null,
			modif: null,
			date: null,
			description: null,
			liens: '',
			codeInsee: null,
			actions: [],
			cibles: [],
			statut: null,
			source: null,
			remarques: ''
		}
	);
	if (!event.id) console.log(event);
	return {
		...event,
		codeInsee,
		ajout: event.ajout || now,
		modif: event.modif || now,
		liens: event.liens.split(';').filter(isEmpty),
		description: event.description.replaceAll('\u2019', "'").replaceAll('\u009C', 'œ'),
		id: event.id.replaceAll('\u2013', '-'),
		departement: `${event.departement}`
	};
}

export function checkEventValidity(event) {
	const now = formatDate(new Date());
	const today = new Date(now).getTime();
	const allocutionDate = new Date('2023-04-18').getTime();
	const eventDate = new Date(event.date).getTime();

	const result = { valid: true, errors: [] };

	if (!event.cibles?.length) {
		result.valid = false;
		result.errors.push('pas de cible');
	}

	if (!event.actions?.length) {
		result.valid = false;
		result.errors.push("pas d'action");
	}

	if (eventDate < allocutionDate) {
		result.valid = false;
		result.errors.push('avant allocution');
	}

	if (eventDate >= today) {
		result.valid = false;
		result.errors.push('date future');
	}

	if (!event.departement || event.departement === 'un') {
		result.valid = false;
		result.errors.push('pas de departement');
	}

	if (!event.statut || event.statut.toLowerCase() !== 'ok') {
		result.valid = false;
		result.errors.push('status not OK');
	}

	return result;
}

export const convertEventToCsvRow = (event) => {
	const csvRow = [
		event.id,
		event.ville,
		event.departement,
		event.ajout,
		event.modif,
		event.date,
		event.description,
		event.liens.join(';')
	];
	for (let i = 0; i < 5; i++) {
		if (i < event.actions.length) csvRow.push(event.actions[i]);
		else csvRow.push('');
	}
	for (let i = 0; i < 5; i++) {
		if (i < event.cibles.length) csvRow.push(event.cibles[i]);
		else csvRow.push('');
	}
	csvRow.push(event.statut);
	csvRow.push(event.source);
	return csvRow;
};
