## Notes
Preview command:
```sh
tree -a -L 3 --dirsfirst -I ".git"
```


## Init Project
```sh
npm init && git init
```

## Initial Directory Structure
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

## Initial Files
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

## Files Content
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

## Install dependencies

```sh
npm i -S font-awesome bourbon bourbon-neat snabbdom rx superagent
```

### Dev Dependencies

```sh
npm i -D browserify watchify browserify-hmr fs-extra node-sass node-serve eslint eslint-config-google@^0.6.*
```

### Install and link local dependecies
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

## Initial Architecture layer

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

## Set up build and watch tasks
*package.json*
```
...
"scripts": {
  "prebuild": "node bin/move-assets.js",
  "build": "npm run build:js && npm run build:sass",
  "build:js": "browserify src/js/index.js -o dist/js/app.js",
  "build:sass": "node-sass --include-path=$(node bin/sass-paths.js) src/sass/style.sass dist/css/style.css",
  "watch": "npm run watch:js & npm run watch:sass & npm run livereload",
  "watch:js": "watchify src/js/index.js -o dist/js/app.js",
  "watch:sass": "npm run build:sass -- --watch src/sass/**/*",
  "livereload": "livereload dist -e 'sass' -d",
  "start": "npm run build && serve --path dist & npm run watch"
},
...
```

## Intial functionality
