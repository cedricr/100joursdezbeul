import { expect, it, describe } from 'vitest';
import filterFutureEvents from 'scripts/updateData/extractAttacData/transformers/filterFutureEvents.js';

describe('filter out the planned events not done yet', () => {
	it('should filter only planned events', () => {
		expect(
			filterFutureEvents([
				{
					name: 'planned',
					status: 'PLANNED'
				},
				{
					name: 'done',
					status: 'DONE'
				},
				{
					name: 'canceled',
					status: 'CANCELED'
				},
				{
					name: 'another planned',
					status: 'PLANNED'
				},
				{
					name: 'random status',
					status: 'RANDOM'
				}
			])
		).toEqual([
			{
				name: 'done',
				status: 'DONE'
			},
			{
				name: 'canceled',
				status: 'CANCELED'
			},
			{
				name: 'random status',
				status: 'RANDOM'
			}
		]);
	});
});
