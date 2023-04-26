import { expect, it, describe } from 'vitest'
import extractCityAndDate from '../extractCityAndDate.js';
describe('extract the city and the date of the event', () => {
  it('should extract the city properly', () => {
    expect(extractCityAndDate([{
      name: 'City - 10/01',
    }])).toEqual([expect.objectContaining({
      name: 'City - 10/01',
      ville: 'City',
    })])
  });

  it('should extract the city properly', () => {
    expect(extractCityAndDate([{
      name: 'City - 10/01',
    }])).toEqual([expect.objectContaining({
      name: 'City - 10/01',
      date: '2023-01-10',
    })])
  });

  it('should extract the insee code properly', () => {
    expect(extractCityAndDate([{
      name: 'Paris - 01/01',
    }])).toEqual([expect.objectContaining({
      name: 'Paris - 01/01',
      codeInsee: 75056,
    })])
  });

  it('should extract the insee code properly when city is not matching the insee name', () => {
    expect(extractCityAndDate([{
      name: 'La Baule - 01/01',
    }])).toEqual([expect.objectContaining({
      name: 'La Baule - 01/01',
      ville: 'La Baule-Escoublac',
      codeInsee: 44055,
    })])
  });

  it('should not extract the insee code if there is no match', () => {
    expect(extractCityAndDate([{
      name: 'RandomCity - 01/01',
    }])).toEqual([expect.objectContaining({
      name: 'RandomCity - 01/01',
      ville: 'RandomCity',
      codeInsee: undefined,
    })])
  });
});