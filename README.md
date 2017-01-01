# UI Boilerplate
A demo app that showcases my latest approach to front-end app architecture
and would serve as a starting point for new apps.

## Features
- purely npm based dependency management, task automation and asset pipeline
- hot module replacement and css livereload
- frp based architecture with redux like state machine and virtual dom
- modeled in a way that is as close as possible to the way you might explain it
- actions -> state -> ui

```js
// user takes actions that change the state
const state$ = actions$.scan((state, change) => change(state));
```

## This README
In this README I've provided sufficient steps so that you can set this app from scratch.
Though it might not be synced with it's latest state.

I intend to expand it further with explanations and documentation.

## Quick Start
```sh
# clone the repo, install the dependencies and start the build and watch tasks
git clone https://github.com/iblokz/ui-boilerplate.git ui-boilerplate && cd $_ && npm i && npm start
```

## From Scratch

### Notes
You can install and use `tree` to preview changes you make to the file structure
```sh
# show all files, 3 levels deep, directories first, ignore ".git" dir
tree -a -L 3 --dirsfirst -I ".git"
```

### Init Project
```sh
npm init && git init
```

### Initial Directory Structure
```sh
mkdir -p ./{bin,src/{js,sass,assets},dist/{js,css},lib}
```
```
.
├── bin
├── dist
│   ├── css
│   └── js
├── lib
├── package.json
└── src
    ├── assets
    ├── js
    └── sass
```

### Initial Files
```sh
touch bin/{move-assets.js,sass-paths.js}
touch dist/index.html
touch src/{js/index.js,sass/style.sass}
touch ./{.editorconfig,.eslintrc.json,.gitignore}
```
```
.
├── bin
│   ├── move-assets.js
│   └── sass-paths.js
├── dist
│   ├── css
│   ├── js
│   └── index.html
├── lib
├── src
│   ├── assets
│   ├── js
│   │   └── index.js
│   └── sass
│       └── style.sass
├── .editorconfig
├── .eslintrc.json
├── .gitignore
└── package.json
```

### Files Content
*bin/move-assets.js*
```js
'use strict';

const fse = require('fs-extra');
const path = require('path');

const paths = {
	'dist/fonts': 'node_modules/font-awesome/fonts',
	'dist/assets': 'src/assets'
};

Object.keys(paths).forEach(
	p => fse.copySync(
		path.resolve(__dirname, '..', paths[p]),
		path.resolve(__dirname, '..', p)
	)
);
```
*bin/sass-paths.js*
```js
'use strict';

const path = require('path');

const paths = [].concat(
	require('bourbon').includePaths,
	require('bourbon-neat').includePaths,
	path.resolve(__dirname, '..', 'node_modules/font-awesome/scss')
);

process.stdout.write(paths.join(':'));
```
*dist/index.html*
```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>Hot Reloading</title>
		<link rel="stylesheet" href="css/style.css">
	</head>
	<body>
		<section id="ui"></section>
		<script src="js/app.js"></script>
	</body>
</html>
```
*.editorconfig*
```sh
# ref: http://editorconfig.org/
# plugin: https://github.com/sindresorhus/atom-editorconfig

root = true

[*]
end_of_line = lf
insert_final_newline = true
charset = utf-8
indent_style = tab
```
*.eslintrc.json*
```json
{
	"env": {
		"es6": true,
		"browser": true,
		"node": true
	},
	"extends": "google",
	"rules": {
		"indent": ["error", "tab", {"SwitchCase": 1}],
		"max-len": ["warn", 120, {"tabWidth": 2}],
		"no-nested-ternary": 0,
		"operator-linebreak": ["error", "after", { "overrides": { "?": "before", ":": "before", "&&": "before", "||": "before" } }],
		"no-return-assign": ["error", "except-parens"],
		"no-sequences": 0,
		"dot-notation": 0,
		"no-negated-condition": 0,
		"no-unused-vars": 0
	}
}
```
*.gitignore*
```sh
node_modules
```

