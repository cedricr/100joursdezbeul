import { startDay } from '$lib/constants';
import dayjs from 'dayjs';

export const load = async ({ parent, params }) => {
	const { actions, roles, targets, ministries } = await parent();
	return {
		actions,
		roles,
		targets,
		ministries,
		date: params.date
	};
};

export function entries() {
	const startDate = dayjs(startDay);

	const allDates = [];
	for (let i = 1; i <= 100; i++) {
		const date = startDate.add(i, 'day');
		allDates.push({ date: date.format('YYYY-MM-DD') });
	}
	return allDates;
}
