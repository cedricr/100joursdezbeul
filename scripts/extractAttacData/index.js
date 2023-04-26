import extractImages from './transformers/extractImages.js';
import {detectActions, detectTargets} from './transformers/detectTargetsAndActions.js';
import filterFutureEvents from './transformers/filterFutureEvents.js';
import {fetchData} from './fetchData.js';
import extractCityAndDate from './transformers/extractCityAndDate.js';
import extractLinks from './transformers/extractLinks.js';
import cleanup from './transformers/cleanup.js';
import mergeWithExistingData from './transformers/mergeWithExistingData.js'

// import data from './mockData.js';
async function run(){
  const data = await fetchData();
  const processedData = [
    filterFutureEvents,
    extractCityAndDate,
    extractLinks,
    extractImages,
    detectTargets,
    detectActions,
    cleanup,
    mergeWithExistingData,
  ].reduce((previousData, transformer) => transformer(previousData, data), data);

  console.log(JSON.stringify(processedData, null, 2));
}

run();