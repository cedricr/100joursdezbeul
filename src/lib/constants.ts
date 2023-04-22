// Extrait de l'API découpage administratif
// https://geo.api.gouv.fr/decoupage-administratif

import departements from '$lib/assets/departements.json?raw';

export const startDay = "2023-04-18"

export const DEPARTMENTS = JSON.parse(departements) as {"nom":string, "code":string, "codeRegion":string}[];
