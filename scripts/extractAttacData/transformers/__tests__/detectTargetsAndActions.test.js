import { expect, it, describe } from 'vitest'

import {detectTargets, detectActions} from '../detectTargetsAndActions.js';

describe('detecting the targets', () => {
  it('should detect the president', () => {
    expect(detectTargets([{
      description: 'Macron demission!'
    }])).toEqual([
      {
        description: 'Macron demission!',
        targets: ['PR'],
      }
    ])
  });

  it('should detect a minister', () => {
    expect(detectTargets([{
      description: 'Darmanin aimerait beaucoup devenir premier ministre!'
    }])).toEqual([
      {
        description: 'Darmanin aimerait beaucoup devenir premier ministre!',
        targets: ['ministre'],
      }
    ])
  });

  it('should detect the parliament president', () => {
    expect(detectTargets([{
      description: 'Braun-Pivet est presidente des playmobils'
    }])).toEqual([
      {
        description: 'Braun-Pivet est presidente des playmobils',
        targets: ['PAN'],
      }
    ])
  });

  it('should detect the state secretaries', () => {
    expect(detectTargets([{
      description: 'El Haïry est secretaire (d\'état)'
    }])).toEqual([
      {
        description: 'El Haïry est secretaire (d\'état)',
        targets: ['secretaire-detat'],
      }
    ])
  });

  it('should detect the delegated ministers', () => {
    expect(detectTargets([{
      description: 'Klein est ministre delégué (de classe?)'
    }])).toEqual([
      {
        description: 'Klein est ministre delégué (de classe?)',
        targets: ['ministre-delegue-e'],
      }
    ])
  });

  it('should detect the prime minister', () => {
    expect(detectTargets([{
      description: 'Borne to be wild'
    }])).toEqual([
      {
        description: 'Borne to be wild',
        targets: ['PM'],
      }
    ])
  });

  it('should detect everybody together', () => {
    expect(detectTargets([{
      description: 'Borne to be wild with Macron and Darmanin and Klein and El Haïry and Braun-Pivet and a lot of casseroles!!!'
    }])[0].targets).toEqual(['PR', 'ministre', 'PAN', 'secretaire-detat', 'ministre-delegue-e', 'PM']);
  });

  it('should not detect when a target is part of a word', () => {
    expect(detectTargets([{
      description: 'Borneo is a nice place to live'
    }])).toEqual([{
      description: 'Borneo is a nice place to live',
      targets: [],
    }]);
  });

  it('should detect when a target is the last word', () => {
    expect(detectTargets([{
      description: 'we really don\'t like Macron'
    }])).toEqual([{
      description: 'we really don\'t like Macron',
      targets: ['PR'],
    }]);
  });

  it('should ignore case', () => {
    expect(detectTargets([{
      description: 'we really don\'t like maCron'
    }])).toEqual([{
      description: 'we really don\'t like maCron',
      targets: ['PR'],
    }]);
  });

  it('should ignore special characters', () => {
    expect(detectTargets([{
      description: 'we really don\'t like Macrôn'
    }])).toEqual([{
      description: 'we really don\'t like Macrôn',
      targets: ['PR'],
    }]);
  });
});

describe('detecting the actions', () => {
  it('should detect cancelled action from the description', () => {
    expect(detectActions([{
      description: 'Annulation de la visite',
    }])).toEqual([{
      description: 'Annulation de la visite',
      actions: ['annulation'],
    }])
  });

  it('should detect cancelled action from the status', () => {
    expect(detectActions([{
      description: 'visite',
      status: 'CANCELED',
    }])).toEqual([{
      description: 'visite',
      status: 'CANCELED',
      actions: ['annulation'],
    }])
  });

  it('should detect sobriete action from the description', () => {
    expect(detectActions([{
      description: 'sobriété pour tous!',
    }])).toEqual([{
      description: 'sobriété pour tous!',
      actions: ['sobriete'],
    }])
  });

  it('should detect action-creative action from the description', () => {
    expect(detectActions([{
      description: 'Opération escargot de Bourgogne',
    }])).toEqual([{
      description: 'Opération escargot de Bourgogne',
      actions: ['action-creative'],
    }])
  });

  it('should detect manif action from the description', () => {
    expect(detectActions([{
      description: 'Mobilisation contre la reforme',
    }])).toEqual([{
      description: 'Mobilisation contre la reforme',
      actions: ['manif'],
    }])
  });

  it('should detect chahut action from the description', () => {
    expect(detectActions([{
      description: 'Casserolade pour tous!',
    }])).toEqual([{
      description: 'Casserolade pour tous!',
      actions: ['chahut'],
    }])
  });

  it('should detect all the actions together', () => {
    expect(detectActions([{
      description: 'une manifestation à base d\'opération escargot, de casserolade et de sobriété qui force une annulation!',
    }])[0].actions).toEqual(['annulation', 'sobriete', 'action-creative', 'manif', 'chahut']);
  });

  it('should not detect when an action is part of a word', () => {
    expect(detectActions([{
      description: 'une annulationade'
    }])).toEqual([{
      description: 'une annulationade',
      actions: [],
    }]);
  });

  it('should detect when an action is the last word', () => {
    expect(detectActions([{
      description: 'on veut l\'annulation'
    }])).toEqual([{
      description: 'on veut l\'annulation',
      actions: ['annulation'],
    }]);
  });

  it('should ignore case', () => {
    expect(detectActions([{
      description: 'aNNUlation'
    }])).toEqual([{
      description: 'aNNUlation',
      actions: ['annulation'],
    }]);
  });

  it('should ignore special characters', () => {
    expect(detectActions([{
      description: 'ännûlation'
    }])).toEqual([{
      description: 'ännûlation',
      actions: ['annulation'],
    }]);
  });
});