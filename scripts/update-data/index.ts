import fs from 'fs';
import path from 'path';
import { GristDocAPI } from 'grist-api';

const __dirname = new URL('.', import.meta.url).pathname;

// const DOC_URL = 'https://100joursdezbeul.getgrist.com/62uY9YoxQE56Ma1uRZQZqo/100-jours-de-zbeul';
const DOC_URL = 'https://100joursdezbeul.getgrist.com/3UFxMh17Rwp6/100-jours-de-zbeul-emergency';

function write(data: object, filename: string) {
	fs.writeFile(path.join(__dirname, '../..', filename), JSON.stringify(data, null, 2), (err) => {
		if (err) throw err;
		console.log(`${filename} OK`);
	});
}
async function main() {
	console.log('Chargement des données Grist');
	const api = new GristDocAPI(DOC_URL);
	const actions = await api.fetchTable('Actions');
	fs.writeFile('data/actions.json', JSON.stringify(actions, null, 2), function (err) {
		if (err) {
			return console.log(err);
		}
	});
	// // console.log(actions);
	write(actions, 'data/actions.json');
	const targets = await api.fetchTable('Cibles');
	// // console.log(targets);
	write(targets, 'data/cibles.json');

	const roles = await api.fetchTable('Roles');
	// // console.log(roles);
	write(roles, 'data/roles.json');

	const ministries = await api.fetchTable('Ministeres');
	// // console.log(ministries);
	write(ministries, 'data/ministeres.json');
}
main();
