# yaml-loader for Webpack

YAML loader for [Webpack](https://webpack.js.org/). Allows importing YAML files as JS objects. Uses [`yaml`](https://www.npmjs.com/package/yaml) internally.

## Installation

```sh
npm install --save-dev yaml-loader
```

## Usage

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.ya?ml$/,
        type: 'json', // Required by Webpack v4
        use: 'yaml-loader'
      }
    ]
  }
}
```

```yaml
# file.yaml
---
config:
  js:
    key: test
hello: world
```


```js
// application.js
import file from './file.yaml';

file.hello === 'world'
```

## Options

 In addition to all [`yaml` options](https://eemeli.org/yaml/#options), the loader supports `namespace`, which allows for exposing a sub-tree of the source document:

```js
import jsCfg from './file.yaml?namespace=config.js'

jsCfg.key === 'test'
```

The `namespace` should be a series of keys, dot separated. Note that any `options` object in your `webpack.config.js` rule will be superseded by a `?query`.


## License

[MIT](http://www.opensource.org/licenses/mit-license.php)

