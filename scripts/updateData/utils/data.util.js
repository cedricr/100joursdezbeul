import inseeCodes from '../data/insee.json' assert { type: 'json' };;
import inseeRemapping from '../data/inseeRemapping.json' assert { type: 'json' };;

const isEmpty = value => value;

export const extractLocation = (city, dep) => {
  const realCityName = inseeRemapping[city] || city;
  const matchingInseeCodes = inseeCodes.filter((code) => code.LIBELLE === realCityName && (!dep || `${code.COM}`.startsWith(dep)) );
  const codeInsee = matchingInseeCodes.length === 1 ? matchingInseeCodes[0].COM : undefined;
  const departement = codeInsee ? `${codeInsee}`.slice(0,2) : '';
  return {
    ville: realCityName,
    codeInsee,
    departement,
  };
}

export const formatDate = (date) => {
  const strMonth = `${date.getMonth()+1}`.padStart(2, '0');
  const strDay = `${date.getDate()}`.padStart(2, '0');
  return `${date.getFullYear()}-${strMonth}-${strDay}`;
}

export function convertRowToEvent(row) {
  const actions = row.slice(8, 13).filter(isEmpty);
  const cibles = row.slice(13, 18).filter(isEmpty);
  const {ville, departement, codeInsee} = extractLocation(row[1], row[2]);
  const now = formatDate(new Date());

  return {
    id: row[0],
    ville,
    departement,
    ajout:row[3] || now,
    modif:row[4] || now,
    date: row[5],
    description: row[6].replaceAll('', '\''),
    liens: row[7].split(';').filter(isEmpty),
    codeInsee,
    actions,
    cibles,
    source: row[18],
    remarques: row[19],
  }
}

export function checkEventValidity(event) {
  const now = formatDate(new Date());
  const today = new Date(now).getTime();
  const allocutionDate = new Date('2023-04-18').getTime();
  const eventDate = new Date(event.date).getTime();

  const result = {valid: true, errors: []};

  if(!event.cibles?.length) {
    result.valid = false;
    result.errors.push('pas de cible');
  }

  if(!event.actions?.length) {
    result.valid = false;
    result.errors.push('pas d\'action');
  }

  if(eventDate < allocutionDate) {
    result.valid = false;
    result.errors.push('avant allocution');
  }

  if(eventDate >= today) {
    result.valid = false;
    result.errors.push('date future');
  }

  if(!event.codeInsee) {
    result.valid = false;
    result.errors.push('pas de code INSEE');
  }

  return result;
}

export const convertEventToCsvRow = (event) => {
  const csvRow = [event.id, event.ville, event.departement, event.ajout, event.modif, event.date, event.description, event.liens.join(';')];
  for(let i = 0; i < 5; i++) {
    if(i < event.actions.length) csvRow.push(event.actions[i]);
    else csvRow.push('');
  }
  for(let i = 0; i < 5; i++) {
    if(i < event.cibles.length) csvRow.push(event.cibles[i]);
    else csvRow.push('');
  }
  csvRow.push(event.source);
  return csvRow;
}