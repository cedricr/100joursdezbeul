const urlRegexp = new RegExp(/{{([^}]*)}}/g);

export default (previous) =>
	previous.map((event) => {
		const updatedEvent = {
			...event,
			images: event.images || []
		};

		let urls;
		while ((urls = urlRegexp.exec(event.description)) !== null) {
			updatedEvent.images.push(urls[1]);
			updatedEvent.description = updatedEvent.description.replace(urls[0], '');
		}
		return updatedEvent;
	});
