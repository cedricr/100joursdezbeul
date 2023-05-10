import { getLatestDate } from '$lib/utils';
import { redirect } from '@sveltejs/kit';
import dayjs from 'dayjs';

export const load = async ({ parent }) => {
	const { actions } = await parent();
	const lastUpdateDate = getLatestDate(actions);
	const dateString = dayjs(lastUpdateDate).format('YYYY-MM-DD');
	throw redirect(307, `/date/${dateString}`);
};
