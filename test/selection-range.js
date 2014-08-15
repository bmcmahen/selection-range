var sRange = require('selection-range');
var assert = require('assert');
var domify = require('domify');
var selection = window.getSelection;

describe('selection-range', function(){
  var el;

  beforeEach(function(){
    el = domify('<div><p>hi! my name is s<strong>a<em>ll</em>y</strong>.</p><p><br> </p></div>');
    document.body.appendChild(el);
    sel = selection();
    sel.removeAllRanges();
  });

  afterEach(function(){
    document.body.removeChild(el);
  });

  it('should handle empty spaces', function () {
    sRange(el, el.textContent.length - 1);
    var r = sRange(el);
    assert(r.start === el.textContent.length - 1);
    assert(r.end === el.textContent.length - 1);
  });

  it('should get the proper ranges for selection', function(){
    sRange(el, { start: 5, end: 10});
    var r = sRange(el);
    assert(r.start === 5);
    assert(r.end === 10);
  });

  it('should get the proper ranges for cursor', function(){
    sRange(el, 0);
    var r = sRange(el);
    assert(r.start === 0);
    assert(r.end === 0);
  });

  it('should set cursor to specific spot', function(){
    sRange(el, { start: 0 });
    var r = sRange(el);
    assert(r.start === 0);
    assert(r.end === 0);
  });

  it('should set selection', function(){
    var pos = { start: 10, end: 15 };
    sRange(el, pos);
    var r = sRange(el);
    assert(r.start === 10);
    assert(r.end === 15);
    var str = selection().toString();
    assert(str == 'e is ');
  });


});

function selectAt(elem, str) {
  var range = document.createRange();
  var i = elem.textContent.indexOf(str);

  // set to end
  if (~i) i++;
  else throw new Error('selectAt: unable to select');

  range.setStart(elem.firstChild, i);
  range.setEnd(elem.firstChild, i);
  sel.addRange(range);
}
