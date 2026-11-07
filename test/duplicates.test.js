const test = require('node:test');
const assert = require('node:assert/strict');
const { isDuplicate } = require('../tools/duplicates');

test('returns false when page titles are different', () => {
  assert.strictEqual(
    isDuplicate({ title: 'Page A' }, { title: 'Page B' }),
    false
  );
});

test('returns true when page titles are the same', () => {
  assert.strictEqual(
    isDuplicate({ title: 'Home' }, { title: 'Home' }),
    true
  );
});
