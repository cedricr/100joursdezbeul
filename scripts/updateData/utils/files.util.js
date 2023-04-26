import {parse} from 'csv-parse';
import {stringify} from 'csv-stringify';
import fs from 'fs';
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

export const extractCSVData = async (dest) => new Promise((resolve, reject) => {
  const readerStream = fs.createReadStream(dest);
// Set the encoding to be utf8
  readerStream.setEncoding('latin1');

  const addedEvents = [];
  const ignoredEvents = [];

  readerStream
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) {
      const event = convertRowToEvent(row);
      const validity = checkEventValidity(event);
      if(validity.valid) {
        addedEvents.push(event);
      } else {
        ignoredEvents.push({
          ...event,
          erreurs: validity.errors,
        });
      }
    })
    .on("end", function () {
      resolve({
        addedEvents,
        ignoredEvents,
      })
    })
    .on("error", function (error) {
      reject(error);
    });
})

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
    "source",
  ];

  const stringifier = stringify({ header: true, columns: columns });

  data.forEach(event => {
    stringifier.write(convertEventToCsvRow(event));
  });
  stringifier.pipe(writableStream);
}