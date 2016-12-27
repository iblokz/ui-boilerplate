'use strict';

const {section, button, span} = require('iblokz/adapters/vdom');

module.exports = ({state, actions}) => section('#ui', [
	section('.counter', [
		button({on: {click: () => actions.decr()}}, 'Decr'),
		span(`Number: ${state.number}`),
		button({on: {click: () => actions.incr()}}, 'Incr')
	])
]);
