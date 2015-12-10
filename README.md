# LeoJs   [Demo](http://leohuiyi.github.io/leoCode.html?htmlUrl=./leoCodeDemo/leoDom/index.html&jsUrl=./leoCodeDemo/leoDom/index.js)
es6 jqlite 现代浏览器 dom操作;

## api (类似jquery API, leoDomSelector = css3选择器字符串, dom, html字符串, nodeList, domArr, 文档...)
$('selector').prop('propertyName ') => leoDom.$prop('leoDomSelector', 'propertyName');

$(selector, context) => leoDom.$({selector: 'leoDomSelector', context: 'leoDomSelector'});

##function;

util: noop, error, inArray, isNumeric, isEmptyObject, isFunction, generateId, isPlainObject, type, niq, isArray, extend, camelCase, nodeName, globalEval, isWindow, isNode, isNodeList, isXMLDoc, trim, makeArray, merge, each;

core: $id, $tag, $class, $qs, $qsa, $newHtml, $, ready, $is, $filter, $not, $find, $add, $has, $closest;

traversing: $parent, $parents, $parentsUntil, $next, $prev, $nextAll, $prevAll, $nextUntil, $prevUntil, $siblings, $children, $contents;

manipulation: $remove, $empty, $text, $clone, $append, $prepend, $before, $after, $replaceWith, $html;

attr: $prop, $removeProp, $attr, $removeAttr, $addClass, $removeClass, $toggleClass, $hasClass, $val;

css: $css, $height, $width, $outerHeight, $outerWdith, $innerHeight, $innerWidth;

data: $data, $removeData, $queue, $dequeue, $clearQueue;

offset: $offsetParent, $position, $offset;

animate: $transition;

event: $on, $off, $one, $trigger, $triggerHandler;

uiPosition: uiPosition(leoDomSelector, {
  my: ("center"), at: ("center"), of(leoDomSelector), collision:('flip'), using: (fun), within: (leoDomSelector)
})[相对另一个元素定位一个元素]
