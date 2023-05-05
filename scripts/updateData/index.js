import { join } from 'path';
import { extractFramaformData } from './extractFramaform/extractFramaform.js';
import { extractAttacData } from './extractAttacData/extractAttacData.js';
import {
	backupFile,
	filterData,
	parseODSFile,
	readDataFromNextcloud,
	saveData,
	saveJSONAsCSV
} from './utils/files.util.js';

const scriptArgs = process.argv.slice(2);
const username = scriptArgs[0];
const password = scriptArgs[1];
const dataFile = join(process.cwd(), './src/lib/assets/data.json');
const ignoredDataFile = join(process.cwd(), './src/lib/assets/data-ignored.json');
const metadataFile = join(process.cwd(), './src/lib/assets/metadata.json');
const backupDataFile = join(process.cwd(), `data-${Date.now()}.bck.json`);
const newEventsCSV = join(process.cwd(), `new-events.csv`);

async function run() {
	if (!username) {
		console.error('You need to provide a username');
		return -1;
	}
	if (!password) {
		console.error('You need to provide a password');
		return -1;
	}
	console.log('fetching data from nextcloud...');
	const buffer = await readDataFromNextcloud(username, password, '/100jours de zbeul.ods');
	console.log('parsing data from nextcloud...');
	const odsData = parseODSFile(buffer);
	console.log(`backing up previous data in ${backupDataFile}`);
	await backupFile(dataFile, backupDataFile);
	console.log('filtering data from nextcloud...');
	const data = filterData(odsData);
	console.log('saving validated events...');
	await saveData(dataFile, data.addedEvents);
	console.log('saving ignored events...');
	await saveData(ignoredDataFile, data.ignoredEvents);
	console.log('saving metadata...');
	await saveData(metadataFile, {
		lastImport: new Date().toISOString(),
		validEvents: data.addedEvents.length,
		invalidEvents: data.ignoredEvents.length
	});
	console.log('extracting Attac data...');
	const attacData = await extractAttacData(data.addedEvents, data.ignoredEvents);
	console.log('extracting Framaform data...');
	const framaformData = await extractFramaformData(
		username,
		password,
		data.addedEvents,
		data.ignoredEvents
	);
	saveJSONAsCSV(newEventsCSV, [...attacData, ...framaformData]);
	const newEvents = attacData.length + framaformData.length;
	if (newEvents) {
		console.log(
			`${newEvents} new events added to new-events.csv. Don't forget to add them in the spreadhseet!`
		);
	} else {
		console.log('no new events to add to the spreadsheet.');
	}
}

await run();
