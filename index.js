/**
 * Module Dependencies
 */

var iterator = require('dom-iterator');
var selection = window.getSelection();

/**
 * Expose position fn
 */

module.exports = position;

/**
 * Get or set cursor, selection, relative to
 * an element.
 *
 * @param  {Element} el
 * @param  {Object} pos selection range
 * @return {Object|Undefined}
 */

function position(el, pos){

  /**
   * Get cursor or selection position
   */

  if (1 == arguments.length) {
    if (!selection.rangeCount) return;
    var indexes = {};
    var range = selection.getRangeAt(0);
    var clone = range.cloneRange();
    clone.selectNodeContents(el);
    clone.setEnd(range.endContainer, range.endOffset);
    indexes.end = clone.toString().length;
    clone.setStart(range.startContainer, range.startOffset);
    indexes.start = indexes.end - clone.toString().length;
    indexes.atStart = clone.startOffset === 0;
    return indexes;
  }

  /**
   * Set cursor or selection position
   */

  var setSelection = pos.end && (pos.end !== pos.start);
  var length = 0;
  var range = document.createRange();
  var it = iterator(el).select(Node.TEXT_NODE).revisit(false);
  var next;
  var startindex;
  var start = pos.start > el.textContent.length ? el.textContent.length : pos.start;
  var end = pos.end > el.textContent.length ? el.textContent.length : pos.end;
  var atStart = pos.atStart;

  while (next = it.next()){
    var olen = length;
    length += next.textContent.length;

    // Set start point of selection
    var atLength = atStart ? length > start : length >= start;
    if (!startindex && atLength) {
      startindex = true;
      range.setStart(next, start - olen);
      if (!setSelection) {
        range.collapse(true);
        makeSelection(el, range);
        break;
      }
    }

    // Set end point of selection
    if (setSelection && (length >= end)) {
      range.setEnd(next, end - olen);
      makeSelection(el, range);
      break;
    }
  }
}

/**
 * add selection / insert cursor.
 *
 * @param  {Element} el
 * @param  {Range} range
 */

function makeSelection(el, range){
  el.focus();
  selection.removeAllRanges();
  selection.addRange(range);
}
