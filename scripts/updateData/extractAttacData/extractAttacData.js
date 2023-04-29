import extractImages from './transformers/extractImages.js';
import { detectActions, detectTargets } from './transformers/detectTargetsAndActions.js';
import filterFutureEvents from './transformers/filterFutureEvents.js';
import { fetchData } from './fetchData.js';
import extractCityAndDate from './transformers/extractCityAndDate.js';
import extractLinks from './transformers/extractLinks.js';
import cleanup from './transformers/cleanup.js';
import removeExistingEvents from './transformers/removeExistingEvents.js';
import processMultiEvents from './transformers/processMultiEvents.js';

import targets from '../data/targets.json' assert { type: 'json' };
import actions from '../data/actions.json' assert { type: 'json' };

export async function extractAttacData(validEvents, ignoredEvents) {
	const data = await fetchData();
	return [
		filterFutureEvents,
		extractCityAndDate,
		processMultiEvents,
		removeExistingEvents.bind(this, validEvents, ignoredEvents),
		extractLinks,
		extractImages,
		detectTargets.bind(this, targets),
		detectActions.bind(this, actions),
		cleanup
	].reduce((previousData, transformer) => transformer(previousData, data), data);
}
