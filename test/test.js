const loader = require('../')

describe('aliased objects', () => {
  test('single document', () => {
    const ctx = {}
    const src = 'foo: &foo [&val foo]\nbar: *foo'
    const res = loader.call(ctx, src)
    expect(res).toBe("export default {foo:['foo'],bar:['foo']};")
  })
  test('document stream', () => {
    const ctx = { query: { asStream: true } }
    const src = 'foo: &foo [foo]\nbar: *foo\n---\nfoo: &foo [foo]\nbar: *foo'
    const res = loader.call(ctx, src)
    expect(res).toBe(
      "export default [{foo:['foo'],bar:['foo']},{foo:['foo'],bar:['foo']}];"
    )
  })
})

describe('options.asJSON', () => {
  test('return stringify version of the yaml file', () => {
    const ctx = { query: { asJSON: true } }
    const src = '---\nhello: world'
    const res = loader.call(ctx, src)
    expect(res).toBe('{"hello":"world"}')
  })

  test('throw error if there is a parse error', () => {
    const ctx = { query: { asJSON: true } }
    const src = '---\nhello: world\nhello: 2'
    expect(() => loader.call(ctx, src)).toThrow(
      /^duplicated mapping key/
    )
  })

  test('parse <<: syntax', () => {
    const ctx = { query: { asJSON: true } }
    const src = '---\nhello: world\n<<:\n  test: value'
    const res = loader.call(ctx, src)
    expect(res).toBe('{"hello":"world","test":"value"}')
  })
})

describe('options.asStream', () => {
  test('with asStream, parse multiple documents', () => {
    const ctx = { query: { asStream: true } }
    const src = 'hello: world\n---\nsecond: document\n'
    const res = loader.call(ctx, src)
    expect(res).toBe("export default [{hello:'world'},{second:'document'}];")
  })

  test('without asStream, fail to parse multiple documents', () => {
    const ctx = { query: { asStream: false } }
    const src = 'hello: world\n---\nsecond: document\n'
    expect(() => loader.call(ctx, src)).toThrow(
      /^expected a single document in the stream, but found more/
    )
  })
})
