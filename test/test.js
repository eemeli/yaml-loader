const loader = require('../');

test('return stringify version of the yaml file', () => {
  const res = loader("---\nhello: world")
  expect(res).toBe('{"hello":"world"}');
});

test('throw error if there is a parse error', () => {
  let msg = null;
  try {
    loader("---\nhello: world\nhello: 2");
  } catch (error) {
    msg = error.message
  }
  expect(msg).toMatch(/^Map keys must be unique; "hello" is repeated/);
});

test('return a part of the yaml', () => {
  const ctx = { query: '?namespace=hello' };
  const res = loader.call(ctx, "---\nhello:\n  world: plop")
  expect(res).toBe('{"world":"plop"}');
});

test('return a sub-part of the yaml', () => {
  const ctx = { query: '?namespace=hello.world' };
  const res = loader.call(ctx, "---\nhello:\n  world: plop")
  expect(res).toBe('"plop"');
});

test('with asStream, parse multiple documents', () => {
  const ctx = { query: { asStream: true } };
  const src = "hello: world\n---\nsecond: document\n"
  const res = loader.call(ctx, src)
  expect(res).toBe('[{"hello":"world"},{"second":"document"}]')
})

test('without asStream, fail to parse multiple documents', () => {
  const ctx = { query: { asStream: false } };
  const src = "hello: world\n---\nsecond: document\n"
  expect(() => loader.call(ctx, src)).toThrow(/^Source contains multiple documents/)
})
