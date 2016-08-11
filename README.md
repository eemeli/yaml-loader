# yaml-loader for webpack

YAML loader for [webpack](http://webpack.github.io/). Converts YAML to a valid JSON. If you want a JS Object, chain it with [json-loader](https://github.com/webpack/json-loader).

## Installation

`npm install yaml-loader`

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

Simplest case would be:

``` javascript
var json = require("json-loader!yaml-loader!./file.yml");
// => returns file.yml as javascript object
```

This loader is also useful for getting a valid JSON from YML. For example:

```js
// webpack.config.js
module: {
  loaders: [
    {
      test: /\.yaml$/,
      include: path.resolve('data'),
      loader: 'yaml',
    },
  ],
}
```

and then

```js
// application.js
const actualFilename = require(`file?name=[name].json!./../data/${file}.yaml`);
window.fetch(actualFilename).then(res => {
  // ...
});
```

You can also returns only a part of the yaml file. For example with this yaml file:

```yaml
---
config:
  js:
    key: test
hello: world
```

If you only want the *config.js* part, you can use the param namespace:

```js
let config  = require("!json!yaml?namespace=config.js!my_file.yaml");
```

The namespace param is a serie of keys, dot separated.

## License

MIT (http://www.opensource.org/licenses/mit-license.php)

