'use strict';

// lib
const vdom = require('iblokz/adapters/vdom');

// app
let actions = require('./actions');
let ui = require('./ui');

// hot reloading

// actions -> state
const state$ = actions.stream
	.startWith(() => actions.initial)
	.scan((state, change) => change(state), {})
	.map(state => (console.log(state), state))
	.share();

// state -> ui
const ui$ = state$.map(state => ui({state, actions}));
vdom.patchStream(ui$, '#ui');
