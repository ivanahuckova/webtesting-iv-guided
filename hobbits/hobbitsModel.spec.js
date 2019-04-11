const db = require('../data/dbConfig');
const Hobbits = require('./hobbitsModel');

describe('hobbitsModel', () => {
  beforeEach(async () => {
    await db('hobbits').truncate();
  });
  afterEach(async () => {
    await db('hobbits').truncate();
  });

  describe('inswrt', () => {
    it('inserts hobbits into db', async () => {
      const newHobbit = await Hobbits.insert({ name: 'Pippin' });
      expect(newHobbit.name).toBe('Pippin');
    });

    it('inserts 2 hobbits into db -> two records', async () => {
      const newHobbit1 = await Hobbits.insert({ name: 'Pippin' });
      const newHobbit2 = await Hobbits.insert({ name: 'Frodo' });
      const allOfThem = await db('hobbits');
      expect(allOfThem).toHaveLength(2);
    });
  });
  describe('delete', () => {
    it('deletes hobbits correctly', async () => {
      const newHobbit1 = await Hobbits.insert({ name: 'Pippin' });
      await Hobbits.insert({ name: 'Frodo' });
      const removedHobbit = await Hobbits.remove(newHobbit1.id);
      expect(removedHobbit).toBeTruthy();

      const allOfThem = await db('hobbits');
      expect(allOfThem).toHaveLength(1);
    });
  });
});
