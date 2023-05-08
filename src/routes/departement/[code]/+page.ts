export const load = async ({ params, parent }) => {
	const { actionEvents } = await parent();
	return {
		department: params.code,
		actionEvents
	};
};