### Install dependencies

```sh
npm i -S font-awesome bourbon bourbon-neat snabbdom rx superagent
```

#### Dev Dependencies

```sh
npm i -D browserify watchify browserify-hmr fs-extra node-sass node-serve eslint eslint-config-google@^0.6.*
```

#### Install and link local dependecies
```sh
# when developing locally
npm link iblokz
# and/or github repo
npm i -S iblokz/iblokz
```

*package.json*
```json
...
"dependencies": {
  "bourbon": "^4.2.7",
  "bourbon-neat": "^1.8.0",
  "font-awesome": "^4.7.0",
  "iblokz": "github:iblokz/iblokz",
  "rx": "^4.1.0",
  "snabbdom": "^0.5.4",
  "superagent": "^3.3.1"
},
"devDependencies": {
  "browserify": "^13.1.1",
  "browserify-hmr": "^0.3.5",
  "eslint": "^3.12.2",
  "eslint-config-google": "^0.6.0",
  "fs-extra": "^1.0.0",
  "livereload": "^0.6.0",
  "node-sass": "^4.1.1",
  "node-serve": "0.0.3",
  "watchify": "^3.8.0"
}
...
```

### Initial App Structure

```sh
mkdir -p src/js/{ui,actions,util}
touch src/js/{ui/index.js,actions/index.js}
```
```
src/js
├── actions
│   └── index.js
├── ui
│   └── index.js
├── util
└── index.js
```

### Set up build and watch tasks
*package.json*
```
...
"scripts": {
  "prebuild": "node bin/move-assets.js",
  "build": "npm run build:js && npm run build:sass",
  "build:js": "browserify src/js/index.js -o dist/js/app.js",
  "build:sass": "node-sass --include-path=$(node bin/sass-paths.js) src/sass/style.sass dist/css/style.css",
  "watch": "npm run watch:js & npm run watch:sass & npm run livereload",
  "watch:js": "watchify -p browserify-hmr src/js/index.js -o dist/js/app.js",
  "watch:sass": "npm run build:sass -- --watch src/sass/**/*",
  "livereload": "livereload dist/**/*.css -d",
  "start": "npm run build && serve --path dist & npm run watch"
},
...
```

### Initial functionality
*src/js/index.js*
```js
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
	actions$ = $.fromEventPattern(
    h => module.hot.accept("./actions", h)
	).flatMap(() => {
		actions = require('./actions');
		return actions.stream.startWith(state => state);
	}).merge(actions.stream);
	// ui
	module.hot.accept("./ui", function() {
		ui = require('./ui');
		actions.stream.onNext(state => state);
	});
} else {
	actions$ = actions.stream;
}

// actions -> state
const state$ = actions$
	.startWith(() => actions.initial)
	.scan((state, change) => change(state), {})
	.map(state => (console.log(state), state))
	.share();

// state -> ui
const ui$ = state$.map(state => ui({state, actions}));
vdom.patchStream(ui$, '#ui');

```

*src/js/actions/index.js*
```js
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

```

*src/js/ui/index.js*
```js
'use strict';

const {section, button, span} = require('iblokz/adapters/vdom');

module.exports = ({state, actions}) => section('#ui', [
	section('.counter', [
		button({on: {click: () => actions.decr()}}, 'Decr'),
		span(`Number: ${state.number}`),
		button({on: {click: () => actions.incr()}}, 'Incr')
	])
]);
```

*src/sass/style.sass*
```sass
@import 'font-awesome'
@import 'bourbon'
@import 'neat'

body
	font-family: "Open Sans"

.counter
	height: 32px
	line-height: 32px
	> *
		height: 32px
		line-height: 32px
		display: inline-block
		font-size: 14px
		padding: 0px 10px
	button
		background: #f5f5f5
		border: 0px
		cursor: pointer
		transition: box-shadow 0.3s
		box-shadow: 1px 1px 2px #ccc
		&:hover
			box-shadow: 1px 1px 5px #aaa
```
