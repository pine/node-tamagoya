tamagoya
--------
[![npm](https://img.shields.io/npm/v/tamagoya.svg?style=flat-square)](https://www.npmjs.org/package/tamagoya)
[![Build Status](https://img.shields.io/travis/pine613/node-tamagoya/master.svg?style=flat-square)](https://travis-ci.org/pine613/node-tamagoya)
[![Code Climate](https://img.shields.io/codeclimate/github/pine613/node-tamagoya.svg?style=flat-square)](https://codeclimate.com/github/pine613/node-tamagoya)
[![Dependency Status](https://img.shields.io/david/pine613/node-tamagoya.svg?style=flat-square)](https://david-dm.org/pine613/node-tamagoya)
[![devDependency Status](https://img.shields.io/david/dev/pine613/node-tamagoya.svg?style=flat-square)](https://david-dm.org/pine613/node-tamagoya#info=devDependencies)


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
