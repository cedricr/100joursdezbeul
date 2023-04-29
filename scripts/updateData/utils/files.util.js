import {stringify} from 'csv-stringify';
import fs from 'fs';
import {Client, Server} from 'nextcloud-node-client';
import XLSX from 'xlsx';
import {convertRowToEvent, checkEventValidity, convertEventToCsvRow} from './data.util.js';

export const backupFile = async (src, dest) => new Promise((resolve, reject) => {
  fs.copyFile( src, dest, 0, (err) => {
    if(err) reject(err);
    resolve();
  });
});

export const saveData = async (dest, data) => new Promise((resolve, reject) => {
  fs.writeFile(dest, JSON.stringify(data, null, 2), (error) => {
    if (error) {
      reject(error);
    }
    resolve();
  });
})

export const filterData = (data) => {
  return data.reduce((result, event) => {
    const validity = checkEventValidity(event);
    if(validity.valid) {
      result.addedEvents.push(event);
    } else {
      result.ignoredEvents.push({
        ...event,
        erreurs: validity.errors,
      });
    }
    return result;
  }, {
    addedEvents: [],
    ignoredEvents: [],
  })
}

export function saveJSONAsCSV(dest, data) {
  const writableStream = fs.createWriteStream(dest);

  const columns = [
    "ID",
    "ville",
    "departement",
    "data ajout",
    "data modif",
    "date",
    "description",
    "liens",
    "action 1",
    "action 2",
    "action 3",
    "action 4",
    "action 5",
    "cible 1",
    "cible 2",
    "cible 3",
    "cible 4",
    "cible 5",
    "statut",
    "source",
  ];

  const stringifier = stringify({ header: true, columns: columns });

  data.forEach(event => {
    stringifier.write(convertEventToCsvRow(event));
  });
  stringifier.pipe(writableStream);
}

export async function readDataFromNextcloud(username, password) {
  const server = new Server(
    { basicAuth:
        {
          username,
          password,
        },
      url: "https://cloud.solidairesinformatique.org/",
    });

  const client = new Client(server);
  const file = await client.getFile("/100jours de zbeul.ods");
  return await file.getContent();
}

export function parseODSFile(buffer) {
  const workbook = XLSX.read(buffer, {cellDates: true});
  const worksheet = workbook.Sheets['data'];
  return XLSX.utils.sheet_to_json(worksheet).map(convertRowToEvent);
}