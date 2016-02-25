tamagoya [![Build Status](https://travis-ci.org/pine613/node-tamagoya.svg?branch=master)](https://travis-ci.org/pine613/node-tamagoya)
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
