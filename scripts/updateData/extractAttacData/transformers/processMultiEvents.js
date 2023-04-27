// manage the events in the same town at the same date
export default (previous, original) => previous.map(event => {
  const duplicates = previous.filter(({id}) => id === event.id);
  if(duplicates.length > 1) {
      return {
        ...event,
        id: `${event.id} - ${duplicates.indexOf(event)}`,
      };
  }
  return event;
});