import { getLatestDate } from '$lib/utils';
import { redirect } from '@sveltejs/kit';
import dayjs from 'dayjs';

export const load = async ({ parent }) => {
	const { actions } = await parent();
	const lastUpdateDate = getLatestDate(actions);
	throw redirect(307, `/date/${lastUpdateDate}`);
};
