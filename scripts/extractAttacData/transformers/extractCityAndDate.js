import inseeCodes from './data/insee.json' assert { type: 'json' };

// some usual city name do not match their INSEE one
const INSEE_REMAPPING = {
  'La Baule': 'La Baule-Escoublac',
  'Paris 12': 'Paris 12e Arrondissement',
  'Paris 13': 'Paris 13e Arrondissement',
  'Tricastin': 'Saint-Paul-Trois-Châteaux',
  'Les Sables d\'Olonne': 'Les Sables-d\'Olonne',
  'Lons le Saunier': 'Lons-le-Saunier',
  'Salon de Provence': 'Salon-de-Provence',
  'Gasville': 'Gasville-Oisème',

};

export const extractLocation = (city, dep) => {
  const realCityName = INSEE_REMAPPING[city] || city;
  const codeInsee = inseeCodes.find((code) => code.LIBELLE === realCityName && (!dep || `${code.COM}`.startsWith(dep)) )?.COM;
  const departement = `${codeInsee}`.slice(0,2);
  return {
    ville: realCityName,
    codeInsee,
    departement,
  };
}

const nameRegexp = new RegExp(/(.*) ([0-9]{2}\/[0-9]{2})/);

export default (previous, original) => previous.map(event => {
  const result = nameRegexp.exec(event.name);
 const city = result[1].replaceAll(' -', '');
 const date = result[2];
  const [day, month] = date.split('/');
 const {ville: realCityName, codeInsee, departement} = extractLocation(city);
  const realDate = new Date(2023, month - 1, parseInt(day, 10));
  const strMonth = `${realDate.getMonth()+1}`.padStart(2, '0');
  const strDay = `${realDate.getDate()}`.padStart(2, '0');
  return {
    ...event,
    id: `${departement} - ${realCityName} - ${realDate.getFullYear()}-${strMonth}-${strDay}`,
    ville: realCityName,
    date: `${realDate.getFullYear()}-${strMonth}-${strDay}`,
    codeInsee,
    departement,
  }
});