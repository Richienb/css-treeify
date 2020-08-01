const test = require("ava")
const cssTreeify = require(".")

test("main", t => {
	t.deepEqual(cssTreeify(`
body { font-size: 10px; font: Arial; }
html { font-size: 11px; }
html, body { font-size: 12px; }
@media only screen and (max-width: 600px) {
  body {
    background-color: lightblue;
  }
  html {
		background-color: grey;
		color: orange;
  }
}
`), {
		"@media: only screen and (max-width: 600px)": {
			body: {
				"background-color": "lightblue"
			},
			html: {
				"background-color": "grey",
				color: "orange"
			}
		},
		body: {
			"font-size": "12px",
			font: "Arial"
		},
		html: {
			"font-size": "12px"
		}
	})
})
