# CSS Treeify [![Travis CI Build Status](https://img.shields.io/travis/com/Richienb/css-treeify/master.svg?style=for-the-badge)](https://travis-ci.com/Richienb/css-treeify)

Parse the structure of CSS to an object tree.

[![NPM Badge](https://nodei.co/npm/css-treeify.png)](https://npmjs.com/package/css-treeify)

## Install

```sh
npm install css-treeify
```

## Usage

```js
const cssTreeify = require("css-treeify");

cssTreeify(`
body { font-size: 10px; }
html { font-size: 11px; }
html, body { font-size: 12px; }
@media only screen and (max-width: 600px) {
  body {
    background-color: lightblue;
  }
  html {
	  background-color: grey;
  }
}
`);
/* {
	'@media only screen and (max-width: 600px)': {
		body: {
			'background-color': 'lightblue'
		},
		html: {
			'background-color': 'grey'
		}
	},
	body: {
		'font-size': '12px'
	},
	html: {
		'font-size': '12px'
	}
}
*/
```

## API

### cssTreeify(css)

#### css

Type: `string`

The CSS to parse.
