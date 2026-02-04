module.exports = function (cow, variables) {
	const eyes = escapeRe(variables.eyes);
	const eyeL = eyes.charAt(0);
	const eyeR = eyes.charAt(1);
	const tongue = escapeRe(variables.tongue);

	if (cow.includes("$the_cow")) {
		cow = extractTheCow(cow);
	}

	// Order matters: $eyes and $tongue must be replaced before $eye,
	// otherwise $eye would match the prefix of $eyes.
	return cow
		.replace(/\$thoughts/g, variables.thoughts)
		.replace(/\$\{eyes\}/g, eyes)
		.replace(/\$\{tongue\}/g, tongue)
		.replace(/\$eyes/g, eyes)
		.replace(/\$tongue/g, tongue)
		.replace(/\$eye/, eyeL)
		.replace(/\$eye/, eyeR)
	;
};

/*
 * "$" dollar signs must be doubled before being used in a regex replace
 * This can occur in eyes or tongue.
 * For example:
 *
 * cowsay -g Moo!
 *
 * cowsay -e "\$\$" Moo!
 */
function escapeRe (s) {
	if (typeof s === "string") {
		return s.replace(/\$/g, "$$$$");
	}
	return s;
}

const COW_RE = /\$the_cow\s*=\s*<<"*EOC"*;*\n([\s\S]+)\nEOC\n/;

function extractTheCow (cow) {
	cow = cow.replace(/\r\n?|[\n\u2028\u2029]/g, "\n").replace(/^\uFEFF/, '');
	const match = COW_RE.exec(cow);

	if (!match) {
		console.error("Cannot parse cow file\n", cow);
		return cow;
	} else {
		return match[1].replace(/\\{2}/g, "\\").replace(/\\@/g, "@").replace(/\\\$/g, "$");
	}
}
