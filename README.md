tamagoya
--------

## Usage

```js
var tamagoya = require('tamagoya');

tamagoya(function (err, menus) {
  if (err) { return console.error(err); }

  for (var i = 0; i < menus.length; ++i) {
    console.log(menus[i]);
  }
});
```

## License
Public Domain
