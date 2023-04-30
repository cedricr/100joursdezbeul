import { expect, it, describe } from 'vitest';

import {
	detectTargets,
	detectActions
} from 'scripts/updateData/extractAttacData/transformers/detectTargetsAndActions.js';

describe('detecting the targets', () => {
	it('should detect the president', () => {
		expect(
			detectTargets({ 'president-rep': ['macron'] }, [
				{
					description: 'Macron demission!'
				}
			])
		).toEqual([
			{
				description: 'Macron demission!',
				cibles: ['president-rep']
			}
		]);
	});

	it('should detect the president anywhere in the alias array', () => {
		expect(
			detectTargets({ 'president-rep': ['plop', 'plip', 'macron', 'plup'] }, [
				{
					description: 'Macron demission!'
				}
			])
		).toEqual([
			{
				description: 'Macron demission!',
				cibles: ['president-rep']
			}
		]);
	});

	it('should detect a minister', () => {
		expect(
			detectTargets({ ministre: ['darmanin'] }, [
				{
					description: 'Darmanin aimerait beaucoup devenir premier ministre!'
				}
			])
		).toEqual([
			{
				description: 'Darmanin aimerait beaucoup devenir premier ministre!',
				cibles: ['ministre']
			}
		]);
	});

	it('should detect the parliament president', () => {
		expect(
			detectTargets({ 'presidente-an': ['braun-pivet'] }, [
				{
					description: 'Braun-Pivet est presidente des playmobils'
				}
			])
		).toEqual([
			{
				description: 'Braun-Pivet est presidente des playmobils',
				cibles: ['presidente-an']
			}
		]);
	});

	it('should detect the state secretaries', () => {
		expect(
			detectTargets({ 'secretaire-etat': ['hairy'] }, [
				{
					description: "El Hairy est secretaire (d'état)"
				}
			])
		).toEqual([
			{
				description: "El Hairy est secretaire (d'état)",
				cibles: ['secretaire-etat']
			}
		]);
	});

	it('should detect the delegated ministers', () => {
		expect(
			detectTargets({ 'ministre-del': ['klein'] }, [
				{
					description: 'Klein est ministre delégué (de classe?)'
				}
			])
		).toEqual([
			{
				description: 'Klein est ministre delégué (de classe?)',
				cibles: ['ministre-del']
			}
		]);
	});

	it('should detect the prime minister', () => {
		expect(
			detectTargets({ 'premiere-min': ['borne'] }, [
				{
					description: 'Borne to be wild'
				}
			])
		).toEqual([
			{
				description: 'Borne to be wild',
				cibles: ['premiere-min']
			}
		]);
	});

	it('should detect everybody together', () => {
		expect(
			detectTargets(
				{
					'president-rep': ['macron'],
					ministre: ['darmanin'],
					'presidente-an': ['braun-pivet'],
					'secretaire-etat': ['hairy'],
					'ministre-del': ['klein'],
					'premiere-min': ['borne']
				},
				[
					{
						description:
							'Borne to be wild with Macron and Darmanin and Klein and El Haïry and Braun-Pivet and a lot of casseroles!!!'
					}
				]
			)[0].cibles
		).toEqual([
			'president-rep',
			'ministre',
			'presidente-an',
			'secretaire-etat',
			'ministre-del',
			'premiere-min'
		]);
	});

	it('should not detect when a target is part of a word', () => {
		expect(
			detectTargets({ 'president-rep': ['borne'] }, [
				{
					description: 'Borneo is a nice place to live'
				}
			])
		).toEqual([
			{
				description: 'Borneo is a nice place to live',
				cibles: []
			}
		]);
	});

	it('should detect when a target is the last word', () => {
		expect(
			detectTargets({ 'president-rep': ['macron'] }, [
				{
					description: "we really don't like Macron"
				}
			])
		).toEqual([
			{
				description: "we really don't like Macron",
				cibles: ['president-rep']
			}
		]);
	});

	it('should ignore case', () => {
		expect(
			detectTargets({ 'president-rep': ['macron'] }, [
				{
					description: "we really don't like maCron"
				}
			])
		).toEqual([
			{
				description: "we really don't like maCron",
				cibles: ['president-rep']
			}
		]);
	});

	it('should ignore special characters', () => {
		expect(
			detectTargets({ 'president-rep': ['macron'] }, [
				{
					description: "we really don't like Macrôn"
				}
			])
		).toEqual([
			{
				description: "we really don't like Macrôn",
				cibles: ['president-rep']
			}
		]);
	});
});

