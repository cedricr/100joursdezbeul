import {join} from 'path';
import {extractAttacData} from './extractAttacData/extractAttacData.js';
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
const attacCSV = join(process.cwd(), `attac-new-events.csv`);

async function run() {
  if(!username) {
    console.error('You need to provide a username');
    return -1;
  }
  if(!password) {
    console.error('You need to provide a password');
    return -1;
  }
  const buffer = await readDataFromNextcloud(username, password)
  const odsData = parseODSFile(buffer);
  await backupFile(dataFile, backupDataFile);
  const data = filterData(odsData);
  await saveData(dataFile, data.addedEvents);
  await saveData(ignoredDataFile, data.ignoredEvents);
  await saveData(metadataFile, {
    lastImport: new Date().toISOString(),
    validEvents: data.addedEvents.length,
    invalidEvents: data.ignoredEvents.length,
  });
  const attacData = await extractAttacData(data.addedEvents,data.ignoredEvents);
  saveJSONAsCSV(attacCSV, attacData);
}

await run();