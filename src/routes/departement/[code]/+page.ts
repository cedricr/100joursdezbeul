export const load = async ({ params, parent }) => {
	const { actions } = await parent();
	return {
		department: params.code,
		actions
	};
};
