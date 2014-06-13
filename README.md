# yaml-loader for webpack

YAML loader for [webpack](http://webpack.github.io/). Converts YAML to JSON. You should chain it with [json-loader](https://github.com/webpack/json-loader).

## Installation

`npm install yml-loader`

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

``` javascript
var json = require("yml!./file.yml");
// => returns json from file.yml. Pass it to json-loader to obtain the Native Object
```

## License

MIT (http://www.opensource.org/licenses/mit-license.php)

