'use strict';

// dom
const {section, button, span} = require('iblokz/adapters/vdom');
// components
const counter = require('./counter');

module.exports = ({state, actions}) => section('#ui', [
	counter({state, actions})
]);
