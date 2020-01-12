import test from "ava"
import cssTreeify from "."

test("main", (t) => {
	t.snapshot(cssTreeify(`
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
`))
})
