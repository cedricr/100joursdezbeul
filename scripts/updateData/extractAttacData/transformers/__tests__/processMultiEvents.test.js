import { expect, it, describe } from 'vitest';
import processMultiEvents from 'scripts/updateData/extractAttacData/transformers/processMultiEvents.js';

describe('process multi events at the same date', () => {
	it('should not update the ids if there are no similar events', () => {
		expect(
			processMultiEvents([
				{
					id: 'event1'
				},
				{
					id: 'event2'
				}
			])
		).toEqual([
			{
				id: 'event1'
			},
			{
				id: 'event2'
			}
		]);
	});

	it('should  update the ids if there are similar events', () => {
		expect(
			processMultiEvents([
				{
					id: 'event'
				},
				{
					id: 'event'
				}
			])
		).toEqual([
			{
				id: 'event - 0'
			},
			{
				id: 'event - 1'
			}
		]);
	});
});
