const { test } = require('node:test');
const assert = require('node:assert');
const { isDuplicate } = require('../tools/duplicates');

test('matching titles are duplicates', () => {
  assert.strictEqual(
    isDuplicate({ title: 'Home' }, { title: 'Home' }),
    true
  );
});

test('different titles are not duplicates', () => {
  assert.strictEqual(
    isDuplicate({ title: 'Home' }, { title: 'About' }),
    false
  );
});

test('missing pages are not duplicates', () => {
  assert.strictEqual(isDuplicate(null, { title: 'Home' }), false);
});
