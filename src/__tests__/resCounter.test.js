const resCounter = require('../__mocks__/resCounter');

test('should have 3 comments', () => {
  const Arr = [{
    item_id: '1',
    username: 'Joe',
    reservation: 'hi',
  }, {
    item_id: '2',
    username: 'Hamid',
    reservation: 'there',
  }, {
    item_id: '3',
    username: 'Will',
    reservation: 'everyone',
  }];
  expect(resCounter(Arr)).toBe('Comments (3) by previous visitors');
});

test('should have 0 comments', () => {
  const Arr = null;
  expect(resCounter(Arr)).toBe('Comments (0) by previous visitors');
});