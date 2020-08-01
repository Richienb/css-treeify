"use strict"

const { parse: parseCSS } = require("css")
const { merge, fromPairs: fromEntries } = require("lodash")

/**
Convert an array of properties and values to an object.
@example
```
pickToObject([
	{name: "a", value: "b"},
	[name: "c", value: "d"]
], "name", "value");
/* => {
	a: "b",
	c: "d"
} *\/
```
*/
const pickToObject = (array, key, value) => fromEntries(array.map(entry => [entry[key], entry[value]]))

const parseSelectors = (selectors, declarations) => fromEntries(selectors.map(selector => [selector, pickToObject(declarations, "property", "value")]))

module.exports = css => {
	if (typeof css !== "string") {
		throw new TypeError(`Expected a string, got ${typeof css}`)
	}

	return merge(...parseCSS(css).stylesheet.rules.map(({
		declarations,
		selectors,
		type,
		media,
		rules
	}) => {
		if (type === "rule") {
			return parseSelectors(selectors, declarations)
		}

		if (type === "media") {
			return {
				[`@media: ${media}`]: merge(...rules.map(({
					selectors,
					declarations
				}) => parseSelectors(selectors, declarations)))
			}
		}

		return undefined
	}))
}
