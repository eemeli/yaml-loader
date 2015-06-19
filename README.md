# yaml-loader for webpack

YAML loader for [webpack](http://webpack.github.io/). Converts YAML to JSON. You should chain it with [json-loader](https://github.com/webpack/json-loader).

## Installation

`npm install yaml-loader`

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

``` javascript
var json = require("json!yaml!./file.yml");
// => returns file.yml as javascript object
```

### Options

**force**
By default the YAML parser throws errors when it encounters a warning. Sometimes you want to suppress this, e.g.:

```yaml
# questionable.yml
# YAML that works, but js-yaml warns about
foo: {
    bar: true
}
```

```js
var json = require("json!yaml?force!./questionable.yml");
```

## License

MIT (http://www.opensource.org/licenses/mit-license.php)

