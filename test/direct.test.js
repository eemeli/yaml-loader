const loader = require('..')

describe('aliased objects', () => {
  test('single document', () => {
    const ctx = { getOptions: () => ({}) }
    const src = 'foo: &foo [&val foo]\nbar: *foo'
    const res = loader.call(ctx, src)
    expect(res).toBe("var v1 = ['foo'];\nexport default {foo:v1,bar:v1};")
  })

  test('document stream', () => {
    const ctx = { getOptions: () => ({ asStream: true }) }
    const src = 'foo: &foo [foo]\nbar: *foo\n---\nfoo: &foo [foo]\nbar: *foo'
    const res = loader.call(ctx, src)
    expect(res).toBe(
      "var v1 = ['foo'];\nvar v2 = ['foo'];\nexport default [{foo:v1,bar:v1},{foo:v2,bar:v2}];"
    )
  })
})

describe('options.asJSON', () => {
  test('return stringify version of the yaml file', () => {
    const ctx = { getOptions: () => ({ asJSON: true }) }
    const src = '---\nhello: world'
    const res = loader.call(ctx, src)
    expect(res).toBe('{"hello":"world"}')
  })

  test('throw error if there is a parse error', () => {
    const ctx = { getOptions: () => ({ asJSON: true }) }
    const src = '---\nhello: world\nhello: 2'
    expect(() => loader.call(ctx, src)).toThrow(/Map keys must be unique/)
  })
})

describe('options.namespace', () => {
  test('return a part of the yaml', () => {
    const ctx = { getOptions: () => ({ namespace: 'hello' }) }
    const res = loader.call(ctx, '---\nhello:\n  world: plop')
    expect(res).toBe("export default {world:'plop'};")
  })

  test('return a sub-part of the yaml', () => {
    const ctx = { getOptions: () => ({ namespace: 'hello.world' }) }
    const res = loader.call(ctx, '---\nhello:\n  world: plop')
    expect(res).toBe("export default 'plop';")
  })
})

describe('options.asStream', () => {
  test('with asStream, parse multiple documents', () => {
    const ctx = { getOptions: () => ({ asStream: true }) }
    const src = 'hello: world\n---\nsecond: document\n'
    const res = loader.call(ctx, src)
    expect(res).toBe("export default [{hello:'world'},{second:'document'}];")
  })

  test('without asStream, fail to parse multiple documents', () => {
    const ctx = { getOptions: () => ({ asStream: false }) }
    const src = 'hello: world\n---\nsecond: document\n'
    expect(() => loader.call(ctx, src)).toThrow(/yaml-loader asStream option/)
  })
})

describe('yaml options', () => {
  test('options.intAsBigInt', () => {
    const ctx = { getOptions: () => ({ intAsBigInt: true }) }
    const res = loader.call(ctx, 'answer: 42')
    expect(res).toBe("export default {answer:BigInt('42')};")
  })

  test('options.mapAsMap', () => {
    const ctx = { getOptions: () => ({ mapAsMap: true }) }
    const res = loader.call(ctx, '---\nhello:\n  world: plop')
    expect(res).toBe(
      "export default new Map([['hello',new Map([['world','plop']])]]);"
    )
  })
})
