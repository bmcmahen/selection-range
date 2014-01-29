var iterator = require('dom-iterator');
var selection = window.getSelection();

module.exports = position;

function position(el, start, end){

  // get our current range
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

  // set a selection or cursor position.
  var setSelection = arguments.length === 3;
  var length = 0;
  var abort;
  var ranger = document.createRange();

  var it = iterator(el).filter(Node.TEXT_NODE);
  var next;
  while (next = it.next()){
    if (higher(next, el)) break;
    var textLength = next.textContent.length;
    length += textLength;
    var sub = length - textLength;

    // If we have a selection, then set the start position
    // for the correct next.
    
    if (setSelection && length >= start) {
      var slen = start - sub;
      if (slen > 0) {
        ranger.setStart(next, slen);
      }
    }

    // If we don't have a selection, we need to set the
    // start and end of the range to the start index.
    if (length >= (end || start)){
      if (!setSelection) {
        ranger.setStart(next, start - sub);
        ranger.collapse();
      } else {
        ranger.setEnd(next, end - sub);
      }

      el.focus();
      selection.removeAllRanges();
      selection.addRange(ranger);
      break;
    }
  }
}

function higher(node, root){
  return !root.contains(node);
}