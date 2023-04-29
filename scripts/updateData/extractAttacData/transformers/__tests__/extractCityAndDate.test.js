import { expect, it, describe, vi } from 'vitest';
import extractCityAndDate from 'scripts/updateData/extractAttacData/transformers/extractCityAndDate.js';
describe('extract the city and the date of the event', () => {
	it('should extract the city properly', () => {
		expect(
			extractCityAndDate([
				{
					name: 'City - 10/01'
				}
			])
		).toEqual([
			expect.objectContaining({
				name: 'City - 10/01',
				ville: 'City'
			})
		]);
	});

	it('should extract the city properly', () => {
		expect(
			extractCityAndDate([
				{
					name: 'City - 10/01'
				}
			])
		).toEqual([
			expect.objectContaining({
				name: 'City - 10/01',
				date: '2023-01-10'
			})
		]);
	});

	it('should extract the insee code properly', () => {
		expect(
			extractCityAndDate([
				{
					name: 'Paris - 01/01'
				}
			])
		).toEqual([
			expect.objectContaining({
				name: 'Paris - 01/01',
				codeInsee: 75056
			})
		]);
	});

	it('should extract the insee code properly when city is not matching the insee name', () => {
		expect(
			extractCityAndDate([
				{
					name: 'La Baule - 01/01'
				}
			])
		).toEqual([
			expect.objectContaining({
				name: 'La Baule - 01/01',
				ville: 'La Baule-Escoublac',
				codeInsee: 44055
			})
		]);
	});

	it('should not extract the insee code if there is no match', () => {
		expect(
			extractCityAndDate([
				{
					name: 'RandomCity - 01/01'
				}
			])
		).toEqual([
			expect.objectContaining({
				id: 'un - RandomCity - 2023-01-01',
				name: 'RandomCity - 01/01',
				ville: 'RandomCity',
				codeInsee: undefined
			})
		]);
	});

	it('should not extract the insee code if there are several matches', () => {
		expect(
			extractCityAndDate([
				{
					name: 'Saint-Denis - 01/01'
				}
			])
		).toEqual([
			expect.objectContaining({
				id: 'un - Saint-Denis - 2023-01-01',
				name: 'Saint-Denis - 01/01',
				ville: 'Saint-Denis',
				codeInsee: undefined
			})
		]);
	});

	it('should extract the name as city and set the date as today if the name is not at the right format', () => {
		vi.useFakeTimers().setSystemTime(new Date('2023-04-17'));
		expect(
			extractCityAndDate([
				{
					name: 'Saint-Denis'
				}
			])
		).toEqual([
			expect.objectContaining({
				id: 'un - Saint-Denis - 2023-04-17',
				name: 'Saint-Denis',
				date: '2023-04-17',
				ville: 'Saint-Denis'
			})
		]);
	});

	it('should take the closest codeInsee in case of homonyms', () => {
		expect(
			extractCityAndDate([
				{
					name: 'Saint-Denis - 01/01',
					coordinates: [2.358276, 48.935954]
				}
			])
		).toEqual([
			expect.objectContaining({
				id: '93 - Saint-Denis - 2023-01-01',
				ville: 'Saint-Denis',
				codeInsee: 93066,
				departement: '93'
			})
		]);
	});

	it('should match normalized city names', () => {
		expect(
			extractCityAndDate([
				{
					name: 'saînt denis - 01/01',
					coordinates: [2.358276, 48.935954]
				}
			])
		).toEqual([
			expect.objectContaining({
				id: '93 - Saint-Denis - 2023-01-01',
				ville: 'Saint-Denis',
				codeInsee: 93066,
				departement: '93'
			})
		]);
	});
});
