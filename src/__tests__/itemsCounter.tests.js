const itemsCounter = require('../__mocks__/itemsCounter');

test('should have 4 items', () => {
  const itemsArr = [{
    item_id: '50625',
  }, {
    item_id: '14012',
  }, {
    item_id: '65494',
  }, {
    item_id: '46881',
  },
  ];
  expect(itemsCounter(itemsArr)).toBe(4);
});

test('should have 0 items', () => {
  const itemsArr = null;
  expect(itemsCounter(itemsArr)).toBe(0);
});