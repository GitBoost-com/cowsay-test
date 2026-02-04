const test = require('tape');
const cowsay = require('../index');

test('say returns a string with the default cow', (t) => {
	t.plan(2);

	const result = cowsay.say({ text: 'Hello', _: [] });
	t.ok(typeof result === 'string');
	t.ok(result.includes('Hello'));
});

test('think returns a string with thought bubble', (t) => {
	t.plan(2);

	const result = cowsay.think({ text: 'Hello', _: [] });
	t.ok(typeof result === 'string');
	t.ok(result.includes('Hello'));
});

test('say uses text from _ array when text is not provided', (t) => {
	t.plan(1);

	const result = cowsay.say({ _: ['word1', 'word2'] });
	t.ok(result.includes('word1 word2'));
});

test('say with a named cow file', (t) => {
	t.plan(1);

	const result = cowsay.say({ text: 'Moo', f: 'tux', _: [] });
	t.ok(result.includes('Moo'));
});

test('say with a mode', (t) => {
	t.plan(1);

	const result = cowsay.say({ text: 'Greedy', g: true, _: [] });
	t.ok(result.includes('$$'));
});

test('say with nowrap option', (t) => {
	t.plan(1);

	const result = cowsay.say({ text: 'No wrap', n: true, W: 40, _: [] });
	t.ok(result.includes('No wrap'));
});

test('list returns a promise with cow names', (t) => {
	t.plan(2);

	cowsay.list().then((names) => {
		t.ok(Array.isArray(names));
		t.ok(names.includes('default'));
	});
});

test('list also works with callback', (t) => {
	t.plan(2);

	cowsay.list((err, names) => {
		t.equal(err, null);
		t.ok(names.includes('default'));
	});
});

test('say works without _ property (programmatic API)', (t) => {
	t.plan(1);

	const result = cowsay.say({ text: 'Hello' });
	t.ok(result.includes('Hello'));
});

test('say falls back to empty string when no text or _ provided', (t) => {
	t.plan(1);

	const result = cowsay.say({ _: [] });
	t.equal(typeof result, 'string');
});

test('think uses "o" for thought bubble', (t) => {
	t.plan(1);

	const result = cowsay.think({ text: 'Thinking', _: [] });
	t.ok(result.includes('o'));
});

test('say uses backslash for speech bubble', (t) => {
	t.plan(1);

	const result = cowsay.say({ text: 'Saying', _: [] });
	t.ok(result.includes('\\'));
});

test('listSync returns same names as list', (t) => {
	t.plan(1);

	const syncNames = cowsay.listSync();
	cowsay.list().then((asyncNames) => {
		t.deepEqual(syncNames, asyncNames);
	});
});
