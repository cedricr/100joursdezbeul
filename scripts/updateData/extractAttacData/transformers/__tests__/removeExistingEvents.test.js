import removeExistingEvents from '../removeExistingEvents.js';
import { expect, it, describe } from 'vitest';

describe('remove existing events', () => {
  it('should remove events that are already in the valid events list', () => {
    expect(removeExistingEvents([{
      id: 'existing',
    }], [], [{
      id: 'existing',
    },
      {
        id: 'new',
      }])).toEqual([{
      id: 'new',
      source: 'attac - TO CHECK',
    }])
  });


  it('should remove events that are already in the invalid events list', () => {
    expect(removeExistingEvents([], [{
      id: 'existing',
    }], [{
      id: 'existing',
    },
      {
        id: 'new',
      }])).toEqual([{
      id: 'new',
      source: 'attac - TO CHECK',
    }])
  });

  it('should not remove events that are not in the lists', () => {
    expect(removeExistingEvents([], [], [{
      id: 'existing',
    },
      {
        id: 'new',
      }])).toEqual([{
      id: 'existing',
      source: 'attac - TO CHECK',
    },{
      id: 'new',
      source: 'attac - TO CHECK',
    }])
  });
});