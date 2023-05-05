import { getLatestDate } from '$lib/utils';

export const load = async ({ parent }) => {
	const { actionEvents, leaderboard } = await parent();

	return {
		actionEvents,
		leaderboard
	};
};
