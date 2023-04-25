import fs from 'fs';
import {parse} from 'csv-parse';
import path from 'path';
import {extractLocation} from '../extractAttacData/transformers/extractCityAndDate.js';

const scriptArgs = process.argv.slice(2);
const filename = path.join(process.cwd(), scriptArgs[0]);

const isEmpty = value => value;

function run() {
  const data = [];

  const readerStream = fs.createReadStream(filename);
// Set the encoding to be utf8
  readerStream.setEncoding('latin1');

  readerStream
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) {
      const actions = row.slice(6, 11).filter(isEmpty);
      const cibles = row.slice(11, 16).filter(isEmpty);
      const {ville, departement, codeInsee} = extractLocation(row[1], row[2]);

      data.push({
        id: row[0],
        ville,
        departement,
        date: row[3],
        description: row[4].replaceAll('', '\''),
        liens: row[5].split(';').filter(isEmpty),
        codeInsee,
        actions,
        cibles,
        source: row[16],
      });
    })
    .on("end", function () {
      fs.writeFile('./export.json', JSON.stringify(data, null, 2), (error) => {
        if (error) {
          console.log('An error has occurred ', error);
          return;
        }
        console.log('Data written successfully to disk');
      });
    })
    .on("error", function (error) {
      console.log(error.message);
    });
}

run();