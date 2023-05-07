import { getLatestDate } from '$lib/utils';
import { redirect } from '@sveltejs/kit';
import dayjs from 'dayjs';

export const load = async ({ parent }) => {
	const { actionEvents } = await parent();
	const lastUpdateDate = getLatestDate(actionEvents);
	const dateString = dayjs(lastUpdateDate).format('YYYY-MM-DD');
	throw redirect(307, `/date/${dateString}`);
};
