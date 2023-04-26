export default (validEvents, ignoredEvents, previous) => {
  const existingEvents = [...validEvents, ...ignoredEvents].reduce((agg, event) => ({
    ...agg,
    [event.id]: event,
  }), {});

  const newEvents = [];

  previous.forEach(event => {
    if(!existingEvents[event.id]) {
      const newEvent = {
        ...event,
        source: `attac - TO CHECK`,
      };
      newEvents.push(newEvent);
      existingEvents[newEvent.id] = newEvent;
    }
  })

  return newEvents;
}