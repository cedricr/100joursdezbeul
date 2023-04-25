import data from '../../../src/lib/assets/data.json' assert { type: 'json' };
export default (previous, original) => {
  const map = data.reduce((agg, event) => ({
    ...agg,
    [event.id]: event,
  }), {});

  previous.forEach(event => {
    if(map[event.id]) {
      map[event.id].liens = event.liens;
    } else {
      map[event.id] = {
        ...event,
        source: `attac - TO CHECK`,
      };
    }
  })

  return Object.values(map);
}