import {extractLocation, formatDate} from '../../utils/data.util.js';

const nameRegexp = new RegExp(/(.*) ([0-9]{2}\/[0-9]{2})/);

export default (previous, original) => previous.map(event => {
  const result = nameRegexp.exec(event.name);
 const city = result[1].replaceAll(' -', '');
 const date = result[2];
  const [day, month] = date.split('/');
 const {ville: realCityName, codeInsee, departement} = extractLocation(city, undefined, event.coordinates);
  const realDate = new Date(2023, month - 1, parseInt(day, 10));
  const formatedDate = formatDate(realDate);
  return {
    ...event,
    id: `${departement || 'un'} - ${realCityName} - ${formatedDate}`,
    ville: realCityName,
    date: formatedDate,
    ajout: formatedDate,
    modif: formatedDate,
    codeInsee,
    departement,
  }
});