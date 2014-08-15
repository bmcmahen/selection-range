
# selection-range

  Get or set the selection range, or cursor position. Useful for saving and restoring selections when your are programatically changing the dom.

## Installation

    $ component install bmcmahen/selection-range
    $ npm install selection-range

## Usage

```javascript
var select = require('selection-range');
select(el, { start: 5, end: 25 }); // select range of el from 5 - 25
select(el, { start: 5 }); // set the cursor at 5
var pos = select(el); // get range of selection
// pos.start = start index
// pos.end = end index
// pos.atStart = boolean. true if cursor should appear at start of el
// pos = undefined if no cursor
select(el, pos);
```

## Tests

```
npm install component-test -g
component test browser
```

## License

  MIT
