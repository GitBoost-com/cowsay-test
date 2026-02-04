const path = require("path");
const fs = require("fs");
const replacer = require("./replacer");

const renderCache = Object.create(null);
const cowsPath = path.join(__dirname, "../cows");

function cowNamesFromFiles (files) {
	return files.map((cow) => path.basename(cow, ".cow"));
}

exports.get = function get (cow) {
	let render = renderCache[cow];

	if (!render) {
		let filePath;

		if (cow.includes("/") || cow.includes("\\")) {
			filePath = cow;
		} else {
			filePath = path.join(cowsPath, cow + ".cow");
		}
		const text = fs.readFileSync(filePath, "utf-8");
		render = function (options) {
			return replacer(text, options);
		};
		renderCache[cow] = render;
	}

	return render;
};

exports.list = function list (callback) {
	return new Promise((resolve, reject) => {
		fs.readdir(cowsPath, (err, files) => {
			if (err) {
				reject(err);
				if (callback) callback(err);
			} else {
				const names = cowNamesFromFiles(files);
				resolve(names);
				if (callback) callback(null, names);
			}
		});
	});
};

exports.listSync = function listSync () {
	return cowNamesFromFiles(fs.readdirSync(cowsPath));
};
