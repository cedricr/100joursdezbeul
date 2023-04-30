import { fetchData } from './fetchData.js';
import cleanup from '../extractAttacData/transformers/cleanup.js';
import removeExistingEvents from '../extractAttacData/transformers/removeExistingEvents.js';
import processMultiEvents from '../extractAttacData/transformers/processMultiEvents.js';
import filterDupeFlaggedSubmissions from './transformers/filterDupeFlaggedSubmissions.js';

export async function extractFramaformData(username, password, validEvents, ignoredEvents) {
	const data = await fetchData(username, password);
	return [
		filterDupeFlaggedSubmissions,
		processMultiEvents,
		removeExistingEvents.bind(this, validEvents, ignoredEvents),
		cleanup
	].reduce((previousData, transformer) => transformer(previousData, data), data);
}
