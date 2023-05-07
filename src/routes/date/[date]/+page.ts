export const load = async ({ parent, params }) => {
	const { actionEvents } = await parent();
	console.log(params);
	return {
		actionEvents,
		date: params.date
	};
};
