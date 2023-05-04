export const load = async ({ params, parent }) => {
	const { actionEvents, leaderboard } = await parent();
	return {
		department: params.code,
		actionEvents,
		leaderboard
	};
};
