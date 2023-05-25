//  import the counter function
import { counter } from './functions.js';

const MOCK_DATA = {
  meals:
  [
    { idMeal: 1, meal: 'Eru', ingredients: 'ingred1, ingred2, ingred3' },
    { idMeal: 2, meal: 'Ndolès', ingredients: 'ingred1, ingred2, ingred3' },
    { idMeal: 3, meal: 'Achu', ingredients: 'ingred1, ingred2, ingred3' },
    { idMeal: 4, meal: 'Koki', ingredients: 'ingred1, ingred2, ingred3' },
    { idMeal: 5, meal: 'Okok', ingredients: 'ingred1, ingred2, ingred3' },
  ],
};
const MOCK_NB_OF_ITEMS = MOCK_DATA.meals.length;
// Mock the fetch call
global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve(MOCK_DATA),
}));

describe('Testing counter function', () => {
  test('The correct number of items should be returned', async () => {
    const nbOfItems = await counter();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(nbOfItems).toBe(MOCK_NB_OF_ITEMS);
  });
});