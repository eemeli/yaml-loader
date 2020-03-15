const loader = require('../');

test('return stringify version of the yaml file', () => {
  const res = loader("---\nhello: world")
  expect(res).toBe('{\n\t"hello": "world"\n}');
});

test('throw error if there is a parse error', () => {
  let msg = null;
  try {
    loader("---\nhello: world\nhello: 2");
  } catch (error) {
    msg = error.message
  }
  expect(msg).toBe('Map keys must be unique; "hello" is repeated');
});

test('return a part of the yaml', () => {
  const ctx = { query: '?namespace=hello' };
  const res = loader.call(ctx, "---\nhello:\n  world: plop")
  expect(res).toBe('{\n\t"world": "plop"\n}');
});

test('return a sub-part of the yaml', () => {
  const ctx = { query: '?namespace=hello.world' };
  const res = loader.call(ctx, "---\nhello:\n  world: plop")
  expect(res).toBe('"plop"');
});
