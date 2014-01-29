
# selection-range

  Get or set the selection range, or cursor position.

## Installation

  Install with [component(1)](http://component.io):

    $ component install bmcmahen/selection-range

## Usage

```javascript
position(el, 5, 25); // select range of el from 5 - 25
position(el, 5); // set the cursor at 5
var pos = position(el); // get range of selection
// pos.start = start index
// pos.end = end index
// pos = undefined if no cursor
```

## Tests

```
npm install component-test
make test
```

## License

  MIT
