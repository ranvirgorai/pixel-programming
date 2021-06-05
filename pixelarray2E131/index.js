// index.js

var PixelArray2E131 = require("./lib/PixelArray2E131.js");

PixelArray2E131.mapping = {
	rows : require("./lib/mapping/rows.js"),
	snake : require("./lib/mapping/snake.js"),
	flipDiagonalFunction : require("./lib/mapping/flipDiagonalFunction.js"),
	gryCols : require("./lib/mapping/grycols.js")
};

module.exports = PixelArray2E131;
