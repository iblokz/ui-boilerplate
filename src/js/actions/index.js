'use strict';

// lib
const Rx = require('rx');
const $ = Rx.Observable;
const {Subject} = Rx;

// stream
const stream = new Subject();

// initial
const initial = {
	number: 0
};

// actions
const set = number => stream.onNext(state => Object.assign({}, state, {number}));
const incr = () => stream.onNext(state => Object.assign({}, state, {number: state.number + 1}));
const decr = () => stream.onNext(state => Object.assign({}, state, {number: state.number - 1}));

module.exports = {
	stream,
	initial,
	set,
	incr,
	decr
};
