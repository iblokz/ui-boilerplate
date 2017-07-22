'use strict';

// dom
const {
	h1, a, div,
	section, button, span
} = require('iblokz-snabbdom-helpers');
// components
const counter = require('./counter');

module.exports = ({state, actions}) => section('#ui', [
	h1('UI Boilerplate'),
	counter({state, actions})
]);
