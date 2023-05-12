export const load = async ({ params, parent }) => {
	const { actions } = await parent();
	return {
		nom: params.nom,
		actions
	};
};
