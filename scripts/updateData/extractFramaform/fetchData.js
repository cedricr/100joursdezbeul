import * as fs from 'fs';
import { readDataFromNextcloud } from './../utils/files.util.js';
import { extractLocation, formatDate } from '../utils/data.util.js';
import { read, set_fs, utils } from 'xlsx';
set_fs(fs);

const actions = {
	'Annulation d’une visite 🎉': 'annulation',
	'Action conduisant au départ précipité d’une personnalité': 'fuite',
	'Mise en sobriété énergétique': 'sobriete',
	'Action créative': 'creatif',
	Manifestation: 'manif',
	'Chahut, casserolade': 'chahut'
};

const targets = {
	'Président de la République': 'president-rep',
	Ministre: 'ministre',
	'Ministre de l’intérieur': 'ministre',
	'Présidente de l’Assemblée Nationale': 'presidente-an',
	'Secrétaire d’État': 'secretaire-etat',
	'Ministre délégué·e': 'ministre-del',
	'Première ministre': 'premiere-min'
};

function convertRowToEvent(row) {
	const { ville, codeInsee, departement } = extractLocation(row.Commune, row['Département']);
	const now = formatDate(new Date());

	const event = Object.keys(row).reduce(
		(properEvent, key) => {
			if (key.toLowerCase().includes('action')) {
				if (actions[row[key]]) properEvent.actions.push(actions[row[key]]);
				else properEvent.actions.push(row[key]);
			} else if (key.toLowerCase().includes('personnalité')) {
				if (targets[row[key]]) properEvent.cibles.push(targets[row[key]]);
				else properEvent.cibles.push(row[key]);
			} else {
				properEvent[key] = row[key];
			}
			return properEvent;
		},
		{ actions: [], cibles: [] }
	);

	const formatedDate = formatDate(event["Date de l'événement"]);

	return {
		id: `${departement || 'un'} - ${ville} - ${formatedDate}`,
		ville,
		departement: `${departement}`,
		ajout: now,
		modif: now,
		date: formatedDate,
		description: event.Description.replaceAll('’', "'"),
		liens: event['Lien vers un article de presse'] ? [event['Lien vers un article de presse']] : [],
		codeInsee,
		actions: event.actions,
		cibles: event.cibles,
		source: 'framaform',
		statut: 'TO CHECK',
		remarques: event['Commentaire libre'],
		dupe: event.dupe
	};
}

export async function fetchData(username, password) {
	const framaformOds = await readDataFromNextcloud(username, password, '/framaform results.ods');
	const workbook = read(framaformOds, { cellDates: true });
	const worksheet = Object.values(workbook.Sheets)[0];
	return utils.sheet_to_json(worksheet).map(convertRowToEvent);
}
