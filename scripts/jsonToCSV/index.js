import data from '../../extract.json' assert { type: 'json' };
import fs from 'fs';
import {stringify} from 'csv-stringify';

function run() {
  const writableStream = fs.createWriteStream('./export.csv');

  const columns = [
    "ID",
    "ville",
    "departement",
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

  data.forEach(row => {
    const departement = `${row.codeInsee}`.slice(0, 2);
    const csvRow = [`${departement} - ${row.ville} - ${row.date}`, row.ville, departement, row.date, row.description, row.liens.join(';')];
    for(let i = 0; i < 5; i++) {
      if(i < row.actions.length) csvRow.push(row.actions[i]);
      else csvRow.push('');
    }
    for(let i = 0; i < 5; i++) {
      if(i < row.cibles.length) csvRow.push(row.cibles[i]);
      else csvRow.push('');
    }
    csvRow.push(row.source || 'import JSON');
    stringifier.write(csvRow);
  });
  stringifier.pipe(writableStream);
}

run();