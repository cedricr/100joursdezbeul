import fetch from 'node-fetch';

const STATUS = {
  'Mobilisation passée': 'DONE',
  'Mobilisation prévue': 'PLANNED',
  'Déplacement annulé': 'CANCELED',
}

const DATALAYERS_IDS = [2754530, 2754531, 2754532];

export async function fetchData() {
  return Promise.all(
    DATALAYERS_IDS.map(
      (datalayerId) => fetch(`https://umap.openstreetmap.fr/fr/datalayer/${datalayerId}`)
        .then(response => response.json())))
    .then(responses => responses.reduce(
      (data, response) => [...data, ...response.features.map(
        feature => ({
          coordinates: feature.geometry.coordinates,
          name: feature.properties.name,
          description: feature.properties.description,
          status: STATUS[response._umap_options.name]
        })
      )], [])
    );
}