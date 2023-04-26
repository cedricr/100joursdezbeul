import { expect, it, describe } from 'vitest';
import extractImages from '../extractImages.js';

describe('extracting images', () => {
  it('should extract one image in MD format', () => {
    expect(extractImages([{
      description: 'some text with an image {{http://image.url}}'
    }])).toEqual([{
      description: 'some text with an image ',
      images: ['http://image.url']
    }])
  });

  it('should extract several images in MD format', () => {
    expect(extractImages([{
      description: 'some text with an image {{http://image.url}} and another one {{http://image2.url}}'
    }])).toEqual([{
      description: 'some text with an image  and another one ',
      images: ['http://image.url', 'http://image2.url']
    }])
  });

  it('should ignore non MD urls', () => {
    expect(extractImages([{
      description: 'some text with an image http://image.url'
    }])).toEqual([{
      description: 'some text with an image http://image.url',
      images: []
    }])
  });
});