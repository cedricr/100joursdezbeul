import { expect, it, describe } from 'vitest'
import cleanup from '../cleanup.js';

describe('cleanup the data', () => {
  it('should remove doubled line returns', () => {
    expect(cleanup([{
      description: 'a description with some\n\ndoubled line return'
    }])).toEqual([expect.objectContaining({
      description: 'a description with some\ndoubled line return'
    })]);
  });

  it('should remove doubled line returns everywhere', () => {
    expect(cleanup([{
      description: 'a description with some\n\ndoubled line return\n\nand more'
    }])).toEqual([expect.objectContaining({
      description: 'a description with some\ndoubled line return\nand more'
    })]);
  });

  it('should remove trailing line returns', () => {
    expect(cleanup([{
      description: 'a description with some\ndoubled line return\n'
    }])).toEqual([expect.objectContaining({
      description: 'a description with some\ndoubled line return'
    })]);
  });

  it('should remove trailing spaces', () => {
    expect(cleanup([{
      description: 'a description with some trailing space    '
    }])).toEqual([expect.objectContaining({
      description: 'a description with some trailing space'
    })]);
  });

  it('should remove starting spaces', () => {
    expect(cleanup([{
      description: '   a description with some starting space'
    }])).toEqual([expect.objectContaining({
      description: 'a description with some starting space'
    })]);
  });
});