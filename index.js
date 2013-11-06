
/**
 * Set / get caret position with `el`.
 *
 * @param {Element} el
 * @param {Number} at
 * @param {Number} end
 * @return {Number}
 * @api private
 */

function position(el, start, end){
  var selection = window.getSelection();

  // get our current range
  if (1 == arguments.length) {
    if (!selection.rangeCount) return;
    var range = selection.getRangeAt(0);
    var clone = range.cloneRange();
    clone.selectNodeContents(el);
    clone.setEnd(range.endContainer, range.endOffset);
    var indexes = { end : clone.toString().length };
    clone.setStart(range.startContainer, range.startOffset);
    indexes.start = indexes.end - clone.toString().length;
    return indexes;
  }

  // set a selection or cursor position.
  var hasSelection = arguments.length == 3;
  var length = 0;
  var abort;
  var ranger = document.createRange();

  visit(el, function(node){
    if (3 != node.nodeType) return;
    var textLength = node.textContent.length;
    length += textLength;
    var sub = length - textLength;

    // If we have a selection, then we need to set the
    // start position for the correct node. 
  
    if (hasSelection && length >= start){
      var slen = start - sub;
      if (slen > 0) {
        ranger.setStart(node, slen);
      }
    }

    // if we don't have a selection, we need to
    // set the start and end of the range to the 
    // start index.
  
    if (length >= (end || start)){
      if (abort) return;
      abort = true;
      if (!hasSelection){
        ranger.setStart(node, start - sub);
        ranger.setEnd(node, start - sub);
      } else {
        ranger.setEnd(node, end - sub);
      }

      el.focus(); // necessary for firefox
      selection.removeAllRanges();
      selection.addRange(ranger);
      return true;
    }
  });
}

module.exports = position;

/**
 * Walk all text nodes of `node`.
 *
 * @param {Element|Node} node
 * @param {Function} fn
 * @api private
 */

function visit(node, fn){
  var nodes = node.childNodes;
  for (var i = 0; i < nodes.length; ++i) {
    if (fn(nodes[i])) break;
    visit(nodes[i], fn);
  }
}
