tamagoya
--------
[![npm](https://img.shields.io/npm/v/tamagoya.svg?style=flat-square)](https://www.npmjs.org/package/tamagoya)
[![Build Status](https://img.shields.io/travis/pine/node-tamagoya/master.svg?style=flat-square)](https://travis-ci.org/pine/node-tamagoya)
[![Code Climate](https://img.shields.io/codeclimate/github/pine/node-tamagoya.svg?style=flat-square)](https://codeclimate.com/github/pine/node-tamagoya)
[![Dependency Status](https://img.shields.io/david/pine/node-tamagoya.svg?style=flat-square)](https://david-dm.org/pine/node-tamagoya)
[![devDependency Status](https://img.shields.io/david/dev/pine/node-tamagoya.svg?style=flat-square)](https://david-dm.org/pine/node-tamagoya#info=devDependencies) [![Greenkeeper badge](https://badges.greenkeeper.io/pine/node-tamagoya.svg)](https://greenkeeper.io/)

Fetching [Tamagoya](http://www.tamagoya.co.jp/) menus of this week.

## Getting Started

```
$ npm install --save tamagoya
```

## Usage

```js
const tamagoya = require('tamagoya');

tamagoya.then(function (menus) {
  menus.forEach(function (menu) {
    console.log(menu);
  });
});
```

## License
Public Domain
