export default (validEvents, ignoredEvents, previous) => {
	const existingEvents = [...validEvents, ...ignoredEvents].reduce(
		(agg, event) => ({
			...agg,
			[event.id]: event
		}),
		{}
	);

	const newEvents = [];

	previous.forEach((event) => {
		if (!existingEvents[event.id]) {
			newEvents.push(event);
			existingEvents[event.id] = event;
		}
	});

	return newEvents;
};
