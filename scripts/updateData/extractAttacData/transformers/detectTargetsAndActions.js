function normalize(value) {
	return value
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase();
}

function matchToken(description, token) {
	const targetMatchingRegexp = new RegExp(`(^|\\W)(?<!-)${normalize(token)}(?!-)($|\\W)`, 'gm');
	return normalize(description).match(targetMatchingRegexp);
}

export const detectTargets = (names, previous) =>
	previous.map((event) => {
		const targets = Object.keys(names).reduce((targets, target) => {
			if (names[target].find(matchToken.bind(null, event.description))) return [...targets, target];
			return targets;
		}, []);

		return {
			...event,
			cibles: targets
		};
	});

export const detectActions = (actions, previous, original) =>
	previous.map((event) => {
		const actionsDetected = Object.keys(actions).reduce((actionsDetected, action) => {
			if (actions[action].find(matchToken.bind(null, event.description)))
				return [...actionsDetected, action];
			return actionsDetected;
		}, []);

		if (!actionsDetected.includes('annulation') && event.status === 'CANCELED') {
			actionsDetected.push('annulation');
		}

		return {
			...event,
			actions: actionsDetected
		};
	});
