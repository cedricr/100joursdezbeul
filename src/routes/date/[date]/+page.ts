import dayjs from 'dayjs';

export const load = async ({ parent, params }) => {
	const { actions } = await parent();
	console.log(params);
	return {
		actions,
		date: params.date
	};
};

export function entries() {
	const startDate = dayjs('2023-04-18');
	const allDates = [];
	for (let i = 1; i <= 100; i++) {
		const date = startDate.add(i, 'day');
		allDates.push({ date: date.format('YYYY-MM-DD') });
	}
	return allDates;
}
