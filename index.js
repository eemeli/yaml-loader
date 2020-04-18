const loaderUtils = require('loader-utils')
const { stringify } = require('javascript-stringify')
const YAML = require('yaml')

module.exports = function yamlLoader(src) {
  const { asJSON, asStream, namespace, ...options } = Object.assign(
    { prettyErrors: true },
    loaderUtils.getOptions(this)
  )

  let res
  if (asStream) {
    const stream = YAML.parseAllDocuments(src, options)
    res = []
    for (const doc of stream) {
      for (const warn of doc.warnings) this.emitWarning(warn)
      for (const err of doc.errors) throw err
      res.push(doc.toJSON())
    }
  } else {
    const doc = YAML.parseDocument(src, options)
    for (const warn of doc.warnings) this.emitWarning(warn)
    for (const err of doc.errors) throw err
    if (namespace) doc.contents = doc.getIn(namespace.split('.'))
    res = doc.toJSON()
  }

  if (asJSON) return JSON.stringify(res)
  const str = stringify(res)
  return `export default ${str};`
}
