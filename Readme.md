
# selection-range

  get or set the selction range, or cursor position, for contenteditable

## Installation

  Install with [component(1)](http://component.io):

    $ component install bmcmahen/selection-range

## Usage

```javascript
position(el, 5, 25); // select range of el from 0 - 20
position(el, 5); // set the cursor at 5
var pos = position(el); // get range of selection
// pos.start = start;
// pos.end = end;
```

## TODO

IE compatibility. works in firefox, chrome & safari

## Credits

based on code by yields at [yields/editable](https://github.com/yields/editable).

## License

  MIT
