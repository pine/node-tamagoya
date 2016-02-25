tamagoya [![Build Status](https://img.shields.io/travis/pine613/node-tamagoya/master.svg?style=flat-square)](https://travis-ci.org/pine613/node-tamagoya)
--------

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
