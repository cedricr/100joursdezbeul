import inseeCodes from './data/insee.json' assert { type: 'json' };

// some usual city name do not match their INSEE one
const INSEE_REMAPPING = {
  'La Baule': 'La Baule-Escoublac',
};

export default (previous, original) => previous.map(event => {
  const [city, date] = event.name.split(' - ');
  const [day, month] = date.split('/');
  const realCityName = INSEE_REMAPPING[city] || city;
  return {
    ...event,
    ville: realCityName,
    date: new Date(2023, month - 1, day).toISOString(),
    codeInsee: inseeCodes.find((code) => code.LIBELLE === realCityName )?.COM,
  }
});