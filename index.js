
/**
 * Set / get caret position with `el`.
 *
 * @param {Element} el
 * @param {Number} at
 * @param {Number} end
 * @return {Number}
 * @api private
 */

function position(el, at){
  if (1 == arguments.length) {
    var range = window.getSelection().getRangeAt(0);
    var clone = range.cloneRange();
    clone.selectNodeContents(el);
    clone.setEnd(range.endContainer, range.endOffset);
    var end = clone.toString().length;
    clone.setStart(range.startContainer, range.startOffset);
    var start = end - clone.toString().length;
    return { start: start, end: end };
  }

  var length = 0;
  var abort;
  var sel = document.getSelection();
  var range = document.createRange();
  var sub;
  var slen;
  var hasSelection = !(at.start === at.end);

  visit(el, function(node){
    if (3 != node.nodeType) return;
    length += node.textContent.length;

    // If we have a selection, then we need to set the
    // start position for the correct node. 
  
    if (hasSelection && length >= at.start){
      sub = length - node.textContent.length;
      slen = at.start - sub;
      if (slen > 0) {
        range.setStart(node, slen);
      }
    }

    // we always have an end position, represting
    // either the end of the selection, or the current
    // cursor position. 
  
    if (length >= at.end){
      if (abort) return;
      abort = true;
      sub = length - node.textContent.length;
      if (!hasSelection){
        range.setStart(node, at.end - sub);
      }
      range.setEnd(node, at.end - sub);
      sel.removeAllRanges();
      sel.addRange(range);
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
