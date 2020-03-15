var loaderUtils = require('loader-utils')
var YAML = require('yaml')

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
    res = YAML.parse(src, options)
    if (namespace) {
      res = namespace.split('.').reduce(function(acc, name) {
        return acc[name]
      }, res)
    }
  }

  const json = JSON.stringify(res)
  return asJSON ? json : `export default ${json};`
}
