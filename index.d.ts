declare namespace cssTreeify {
	export interface Tree {
		[name: string]: {
			[name: string]: string | {
				[name: string]: string
			}
		}
	}
}

/**
Parse the structure of CSS to an object tree.
@param css The CSS to parse.
@example
```
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
*\/
```
*/
declare function cssTreeify(css: string): cssTreeify.Tree

export = cssTreeify
