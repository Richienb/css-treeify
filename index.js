"use strict"

const {
	parse: parseCSS,
} = require("css")
const _ = require("lodash")

const pickToObject = (array, ...keys) => _.fromPairs(array.map((val) => [val[keys[0]], val[keys[1]]]))

module.exports = (css) => _.merge(...parseCSS(css).stylesheet.rules.map(({
	declarations,
	selectors,
	type,
	media,
	rules,
}) => {
	if (type === "rule") return _.fromPairs(selectors.map((selector) => [selector, pickToObject(declarations, "property", "value")]))
	if (type === "media") {
		return _.fromPairs([
			[`@media ${media}`, _.merge(...rules.map(({
				selectors,
				declarations,
			}) => _.fromPairs(selectors.map((selector) => [selector, pickToObject(declarations, "property", "value")]))))],
		])
	}

	return undefined
}))
