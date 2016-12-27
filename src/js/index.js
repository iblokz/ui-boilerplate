'use strict';

// lib
const Rx = require('rx');
const $ = Rx.Observable;

// iblokz
const vdom = require('iblokz/adapters/vdom');

// app
let actions = require('./actions');
let ui = require('./ui');
let actions$;

// hot reloading
if (module.hot) {
	// actions
	const reload$ = new Rx.Subject();
	module.hot.accept("./actions", function() {
		actions = require('./actions');
		reload$.onNext(actions.stream);
	});
	// ui
	module.hot.accept("./ui", function() {
		ui = require('./ui');
		actions.stream.onNext(state => state);
	});
	actions$ = $.merge(
		actions.stream.startWith(() => actions.initial),
		reload$.concatAll()
	);
} else {
	actions$ = actions.stream
		.startWith(() => actions.initial);
}

// actions -> state
const state$ = actions$
	.scan((state, change) => change(state), {})
	.map(state => (console.log(state), state))
	.share();

// state -> ui
const ui$ = state$.map(state => ui({state, actions}));
vdom.patchStream(ui$, '#ui');
