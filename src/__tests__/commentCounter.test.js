const commentCounter = require('../__mocks__/commentCounter');

test('should have 3 comments', () => {
  const commentArr = [{
    item_id: '92995',
    username: 'SJA',
    comment: 'AWESOME',
  }, {
    item_id: '92995',
    username: 'SJA',
    comment: 'AWESOME',
  }, {
    item_id: '92995',
    username: 'SJA',
    comment: 'AWESOME',
  }];
  expect(commentCounter(commentArr)).toBe('Comments (3) by previous visitors');
});

test('should have 0 comments', () => {
  const commentArr = null;
  expect(commentCounter(commentArr)).toBe('Comments (0) by previous visitors');
});