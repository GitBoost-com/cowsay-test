const modes = {
	"b" : {
		eyes : "==",
		tongue : "  "
	},
	"d" : {
		eyes : "xx",
		tongue : "U "
	},
	"g" : {
		eyes : "$$",
		tongue : "  "
	},
	"p" : {
		eyes : "@@",
		tongue : "  "
	},
	"s" : {
		eyes : "**",
		tongue : "U "
	},
	"t" : {
		eyes : "--",
		tongue : "  "
	},
	"w" : {
		eyes : "OO",
		tongue : "  "
	},
	"y" : {
		eyes : "..",
		tongue : "  "
	}
};

module.exports = function (options) {
	const modeKeys = Object.keys(modes);
	for (let i = 0; i < modeKeys.length; i++) {
		const key = modeKeys[i];
		if (options[key] === true) {
			return modes[key];
		}
	}

	return {
		eyes : options.e || "oo",
		tongue : options.T || "  "
	};
};
