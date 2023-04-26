import extractImages from './transformers/extractImages.js';
import {detectActions, detectTargets} from './transformers/detectTargetsAndActions.js';
import filterFutureEvents from './transformers/filterFutureEvents.js';
import {fetchData} from './fetchData.js';
import extractCityAndDate from './transformers/extractCityAndDate.js';
import extractLinks from './transformers/extractLinks.js';
import cleanup from './transformers/cleanup.js';
import removeExistingEvents from './transformers/removeExistingEvents.js'

import validEvents from '../../../src/lib/assets/data.json' assert { type: 'json' };
import ignoredEvents from '../../../src/lib/assets/data-ignored.json' assert { type: 'json' };
import targets from '../data/targets.json' assert { type: 'json' };
import actions from '../data/actions.json' assert { type: 'json' };

export async function extractAttacData(){
  const data = await fetchData();
  return [
    filterFutureEvents,
    extractCityAndDate,
    removeExistingEvents.bind(this, validEvents,ignoredEvents),
    extractLinks,
    extractImages,
    detectTargets.bind(this, targets),
    detectActions.bind(this, actions),
    cleanup,
  ].reduce((previousData, transformer) => transformer(previousData, data), data);
}