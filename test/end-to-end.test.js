const fs = require('fs')
const { Volume } = require('memfs')
const { Union } = require('unionfs')
const webpack = require('webpack')

describe('end-to-end', (done) => {
  test('default options', (done) => {
    const input = Volume.fromJSON({
      '/file.cjs': `\
const file = require('./file.yaml')
spy(file.default.hello)
`,
      '/file.mjs': `\
import file from './file.yaml'
spy(file.hello)
`,
      '/file.yaml': `hello: world`
    })

    const compiler = webpack({
      entry: { cjs: '/file.cjs', mjs: '/file.mjs' },
      output: { path: '/dist' },
      module: { rules: [{ test: /\.ya?ml$/, loader: './index.js' }] }
    })
    compiler.inputFileSystem = new Union().use(input).use(fs)
    compiler.outputFileSystem = new Volume()

    compiler.run((err, stats) => {
      try {
        if (err) throw err
        if (stats.hasErrors()) throw stats.compilation.errors
        const spy = jest.fn()
        const output = compiler.outputFileSystem.toJSON()
        new Function('spy', output['/dist/cjs.js'])(spy)
        new Function('spy', output['/dist/mjs.js'])(spy)
        expect(spy.mock.calls).toEqual([['world'], ['world']])
        done()
      } catch (err) {
        done(err)
      }
    })
  })

  test('asJSON: true', (done) => {
    const input = Volume.fromJSON({
      '/file.cjs': `\
const file = require('./file.yaml')
spy(file.hello)
`,
      '/file.mjs': `\
import file from './file.yaml'
spy(file.hello)
`,
      '/file.yaml': `hello: world`
    })

    const compiler = webpack({
      entry: { cjs: '/file.cjs', mjs: '/file.mjs' },
      output: { path: '/dist' },
      module: {
        rules: [
          {
            test: /\.ya?ml$/,
            loader: './index.js',
            options: { asJSON: true },
            type: 'json'
          }
        ]
      }
    })
    compiler.inputFileSystem = new Union().use(input).use(fs)
    compiler.outputFileSystem = new Volume()

    compiler.run((err, stats) => {
      try {
        if (err) throw err
        if (stats.hasErrors()) throw stats.compilation.errors
        const spy = jest.fn()
        const output = compiler.outputFileSystem.toJSON()
        new Function('spy', output['/dist/cjs.js'])(spy)
        new Function('spy', output['/dist/mjs.js'])(spy)
        expect(spy.mock.calls).toEqual([['world'], ['world']])
        done()
      } catch (err) {
        done(err)
      }
    })
  })

  test('asStream: true', (done) => {
    const input = Volume.fromJSON({
      '/file.cjs': `\
const file = require('./file.yaml')
spy(file.default[0].hello)
`,
      '/file.mjs': `\
import file from './file.yaml'
spy(file[0].hello)
`,
      '/file.yaml': `hello: world`
    })

    const compiler = webpack({
      entry: { cjs: '/file.cjs', mjs: '/file.mjs' },
      output: { path: '/dist' },
      module: {
        rules: [
          {
            test: /\.ya?ml$/,
            loader: './index.js',
            options: { asStream: true }
          }
        ]
      }
    })
    compiler.inputFileSystem = new Union().use(input).use(fs)
    compiler.outputFileSystem = new Volume()

    compiler.run((err, stats) => {
      try {
        if (err) throw err
        if (stats.hasErrors()) throw stats.compilation.errors
        const spy = jest.fn()
        const output = compiler.outputFileSystem.toJSON()
        new Function('spy', output['/dist/cjs.js'])(spy)
        new Function('spy', output['/dist/mjs.js'])(spy)
        expect(spy.mock.calls).toEqual([['world'], ['world']])
        done()
      } catch (err) {
        done(err)
      }
    })
  })
})