describe('detecting the actions', () => {
	it('should detect cancelled action from the description', () => {
		expect(
			detectActions({ annulation: ['annulation'] }, [
				{
					description: 'Annulation de la visite'
				}
			])
		).toEqual([
			{
				description: 'Annulation de la visite',
				actions: ['annulation']
			}
		]);
	});

	it('should detect cancelled action from the status', () => {
		expect(
			detectActions({}, [
				{
					description: 'visite',
					status: 'CANCELED'
				}
			])
		).toEqual([
			{
				description: 'visite',
				status: 'CANCELED',
				actions: ['annulation']
			}
		]);
	});

	it('should detect sobriete action from the description', () => {
		expect(
			detectActions({ sobriete: ['sobriété'] }, [
				{
					description: 'sobriété pour tous!'
				}
			])
		).toEqual([
			{
				description: 'sobriété pour tous!',
				actions: ['sobriete']
			}
		]);
	});

	it('should detect action-creative action from the description', () => {
		expect(
			detectActions({ creatif: ['opération escargot'] }, [
				{
					description: 'Opération escargot de Bourgogne'
				}
			])
		).toEqual([
			{
				description: 'Opération escargot de Bourgogne',
				actions: ['creatif']
			}
		]);
	});

	it('should detect manif action from the description', () => {
		expect(
			detectActions({ manif: ['mobilisation'] }, [
				{
					description: 'Mobilisation contre la reforme'
				}
			])
		).toEqual([
			{
				description: 'Mobilisation contre la reforme',
				actions: ['manif']
			}
		]);
	});

	it('should detect chahut action from the description', () => {
		expect(
			detectActions({ chahut: ['casserolade'] }, [
				{
					description: 'Casserolade pour tous!'
				}
			])
		).toEqual([
			{
				description: 'Casserolade pour tous!',
				actions: ['chahut']
			}
		]);
	});

	it('should detect all the actions together', () => {
		expect(
			detectActions(
				{
					annulation: ['annulation'],
					sobriete: ['sobriété'],
					creatif: ['opération escargot'],
					manif: ['manifestation'],
					chahut: ['casserolade']
				},
				[
					{
						description:
							"une manifestation à base d'opération escargot, de casserolade et de sobriété qui force une annulation!"
					}
				]
			)[0].actions
		).toEqual(['annulation', 'sobriete', 'creatif', 'manif', 'chahut']);
	});

	it('should not detect when an action is part of a word', () => {
		expect(
			detectActions({ annulation: ['annulation'] }, [
				{
					description: 'une annulationade'
				}
			])
		).toEqual([
			{
				description: 'une annulationade',
				actions: []
			}
		]);
	});

	it('should detect when an action is the last word', () => {
		expect(
			detectActions({ annulation: ['annulation'] }, [
				{
					description: "on veut l'annulation"
				}
			])
		).toEqual([
			{
				description: "on veut l'annulation",
				actions: ['annulation']
			}
		]);
	});

	it('should ignore case', () => {
		expect(
			detectActions({ annulation: ['annulation'] }, [
				{
					description: 'aNNUlation'
				}
			])
		).toEqual([
			{
				description: 'aNNUlation',
				actions: ['annulation']
			}
		]);
	});

	it('should ignore special characters', () => {
		expect(
			detectActions({ annulation: ['annulation'] }, [
				{
					description: 'ännûlation'
				}
			])
		).toEqual([
			{
				description: 'ännûlation',
				actions: ['annulation']
			}
		]);
	});
});
