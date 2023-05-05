import { expect, it, describe } from 'vitest';
import extractLinks from 'scripts/updateData/extractAttacData/transformers/extractLinks.js';

describe('extracting links', () => {
	it('should extract one link in MD format', () => {
		expect(
			extractLinks([
				{
					description: 'some text with a link [[http://link.url]]'
				}
			])
		).toEqual([
			{
				description: 'some text with a link ',
				liens: ['http://link.url']
			}
		]);
	});

	it('should extract several links in MD format', () => {
		expect(
			extractLinks([
				{
					description:
						'some text with a link [[http://link.url]] and another one [[https://link2.url]]'
				}
			])
		).toEqual([
			{
				description: 'some text with a link  and another one ',
				liens: ['http://link.url', 'https://link2.url']
			}
		]);
	});

	it('should extract a non MD url', () => {
		expect(
			extractLinks([
				{
					description: 'some text with a link http://link.url'
				}
			])
		).toEqual([
			{
				description: 'some text with a link ',
				liens: ['http://link.url']
			}
		]);
	});

	it('should extract all non MD urls', () => {
		expect(
			extractLinks([
				{
					description: 'some text with a link http://link.url and another one https://link2.url'
				}
			])
		).toEqual([
			{
				description: 'some text with a link  and another one ',
				liens: ['http://link.url', 'https://link2.url']
			}
		]);
	});
});
