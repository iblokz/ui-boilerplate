'use strict';

// dom
const {section, button, span} = require('iblokz-snabbdom-helpers');
// components
const counter = require('./counter');

module.exports = ({state, actions}) => section('#ui', [
	counter({state, actions})
]);
