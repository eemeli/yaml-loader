const { getOptions } = require('loader-utils')
const { stringify } = require('javascript-stringify')
const YAML = require('js-yaml')

const makeIdIterator = (prefix = 'v', i = 1) => ({ next: () => prefix + i++ })

module.exports = function yamlLoader(src) {
  const { asJSON, asStream, namespace, ...options } = Object.assign(
    { prettyErrors: true },
    getOptions(this)
  )

  // keep track of repeated object references
  const refs = new Map()
  const idIter = makeIdIterator()
  function addRef(ref, count) {
    if (ref && typeof ref === 'object' && count > 1)
      refs.set(ref, { id: idIter.next(), seen: false })
  }
  const stringifyWithRefs = (value) =>
    stringify(value, (value, space, next) => {
      const v = refs.get(value)
      if (v) {
        if (v.seen) return v.id
        v.seen = true
      }
      return next(value)
    })

  options['onWarning'] = options['onWarning'] || this.emitWarning
  let res
  if (asStream) {
    const stream = YAML.loadAll(src, options)
    res = []
    for (const doc of stream) {
      res.push(doc)
    }
  } else {
    res = YAML.load(src, options)
  }

  if (asJSON) return JSON.stringify(res)
  let str = ''
  for (const [obj, { id }] of refs.entries())
    str += `var ${id} = ${stringifyWithRefs(obj)};\n`
  str += `export default ${stringifyWithRefs(res)};`
  return str
}
