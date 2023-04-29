export default (previous, original) =>
	previous.map((event) => {
		return {
			...event,
			description: event.description.replaceAll(/\n\n/g, '\n').replaceAll(/\n$/g, '').trim()
		};
	});
