/**
 * Dependencies
 */

var iterator = require('dom-iterator');
var selection = window.getSelection();

/**
 * Module exports
 */

module.exports = position;

/**
 * Get or set cursor, selection, relative to 
 * an element.
 * 
 * @param  {Element} el    
 * @param  {Number} start 
 * @param  {Number} end   
 * @return {Object|Undefined}       
 */

function position(el, start, end){

  // Get our current range
  
  if (1 == arguments.length){
    if (!selection.rangeCount) return;
    var range = selection.getRangeAt(0);
    var clone = range.cloneRange();
    clone.selectNodeContents(el);
    clone.setEnd(range.endContainer, range.endOffset);
    var indexes = { end: clone.toString().length };
    clone.setStart(range.startContainer, range.startOffset);
    indexes.start = indexes.end - clone.toString().length;
    return indexes;
  }

  // Set a selection or cursor position.
  
  var setSelection = 3 === arguments.length;
  var length = 0;
  var range = document.createRange();
  var it = iterator(el).select(Node.TEXT_NODE);
  var next, startindex;
  
  while (next = it.next()){
    var olen = length;
    length += next.textContent.length;

    // If we have a selection, then set the start position
    // for the correct next.
    
    if (!startindex && (length >= start)) {
      startindex = true;
      range.setStart(next, start - olen);
      if (!setSelection) {
        range.collapse();
        makeSelection(el, range);
        break;
      }
    }

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