/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(22);


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/**
	+-------------------------------------------------------------------
	* LeoJs--dom--manipulation.js
	+-------------------------------------------------------------------
	* @version    1.0.0 beta
	* @author     leo
	+-------------------------------------------------------------------
	*/

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _privateJs = __webpack_require__(3);

	var _coreJs = __webpack_require__(5);

	var _constJs = __webpack_require__(4);

	var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi;
	var rhtml = /<|&#?\w+;/;

	function domManip(targets, arg, callback) {
	    var l = targets.length;

	    if (l && arg.length) {
	        var _ret = (function () {
	            var value = arg[0];
	            if (_coreJs.leoDom.type(value) === 'function') {
	                targets.forEach(function (target, i) {
	                    arg[0] = value(target, i, target.innerHTML);
	                    domManip([target], arg, callback, targets);
	                });

	                return {
	                    v: undefined
	                };
	            }

	            var context = targets[0].ownerDocument,
	                nodes = _constJs.concat.apply([], _constJs.concat.apply([], arg).map(function (node) {
	                var value = _coreJs.leoDom.$(node);

	                if (value.length) {
	                    return value;
	                }

	                if (_coreJs.leoDom.type(node) === 'string' && !rhtml.test(node)) {
	                    return context.createTextNode(node);
	                }
	            })),
	                fragment = undefined,
	                node = undefined,
	                first = undefined;

	            if (!nodes.length) {
	                return {
	                    v: undefined
	                };
	            }

	            fragment = context.createDocumentFragment();

	            nodes.forEach(function (elem) {
	                if (elem && targets.indexOf(elem) === -1) {
	                    fragment.appendChild(elem);
	                }
	            });

	            first = fragment.firstChild;

	            if (fragment.childNodes.length === 1) {
	                fragment = first;
	            }

	            var iNoClone = l - 1;

	            if (first) {
	                targets.forEach(function (target, index) {
	                    node = fragment;

	                    if (index !== iNoClone) {
	                        node = node.cloneNode(true);
	                    }

	                    callback(target, node, index);
	                });
	            }
	        })();

	        if (typeof _ret === "object") return _ret.v;
	    }
	}

	function getAll(context, tag) {
	    var ret = typeof context.getElementsByTagName !== "undefined" ? context.getElementsByTagName(tag || "*") : typeof context.querySelectorAll !== "undefined" ? context.querySelectorAll(tag || "*") : [];

	    return tag === undefined || tag && _coreJs.leoDom.nodeName(context, tag) ? _privateJs._leoDom.merge([context], ret) : ret;
	}

	_privateJs._leoDom.setApi(_coreJs.leoDom, {
	    $remove: function $remove(selector, removeSelector) {
	        var node = undefined,
	            nodes = removeSelector ? _coreJs.leoDom.$filter(selector, removeSelector) : _coreJs.leoDom.$(selector),
	            i = 0;

	        for (; (node = nodes[i]) != null; i++) {
	            _coreJs.leoDom.cleanData && _coreJs.leoDom.cleanData(getAll(node));

	            if (node.parentNode) {
	                node.parentNode.removeChild(node);
	            }
	        }
	    },

	    $empty: function $empty(selector) {
	        selector = _coreJs.leoDom.$(selector);

	        var elem,
	            i = 0;

	        for (; (elem = selector[i]) != null; i++) {
	            if (elem.nodeType === 1) {
	                _coreJs.leoDom.cleanData && _coreJs.leoDom.cleanData(getAll(elem, false));
	                elem.textContent = "";
	            }
	        }
	    },

	    text: function text(elem) {
	        var node = undefined,
	            ret = "",
	            i = 0,
	            nodeType = elem.nodeType;

	        if (!nodeType) {
	            while (node = elem[i++]) {
	                ret += _coreJs.leoDom.text(node);
	            }
	        } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
	            return elem.textContent;
	        } else if (nodeType === 3 || nodeType === 4) {
	            return elem.nodeValue;
	        }

	        return ret;
	    },

	    $text: function $text(selector, value) {
	        selector = _coreJs.leoDom.$(selector);

	        if (value === undefined) {
	            return _coreJs.leoDom.text(selector);
	        }

	        selector.forEach(function (node, i) {
	            var val = _coreJs.leoDom.isFunction(value) ? value(node, i, selector) : value;

	            if (val !== undefined && (node.nodeType === 1 || node.nodeType === 11 || node.nodeType === 9)) {
	                _coreJs.leoDom.$empty(node);
	                node.textContent = val;
	            }
	        });
	    },

	    clone: function clone(elem, data, deepData) {
	        var i = undefined,
	            l = undefined,
	            srcElements = undefined,
	            destElements = undefined,
	            clone = elem.cloneNode(true),
	            cloneCopyEvent = _coreJs.leoDom.cloneCopyEvent;

	        if (cloneCopyEvent && data) {
	            if (deepData) {
	                srcElements = srcElements || getAll(elem);
	                destElements = destElements || getAll(clone);

	                for (i = 0, l = srcElements.length; i < l; i++) {
	                    cloneCopyEvent(srcElements[i], destElements[i]);
	                }
	            } else {
	                cloneCopyEvent(elem, clone);
	            }
	        }

	        return clone;
	    },

	    $clone: function $clone(selector, data, deepData) {
	        data = data == null ? false : data;
	        deepData = deepData == null ? data : deepData;

	        return _coreJs.leoDom.$(selector).map(function (node) {
	            return _coreJs.leoDom.clone(node, data, deepData);
	        });
	    },

	    $append: function $append(selector) {
	        for (var _len = arguments.length, arg = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	            arg[_key - 1] = arguments[_key];
	        }

	        domManip(_coreJs.leoDom.$(selector), arg, function (target, node, index) {
	            if (target.nodeType === 1 || target.nodeType === 11 || target.nodeType === 9) {
	                target.appendChild(node);
	            }
	        });
	    },

	    $prepend: function $prepend(selector) {
	        for (var _len2 = arguments.length, arg = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	            arg[_key2 - 1] = arguments[_key2];
	        }

	        domManip(_coreJs.leoDom.$(selector), arg, function (target, node, index) {
	            if (target.nodeType === 1 || target.nodeType === 11 || target.nodeType === 9) {
	                target.insertBefore(node, target.firstChild);
	            }
	        });
	    },

	    $before: function $before(selector) {
	        for (var _len3 = arguments.length, arg = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	            arg[_key3 - 1] = arguments[_key3];
	        }

	        domManip(_coreJs.leoDom.$(selector), arg, function (target, node, index) {
	            if (target.parentNode) {
	                target.parentNode.insertBefore(node, target);
	            }
	        });
	    },

	    $after: function $after(selector) {
	        for (var _len4 = arguments.length, arg = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
	            arg[_key4 - 1] = arguments[_key4];
	        }

	        domManip(_coreJs.leoDom.$(selector), arg, function (target, node, index) {
	            if (target.parentNode) {
	                target.parentNode.insertBefore(node, target.nextSibling);
	            }
	        });
	    },

	    $replaceWith: function $replaceWith(selector) {
	        for (var _len5 = arguments.length, arg = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
	            arg[_key5 - 1] = arguments[_key5];
	        }

	        domManip(_coreJs.leoDom.$(selector), arg, function (target, node, index) {
	            _coreJs.leoDom.cleanData && _coreJs.leoDom.cleanData(getAll(target));
	            var parent = target.parentNode;
	            if (parent) {
	                parent.replaceChild(node, target);
	            }
	        });
	    },

	    htmlPrefilter: function htmlPrefilter(html) {
	        return html.replace(rxhtmlTag, "<$1></$2>");
	    },

	    $html: function $html(selector, value) {
	        selector = _coreJs.leoDom.$(selector);

	        if (value === undefined) {
	            var elem = undefined;
	            if ((elem = selector[0]) && elem.nodeType === 1) {
	                return elem.innerHTML;
	            }
	        }

	        var type = _coreJs.leoDom.type(value);

	        if (type === 'function') {
	            selector.forEach(function (elem, i) {
	                var val = value(elem, i, elem.innerHTML);

	                if (_coreJs.leoDom.type(val) === 'string') {
	                    _coreJs.leoDom.cleanData && _coreJs.leoDom.cleanData(getAll(elem, false));
	                    elem.innerHTML = _coreJs.leoDom.htmlPrefilter(val);
	                }
	            });
	        } else if (type === 'string') {
	            value = _coreJs.leoDom.htmlPrefilter(value);

	            selector.forEach(function (elem) {
	                _coreJs.leoDom.cleanData && _coreJs.leoDom.cleanData(getAll(elem, false));
	                elem.innerHTML = value;
	            });
	        }
	    }
	});

	exports.leoDom = _coreJs.leoDom;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/**
	+-------------------------------------------------------------------
	* LeoJs--dom--prvate.js
	+-------------------------------------------------------------------
	* @version    1.0.0 beta
	* @author     leo
	+-------------------------------------------------------------------
	*/

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _constJs = __webpack_require__(4);

	var _leoDom = {};

	_leoDom.setApi = function () {
	    for (var _len = arguments.length, arg = Array(_len), _key = 0; _key < _len; _key++) {
	        arg[_key] = arguments[_key];
	    }

	    var target = arg[0],
	        len = arg.length;

	    if (!len) {
	        return target;
	    }

	    var i = 1,
	        options = undefined,
	        src = undefined,
	        copy = undefined;

	    for (; i < len; i++) {
	        if ((options = arg[i]) != null) {
	            for (var _name in options) {
	                src = target[_name];
	                copy = options[_name];

	                if (src === copy) {
	                    continue;
	                }

	                if (typeof src !== 'undefined') {
	                    console.warn(_name + '已经存在！');
	                }

	                target[_name] = copy;
	            }
	        }
	    }

	    return target;
	};

	var _some = _constJs.arr.some;
	var _filter = _constJs.arr.filter;
	var indexOf = _constJs.arr.indexOf;

	_leoDom.setApi(_leoDom, {
	    some: function some(elem, callback) {
	        return _some.call(elem.length ? elem : [elem], callback);
	    },

	    filter: function filter(elem, callback) {
	        return _filter.call(elem.length ? elem : [elem], callback);
	    },

	    merge: function merge(first, second) {
	        if (typeof first !== 'undefined' && typeof first.length === 'undefined') {
	            first = [first];
	        }

	        if (typeof second !== 'undefined' && typeof second.length === 'undefined') {
	            second = [second];
	        }

	        var len = +second.length,
	            j = 0,
	            i = first.length;

	        for (; j < len; j++) {
	            first[i++] = second[j];
	        }

	        first.length = i;

	        return first;
	    },

	    inArray: function inArray(elems, elem) {
	        return indexOf.call(elems.length ? elems : [elems], elem) > -1;
	    },

	    domToArr: function domToArr(elem) {
	        if (!elem) {
	            return false;
	        }

	        if (typeof elem.length === 'undefined') {
	            return [elem];
	        }

	        return _constJs.slice.call(elem);
	    }
	});

	var support = _leoDom.support = {};

	exports._leoDom = _leoDom;
	exports.support = support;

/***/ },
/* 4 */
/***/ function(module, exports) {

	/**
	+-------------------------------------------------------------------
	* LeoJs--dom--const.js
	+-------------------------------------------------------------------
	* @version    1.0.0 beta
	* @author     leo
	+-------------------------------------------------------------------
	*/

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var document = window.document;
	var documentElement = document.documentElement;
	var arr = [];
	var slice = arr.slice;
	var concat = arr.concat;
	var rnotwhite = /\S+/g;

	exports.document = document;
	exports.documentElement = documentElement;
	exports.arr = arr;
	exports.slice = slice;
	exports.concat = concat;
	exports.rnotwhite = rnotwhite;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**
	+-------------------------------------------------------------------
	* LeoJs--dom--core.js
	+-------------------------------------------------------------------
	* @version    1.0.0 beta
	* @author     leo
	+-------------------------------------------------------------------
	*/

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _privateJs = __webpack_require__(3);

	var _utilJs = __webpack_require__(6);

	var _constJs = __webpack_require__(4);

	var reSingleTag = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/;
	var rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;
	var reSimpleSelector = /^[\.#]?[\w-]*$/;
	var matches = _constJs.documentElement.matches || _constJs.documentElement.webkitMatchesSelector || _constJs.documentElement.mozMatchesSelector || _constJs.documentElement.oMatchesSelector || _constJs.documentElement.msMatchesSelector;

	var hasDuplicate = undefined;
	var readyList = [];
	var isReady = undefined;
	var fireReady = function fireReady(fn) {
	    isReady = true;

	    while (fn = readyList.shift()) {
	        fn();
	    }

	    _constJs.document.removeEventListener("DOMContentLoaded", fireReady);
	    window.removeEventListener("load", fireReady);
	};

	if (_constJs.document.readyState === "complete") {
	    setTimeout(fireReady);
	} else {
	    _constJs.document.addEventListener("DOMContentLoaded", fireReady);
	}

	window.addEventListener("load", fireReady);

	function querySelector(selector) {
	    var context = arguments.length <= 1 || arguments[1] === undefined ? _constJs.document : arguments[1];

	    var isSimpleSelector = reSimpleSelector.test(selector);

	    if (isSimpleSelector) {
	        if (selector[0] === '#') {
	            return [(context.getElementById ? context : context.ownerDocument).getElementById(selector.slice(1))];
	        }

	        if (selector[0] === '.') {
	            return _constJs.slice.call(context.getElementsByClassName(selector.slice(1)));
	        }

	        return _constJs.slice.call(context.getElementsByTagName(selector));
	    }

	    return _constJs.slice.call(context.querySelectorAll(selector));
	}

	function sortOrder(a, b) {
	    if (a === b) {
	        hasDuplicate = true;
	        return 0;
	    }

	    var compare = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition(b);

	    if (compare) {
	        if (compare & 1) {
	            if (a === _constJs.document || _utilJs.leoDom.contains(_constJs.document, a)) {
	                return -1;
	            }

	            if (b === _constJs.document || _utilJs.leoDom.contains(_constJs.document, b)) {
	                return 1;
	            }

	            return 0;
	        }

	        return compare & 4 ? -1 : 1;
	    }

	    return a.compareDocumentPosition ? -1 : 1;
	}

	_privateJs._leoDom.setApi(_utilJs.leoDom, {
	    $id: function $id(id) {
	        var context = arguments.length <= 1 || arguments[1] === undefined ? _constJs.document : arguments[1];

	        return context.getElementById(id);
	    },

	    $tag: function $tag(tagName) {
	        var context = arguments.length <= 1 || arguments[1] === undefined ? _constJs.document : arguments[1];

	        return context.getElementsByTagName(tagName);
	    },

	    $class: function $class(className) {
	        var context = arguments.length <= 1 || arguments[1] === undefined ? _constJs.document : arguments[1];

	        return context.getElementsByClassName(className);
	    },

	    $qs: function $qs(selector) {
	        var context = arguments.length <= 1 || arguments[1] === undefined ? _constJs.document : arguments[1];

	        return context.querySelector(selector);
	    },

	    $qsa: function $qsa(selector) {
	        var context = arguments.length <= 1 || arguments[1] === undefined ? _constJs.document : arguments[1];

	        return context.querySelectorAll(selector);
	    },

	    $newHtml: function $newHtml(html) {
	        var context = arguments.length <= 1 || arguments[1] === undefined ? _constJs.document : arguments[1];

	        if (typeof html !== 'string') {
	            return;
	        }

	        var _html = html.match(rquickExpr);

	        if (_html && (_html = _html[1])) {
	            if (typeof context === 'string') {
	                context = querySelector(context);
	            }

	            context[0] && (context = context[0]);
	            context = context && context.nodeType ? context.ownerDocument || context : _constJs.document;

	            if (reSingleTag.test(_html)) {
	                return [context.createElement(RegExp.$1)];
	            }

	            var domArr = [],
	                container = context.createElement('div'),
	                children = container.childNodes;

	            container.innerHTML = _html;

	            for (var i = 0, l = children.length; i < l; i++) {
	                domArr.push(container.removeChild(children[i]));
	            }

	            return domArr;
	        }
	    },

	    ready: function ready(fn) {
	        if (!isReady) {
	            readyList.push(fn);
	        } else {
	            fn();
	        }
	    },

	    $: function $(selector, context) {
	        if (_utilJs.leoDom.isPlainObject(selector)) {
	            context = selector.context;
	            selector = selector.selector;
	        }

	        if (!selector) {
	            return [];
	        }

	        if (_utilJs.leoDom.isFunction(selector)) {
	            _utilJs.leoDom.ready(selector);

	            return [];
	        }

	        if (Array.isArray(selector)) {
	            return selector;
	        }

	        if (selector.nodeType || _utilJs.leoDom.isWindow(selector)) {
	            return [selector];
	        }

	        if (selector instanceof HTMLCollection || selector instanceof NodeList) {
	            return _constJs.slice.call(selector);
	        }

	        if (typeof selector === 'string') {
	            var html = undefined;

	            if (html = _utilJs.leoDom.$newHtml(selector, context)) {
	                return html;
	            }

	            if (!context) {
	                return querySelector(selector);
	            } else {
	                if (context.nodeType === 1) {
	                    return querySelector(selector, context);
	                } else {
	                    return _utilJs.leoDom.$find(context, selector);
	                }
	            }
	        }

	        return [];
	    },

	    contains: function contains(a, b) {
	        var adown = a.nodeType === 9 ? a.documentElement : a,
	            bup = b && b.parentNode;

	        return a === bup || !!(bup && bup.nodeType === 1 && adown.contains(bup));
	    },

	    matchesSelector: function matchesSelector(element, expr) {
	        return matches.call(element, expr);
	    },

	    matches: function matches(elements, expr) {
	        return _utilJs.leoDom.find(expr, null, null, elements);
	    },

	    uniqueSort: function uniqueSort(results) {
	        var elem = undefined,
	            duplicates = [],
	            i = 0,
	            j = 0;

	        hasDuplicate = false;
	        results.sort(sortOrder);

	        if (hasDuplicate) {
	            while (elem = results[i++]) {
	                if (elem === results[i]) {
	                    j = duplicates.push(i);
	                }
	            }

	            while (j--) {
	                results.splice(duplicates[j], 1);
	            }
	        }

	        return results;
	    },

	    find: function find(selector, context, results, seed) {
	        var elem = undefined,
	            nodeType = undefined,
	            i = 0;

	        results = results || [];
	        context = context || _constJs.document;

	        if (!selector || typeof selector !== "string") {
	            return results;
	        }

	        if ((nodeType = context.nodeType) !== 1 && nodeType !== 9) {
	            return [];
	        }

	        if (seed) {
	            while (elem = seed[i++]) {
	                if (_utilJs.leoDom.matchesSelector(elem, selector)) {
	                    results.push(elem);
	                }
	            }
	        } else {
	            _privateJs._leoDom.merge(results, querySelector(selector, context));
	        }

	        return results;
	    },

	    $is: function $is(selector, isSelector) {
	        selector = _utilJs.leoDom.$(selector);

	        var callback = typeof isSelector === 'string' ? function (el) {
	            if (el.nodeType === 1) {
	                return _utilJs.leoDom.matchesSelector(el, isSelector);
	            }
	        } : _utilJs.leoDom.isFunction(isSelector) ? function (el, i) {
	            return !!isSelector(el, i);
	        } : function (el) {
	            return _utilJs.leoDom.$(isSelector).some(function (node) {
	                return node === el;
	            });
	        };

	        return selector.some(function (el, i) {
	            return callback(el, i);
	        });
	    },

	    $filter: function $filter(selector, filterSelector) {
	        selector = _utilJs.leoDom.$(selector);

	        var callback = _utilJs.leoDom.isFunction(filterSelector) ? function (el, i) {
	            return !!filterSelector(el, i);
	        } : function (el) {
	            return _utilJs.leoDom.$is(el, filterSelector);
	        };

	        return selector.filter(function (el, i) {
	            return callback(el, i);
	        });
	    },

	    $not: function $not(selector, notSelector) {
	        selector = _utilJs.leoDom.$(selector);

	        var callback = _utilJs.leoDom.isFunction(notSelector) ? function (el, i) {
	            return !!notSelector(el, i);
	        } : function (el) {
	            return _utilJs.leoDom.$is(el, notSelector);
	        };

	        return selector.filter(function (el, i) {
	            return !callback(el, i);
	        });
	    },

	    $find: function $find(selector, findSelector) {
	        selector = _utilJs.leoDom.$(selector);

	        var i = undefined,
	            len = selector.length,
	            ret = [];

	        if (typeof findSelector !== "string") {
	            return _utilJs.leoDom.$(findSelector).filter(function (node) {
	                for (i = 0; i < len; i++) {
	                    if (_utilJs.leoDom.contains(selector[i], node)) {
	                        return true;
	                    }
	                }
	            });
	        }

	        for (i = 0; i < len; i++) {
	            _utilJs.leoDom.find(findSelector, selector[i], ret);
	        }

	        return len > 1 ? _utilJs.leoDom.uniqueSort(ret) : ret;
	    },

	    $add: function $add(selector, addSelector, context) {
	        selector = _utilJs.leoDom.$(selector);

	        return _utilJs.leoDom.uniqueSort(_privateJs._leoDom.merge(selector, _utilJs.leoDom.$(addSelector, context)));
	    },

	    $has: function $has(selector, hasSelector) {
	        selector = _utilJs.leoDom.$(selector);

	        var targets = _utilJs.leoDom.$(hasSelector, selector),
	            l = targets.length;

	        return selector.filter(function (node) {
	            for (var i = 0; i < l; i++) {
	                if (_utilJs.leoDom.contains(node, targets[i])) {
	                    return true;
	                }
	            }
	        });
	    },

	    $closest: function $closest(selector, closestSelector, context) {
	        selector = _utilJs.leoDom.$(selector);

	        var cur = undefined,
	            i = 0,
	            l = selector.length,
	            matched = [],
	            pos = typeof closestSelector !== "string" ? _utilJs.leoDom.$(closestSelector, context || _constJs.document) : 0;

	        for (; i < l; i++) {
	            for (cur = selector[i]; cur && cur !== context; cur = cur.parentNode) {
	                if (cur.nodeType < 11 && (pos ? pos.indexOf(cur) > -1 : cur.nodeType === 1 && _utilJs.leoDom.matchesSelector(cur, closestSelector))) {
	                    matched.push(cur);
	                    break;
	                }
	            }
	        }

	        return matched.length > 1 ? _utilJs.leoDom.uniqueSort(matched) : matched;
	    }
	});

	exports.leoDom = _utilJs.leoDom;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/**
	+-------------------------------------------------------------------
	* LeoJs--dom--util.js
	+-------------------------------------------------------------------
	* @version    1.0.0 beta
	* @author     leo
	+-------------------------------------------------------------------
	*/

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _constJs = __webpack_require__(4);

	var leoDom = {};
	var class2type = {};
	var toString = class2type.toString;
	var hasOwn = class2type.hasOwnProperty;
	var rgenerateId = /\d\.\d{4}/;
	var indexOf = _constJs.arr.indexOf;

	"Boolean Number String Function Array Date RegExp Object Error".replace(/[^, ]+/g, function (name) {
	    class2type["[object " + name + "]"] = name.toLowerCase();
	});

	leoDom.noop = function () {};

	leoDom.error = function (msg) {
	    throw new Error(msg);
	};

	leoDom.inArray = function (elem, arr, i) {
	    return arr == null ? -1 : indexOf.call(arr, elem, i);
	};

	leoDom.isNumeric = function (obj) {
	    return !leoDom.isArray(obj) && obj - parseFloat(obj) + 1 >= 0;
	};

	leoDom.isEmptyObject = function (obj) {
	    for (var _name in obj) {
	        return false;
	    }

	    return true;
	};

	leoDom.isFunction = function (obj) {
	    return leoDom.type(obj) === "function";
	};

	leoDom.type = function (obj) {
	    if (obj == null) {
	        return obj + "";
	    }

	    return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj;
	};

	leoDom.generateId = function (prefix) {
	    prefix = prefix || "LeoJs";

	    return String(Math.random() + Math.random()).replace(rgenerateId, prefix);
	};

	leoDom.isPlainObject = function (obj) {
	    if (leoDom.type(obj) !== "object" || obj.nodeType || obj === obj.window) {
	        return false;
	    }

	    if (obj.constructor && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
	        return false;
	    }

	    return true;
	};

	leoDom.uniq = function (collection) {
	    return collection.filter(function (item, index) {
	        return collection.indexOf(item) === index;
	    });
	};

	leoDom.isArray = Array.isArray;

	leoDom.extend = function () {
	    for (var _len = arguments.length, arg = Array(_len), _key = 0; _key < _len; _key++) {
	        arg[_key] = arguments[_key];
	    }

	    var options = undefined,
	        name = undefined,
	        src = undefined,
	        copy = undefined,
	        copyIsArray = undefined,
	        clone = undefined,
	        target = arg[0] || {},
	        i = 1,
	        length = arg.length,
	        deep = false;

	    if (typeof target === "boolean") {
	        deep = target;

	        target = arg[i] || {};
	        i++;
	    }

	    if (typeof target !== "object" && !leoDom.isFunction(target)) {
	        target = {};
	    }

	    if (i === length) {
	        target = this;
	        i--;
	    }

	    for (; i < length; i++) {
	        if ((options = arg[i]) != null) {
	            for (name in options) {
	                src = target[name];
	                copy = options[name];

	                if (target === copy) {
	                    continue;
	                }

	                if (deep && copy && (leoDom.isPlainObject(copy) || (copyIsArray = leoDom.isArray(copy)))) {

	                    if (copyIsArray) {
	                        copyIsArray = false;
	                        clone = src && leoDom.isArray(src) ? src : [];
	                    } else {
	                        clone = src && leoDom.isPlainObject(src) ? src : {};
	                    }

	                    target[name] = leoDom.extend(deep, clone, copy);
	                } else if (copy !== undefined) {
	                    target[name] = copy;
	                }
	            }
	        }
	    }

	    return target;
	};

	var fcamelCase = function fcamelCase(all, letter) {
	    return letter.toUpperCase();
	};

	var rmsPrefix = /^-ms-/;
	var rdashAlpha = /-([a-z])/g;

	leoDom.camelCase = function (string) {
	    return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
	};

	leoDom.nodeName = function (elem, name) {
	    return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	};

	leoDom.globalEval = function (code) {
	    var script = _constJs.document.createElement("script");

	    script.text = code;
	    _constJs.document.head.appendChild(script).parentNode.removeChild(script);
	};

	leoDom.isWindow = function (obj) {
	    return obj != null && obj === obj.window;
	};

	leoDom.isNode = function (node) {
	    return !!(node && node.nodeName);
	};

	leoDom.isNodeList = function (variable) {
	    return typeof variable === "object" && /^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(variable)) && variable.length !== undefined && (variable.length === 0 || typeof variable[0] === "object" && variable[0].nodeType > 0);
	};

	leoDom.isXMLDoc = function (elem) {
	    var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	    return documentElement ? documentElement.nodeName !== "HTML" : false;
	};

	var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

	leoDom.trim = function (text) {
	    return text == null ? "" : (text + "").replace(rtrim, "");
	};

	leoDom.makeArray = function (arr, results) {
	    var ret = results || [];

	    if (arr != null) {
	        if (isArrayLike(Object(arr))) {
	            leoDom.merge(ret, typeof arr === "string" ? [arr] : arr);
	        } else {
	            push.call(ret, arr);
	        }
	    }

	    return ret;
	};

	var push = _constJs.arr.push;

	leoDom.merge = function (first, second) {
	    var len = +second.length,
	        j = 0,
	        i = first.length;

	    for (; j < len; j++) {
	        first[i++] = second[j];
	    }

	    first.length = i;

	    return first;
	};

	function isArrayLike(obj) {
	    var length = !!obj && "length" in obj && obj.length,
	        type = leoDom.type(obj);

	    if (type === "function" || leoDom.isWindow(obj)) {
	        return false;
	    }

	    return type === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj;
	}

	leoDom.each = function (obj, callback) {
	    var length = undefined,
	        i = 0;

	    if (isArrayLike(obj)) {
	        length = obj.length;
	        for (; i < length; i++) {
	            if (callback.call(obj[i], i, obj[i]) === false) {
	                break;
	            }
	        }
	    } else {
	        for (i in obj) {
	            if (callback.call(obj[i], i, obj[i]) === false) {
	                break;
	            }
	        }
	    }

	    return obj;
	};

	exports.leoDom = leoDom;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/**
	+-------------------------------------------------------------------
	* LeoJs--dom--animate.js
	+-------------------------------------------------------------------
	* @version    1.0.0 beta
	* @author     leo
	+-------------------------------------------------------------------
	*/

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _privateJs = __webpack_require__(3);

	__webpack_require__(8);

	__webpack_require__(14);

	var _cssJs = __webpack_require__(15);

	_privateJs._leoDom.setApi(_cssJs.leoDom, {
	    animateSpeeds: {
	        slow: 600,
	        fast: 200,
	        _default: 400
	    },

	    transit: {
	        propertyMap: {
	            marginLeft: 'margin',
	            marginRight: 'margin',
	            marginBottom: 'margin',
	            marginTop: 'margin',
	            paddingLeft: 'padding',
	            paddingRight: 'padding',
	            paddingBottom: 'padding',
	            paddingTop: 'padding'
	        },

	        enabled: true,

	        useTransitionEnd: true
	    },

	    cssEase: {
	        '_default': 'ease',
	        'in': 'ease-in',
	        'out': 'ease-out',
	        'in-out': 'ease-in-out',
	        'snap': 'cubic-bezier(0,1,.5,1)',
	        'easeInCubic': 'cubic-bezier(.550,.055,.675,.190)',
	        'easeOutCubic': 'cubic-bezier(.215,.61,.355,1)',
	        'easeInOutCubic': 'cubic-bezier(.645,.045,.355,1)',
	        'easeInCirc': 'cubic-bezier(.6,.04,.98,.335)',
	        'easeOutCirc': 'cubic-bezier(.075,.82,.165,1)',
	        'easeInOutCirc': 'cubic-bezier(.785,.135,.15,.86)',
	        'easeInExpo': 'cubic-bezier(.95,.05,.795,.035)',
	        'easeOutExpo': 'cubic-bezier(.19,1,.22,1)',
	        'easeInOutExpo': 'cubic-bezier(1,0,0,1)',
	        'easeInQuad': 'cubic-bezier(.55,.085,.68,.53)',
	        'easeOutQuad': 'cubic-bezier(.25,.46,.45,.94)',
	        'easeInOutQuad': 'cubic-bezier(.455,.03,.515,.955)',
	        'easeInQuart': 'cubic-bezier(.895,.03,.685,.22)',
	        'easeOutQuart': 'cubic-bezier(.165,.84,.44,1)',
	        'easeInOutQuart': 'cubic-bezier(.77,0,.175,1)',
	        'easeInQuint': 'cubic-bezier(.755,.05,.855,.06)',
	        'easeOutQuint': 'cubic-bezier(.23,1,.32,1)',
	        'easeInOutQuint': 'cubic-bezier(.86,0,.07,1)',
	        'easeInSine': 'cubic-bezier(.47,0,.745,.715)',
	        'easeOutSine': 'cubic-bezier(.39,.575,.565,1)',
	        'easeInOutSine': 'cubic-bezier(.445,.05,.55,.95)',
	        'easeInBack': 'cubic-bezier(.6,-.28,.735,.045)',
	        'easeOutBack': 'cubic-bezier(.175, .885,.32,1.275)',
	        'easeInOutBack': 'cubic-bezier(.68,-.55,.265,1.55)'
	    }
	});

	var div = document.createElement('div');

	function getVendorPropertyName(prop) {
	    if (prop in div.style) return prop;

	    var prefixes = ['Moz', 'Webkit', 'O', 'ms'];
	    var prop_ = prop.charAt(0).toUpperCase() + prop.substr(1);

	    for (var i = 0; i < prefixes.length; ++i) {
	        var vendorProp = prefixes[i] + prop_;
	        if (vendorProp in div.style) {
	            return vendorProp;
	        }
	    }
	}

	function checkTransform3dSupport() {
	    div.style[_privateJs.support.transform] = '';
	    div.style[_privateJs.support.transform] = 'rotateY(90deg)';
	    return div.style[_privateJs.support.transform] !== '';
	}

	var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

	_privateJs.support.transition = getVendorPropertyName('transition');
	_privateJs.support.transitionDelay = getVendorPropertyName('transitionDelay');
	_privateJs.support.transform = getVendorPropertyName('transform');
	_privateJs.support.transformOrigin = getVendorPropertyName('transformOrigin');
	_privateJs.support.filter = getVendorPropertyName('Filter');
	_privateJs.support.transform3d = checkTransform3dSupport();

	var eventNames = {
	    'transition': 'transitionend',
	    'MozTransition': 'transitionend',
	    'OTransition': 'oTransitionEnd',
	    'WebkitTransition': 'webkitTransitionEnd',
	    'msTransition': 'MSTransitionEnd'
	};

	var transitionEnd = _privateJs.support.transitionEnd = eventNames[_privateJs.support.transition] || null;

	div = null;

	_cssJs.leoDom.cssHooks['transit:transform'] = {
	    get: function get(elem) {
	        return _cssJs.leoDom.$data(elem, 'transform') || new Transform();
	    },

	    set: function set(elem, v) {
	        var value = v;

	        if (!(value instanceof Transform)) {
	            value = new Transform(value);
	        }

	        if (_privateJs.support.transform === 'WebkitTransform' && !isChrome) {
	            elem.style[_privateJs.support.transform] = value.toString(true);
	        } else {
	            elem.style[_privateJs.support.transform] = value.toString();
	        }

	        _cssJs.leoDom.$data(elem, 'transform', value);
	    }
	};

	_cssJs.leoDom.cssHooks.transform = {
	    set: _cssJs.leoDom.cssHooks['transit:transform'].set
	};

	_cssJs.leoDom.cssHooks.filter = {
	    get: function get(elem) {
	        return elem.style[_privateJs.support.filter];
	    },

	    set: function set(elem, value) {
	        elem.style[_privateJs.support.filter] = value;
	    }
	};

	registerCssHook('scale');
	registerCssHook('scaleX');
	registerCssHook('scaleY');
	registerCssHook('translate');
	registerCssHook('rotate');
	registerCssHook('rotateX');
	registerCssHook('rotateY');
	registerCssHook('rotate3d');
	registerCssHook('perspective');
	registerCssHook('skewX');
	registerCssHook('skewY');
	registerCssHook('x', true);
	registerCssHook('y', true);

	function registerCssHook(prop, isPixels) {
	    if (!isPixels) {
	        _cssJs.leoDom.cssNumber[prop] = true;
	    }

	    _cssJs.leoDom.transit.propertyMap[prop] = _privateJs.support.transform;

	    _cssJs.leoDom.cssHooks[prop] = {
	        get: function get(elem) {
	            return _cssJs.leoDom.$css(elem, 'transit:transform').get(prop);
	        },

	        set: function set(elem, value) {
	            var t = _cssJs.leoDom.$css(elem, 'transit:transform');
	            t.setFromString(prop, value);

	            _cssJs.leoDom.$css(elem, {
	                'transit:transform': t
	            });
	        }
	    };
	}

	function Transform(str) {
	    if (typeof str === 'string') {
	        this.parse(str);
	    }
	    return this;
	}

	var reparse = /([a-zA-Z0-9]+)\((.*?)\)/g;

	_cssJs.leoDom.extend(Transform.prototype, {
	    setFromString: function setFromString(prop, val) {
	        var args = typeof val === 'string' ? val.split(',') : val.constructor === Array ? val : [val];

	        args.unshift(prop);
	        Transform.prototype.set.apply(this, args);
	    },

	    set: function set(prop) {
	        var args = Array.prototype.slice.apply(arguments, [1]);

	        if (this.setter[prop]) {
	            this.setter[prop].apply(this, args);
	        } else {
	            this[prop] = args.join(',');
	        }
	    },

	    get: function get(prop) {
	        if (this.getter[prop]) {
	            return this.getter[prop].apply(this);
	        } else {
	            return this[prop] || 0;
	        }
	    },

	    setter: {
	        rotate: function rotate(theta) {
	            this.rotate = unit(theta, 'deg');
	        },

	        rotateX: function rotateX(theta) {
	            this.rotateX = unit(theta, 'deg');
	        },

	        rotateY: function rotateY(theta) {
	            this.rotateY = unit(theta, 'deg');
	        },

	        scale: function scale(x, y) {
	            if (y === undefined) {
	                y = x;
	            }

	            this.scale = x + "," + y;
	        },

	        skewX: function skewX(x) {
	            this.skewX = unit(x, 'deg');
	        },

	        skewY: function skewY(y) {
	            this.skewY = unit(y, 'deg');
	        },

	        perspective: function perspective(dist) {
	            this.perspective = unit(dist, 'px');
	        },

	        x: function x(_x) {
	            this.set('translate', _x, null);
	        },

	        y: function y(_y) {
	            this.set('translate', null, _y);
	        },

	        translate: function translate(x, y) {
	            if (this._translateX === undefined) {
	                this._translateX = 0;
	            }
	            if (this._translateY === undefined) {
	                this._translateY = 0;
	            }

	            if (x !== null && x !== undefined) {
	                this._translateX = unit(x, 'px');
	            }
	            if (y !== null && y !== undefined) {
	                this._translateY = unit(y, 'px');
	            }

	            this.translate = this._translateX + "," + this._translateY;
	        }
	    },

	    getter: {
	        x: function x() {
	            return this._translateX || 0;
	        },

	        y: function y() {
	            return this._translateY || 0;
	        },

	        scale: function scale() {
	            var s = (this.scale || "1,1").split(',');

	            if (s[0]) {
	                s[0] = parseFloat(s[0]);
	            }
	            if (s[1]) {
	                s[1] = parseFloat(s[1]);
	            }

	            return s[0] === s[1] ? s[0] : s;
	        },

	        rotate3d: function rotate3d() {
	            var s = (this.rotate3d || "0,0,0,0deg").split(',');

	            for (var i = 0; i <= 3; ++i) {
	                if (s[i]) {
	                    s[i] = parseFloat(s[i]);
	                }
	            }
	            if (s[3]) {
	                s[3] = unit(s[3], 'deg');
	            }

	            return s;
	        }
	    },

	    parse: function parse(str) {
	        str.replace(reparse, (function (x, prop, val) {
	            this.setFromString(prop, val);
	        }).bind(this));
	    },

	    toString: function toString(use3d) {
	        var re = [];

	        for (var i in this) {
	            if (this.hasOwnProperty(i)) {
	                if (!_privateJs.support.transform3d && (i === 'rotateX' || i === 'rotateY' || i === 'perspective' || i === 'transformOrigin')) {
	                    continue;
	                }

	                if (i[0] !== '_') {
	                    if (use3d && i === 'scale') {
	                        re.push(i + "3d(" + this[i] + ",1)");
	                    } else if (use3d && i === 'translate') {
	                        re.push(i + "3d(" + this[i] + ",0)");
	                    } else {
	                        re.push(i + "(" + this[i] + ")");
	                    }
	                }
	            }
	        }

	        return re.join(" ");
	    }
	});

	function getProperties(props) {
	    var re = [];

	    _cssJs.leoDom.each(props, function (key) {
	        key = _cssJs.leoDom.camelCase(key);
	        key = _cssJs.leoDom.transit.propertyMap[key] || _cssJs.leoDom.cssProps[key] || key;
	        key = uncamel(key);

	        if (_privateJs.support[key]) key = uncamel(_privateJs.support[key]);

	        if (_cssJs.leoDom.inArray(key, re) === -1) {
	            re.push(key);
	        }
	    });

	    return re;
	}

	function getTransition(properties, duration, easing, delay) {
	    var props = getProperties(properties);

	    if (_cssJs.leoDom.cssEase[easing]) {
	        easing = _cssJs.leoDom.cssEase[easing];
	    }

	    var attribs = '' + toMS(duration) + ' ' + easing;

	    if (parseInt(delay, 10) > 0) {
	        attribs += ' ' + toMS(delay);
	    }

	    var transitions = [];

	    _cssJs.leoDom.each(props, function (i, name) {
	        transitions.push(name + ' ' + attribs);
	    });

	    return transitions.join(', ');
	}

	var reuncamel = /([A-Z])/g;

	function uncamel(str) {
	    return str.replace(reuncamel, function (letter) {
	        return '-' + letter.toLowerCase();
	    });
	}

	var reunit = /^[\-0-9\.]+$/;

	function unit(i, units) {
	    if (typeof i === "string" && !i.match(reunit)) {
	        return i;
	    } else {
	        return "" + i + units;
	    }
	}

	var retoMS = /^[\-0-9\.]+/;

	function toMS(duration) {
	    var i = duration;

	    if (typeof i === 'string' && !i.match(retoMS)) {
	        i = _cssJs.leoDom.animateSpeeds[i] || _cssJs.leoDom.animateSpeeds._default;
	    }

	    return unit(i, 'ms');
	}

	function callOrQueue(selector, queue, fn) {
	    if (queue === true) {
	        _cssJs.leoDom.$queue(selector, fn);
	    } else if (queue) {
	        _cssJs.leoDom.$queue(selector, queue, fn);
	    } else {
	        selector.forEach(function (elem) {
	            fn.call(elem);
	        });
	    }
	}

	_cssJs.leoDom.$transition = _cssJs.leoDom.$transit = function (selector, properties, duration, easing, callback) {
	    selector = _cssJs.leoDom.$(selector);

	    var delay = 0;
	    var queue = true;

	    var theseProperties = _cssJs.leoDom.extend(true, {}, properties);

	    if (typeof duration === 'function') {
	        callback = duration;
	        duration = undefined;
	    }

	    if (typeof duration === 'object') {
	        easing = duration.easing;
	        delay = duration.delay || 0;
	        queue = typeof duration.queue === "undefined" ? true : duration.queue;
	        callback = duration.complete;
	        duration = duration.duration;
	    }

	    if (typeof easing === 'function') {
	        callback = easing;
	        easing = undefined;
	    }

	    if (typeof theseProperties.easing !== 'undefined') {
	        easing = theseProperties.easing;
	        delete theseProperties.easing;
	    }

	    if (typeof theseProperties.duration !== 'undefined') {
	        duration = theseProperties.duration;
	        delete theseProperties.duration;
	    }

	    if (typeof theseProperties.complete !== 'undefined') {
	        callback = theseProperties.complete;
	        delete theseProperties.complete;
	    }

	    if (typeof theseProperties.queue !== 'undefined') {
	        queue = theseProperties.queue;
	        delete theseProperties.queue;
	    }

	    if (typeof theseProperties.delay !== 'undefined') {
	        delay = theseProperties.delay;
	        delete theseProperties.delay;
	    }

	    if (typeof duration === 'undefined') {
	        duration = _cssJs.leoDom.animateSpeeds._default;
	    }

	    if (typeof easing === 'undefined') {
	        easing = _cssJs.leoDom.cssEase._default;
	    }

	    duration = toMS(duration);

	    var transitionValue = getTransition(theseProperties, duration, easing, delay);
	    var work = _cssJs.leoDom.transit.enabled && _privateJs.support.transition;
	    var i = work ? parseInt(duration, 10) + parseInt(delay, 10) : 0;

	    if (i === 0) {
	        var fn = function fn(elem, next) {
	            _cssJs.leoDom.$css(selector, theseProperties);

	            if (callback) {
	                callback.apply(selector);
	            }

	            if (next) {
	                next();
	            }
	        };

	        callOrQueue(selector, queue, fn);

	        return;
	    }

	    var oldTransitions = {};

	    var run = function run(nextCall) {
	        var bound = false;
	        var cb = function cb() {
	            var _this = this;

	            if (bound) {
	                _cssJs.leoDom.$off(selector, transitionEnd, cb);
	            }

	            if (i > 0) {
	                selector.forEach(function (elem) {
	                    elem.style[_privateJs.support.transition] = oldTransitions[_this] || null;
	                });
	            }

	            if (typeof callback === 'function') {
	                callback.apply(selector);
	            }

	            if (typeof nextCall === 'function') {
	                nextCall();
	            }
	        };

	        if (i > 0 && transitionEnd && _cssJs.leoDom.transit.useTransitionEnd) {
	            bound = true;
	            _cssJs.leoDom.$on(selector, transitionEnd, cb);
	        } else {
	            window.setTimeout(cb, i);
	        }

	        selector.forEach(function (elem) {
	            if (i > 0) {
	                elem.style[_privateJs.support.transition] = transitionValue;
	            }

	            _cssJs.leoDom.$css(elem, theseProperties);
	        });
	    };

	    var deferredRun = function deferredRun(elem, next) {
	        elem.offsetHeight;
	        run(next);
	    };

	    callOrQueue(selector, queue, deferredRun);
	};

	_cssJs.leoDom.transit.getTransitionValue = getTransition;

	exports.leoDom = _cssJs.leoDom;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/**
	+-------------------------------------------------------------------
	* LeoJs--dom--css.js
	+-------------------------------------------------------------------
	* @version    1.0.0 beta
	* @author     leo
	+-------------------------------------------------------------------
	*/

	"use strict";

	var _createClass = __webpack_require__(9)["default"];

	var _classCallCheck = __webpack_require__(13)["default"];

	var _Object$defineProperty = __webpack_require__(10)["default"];

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _privateJs = __webpack_require__(3);

	var _coreJs = __webpack_require__(5);

	var _constJs = __webpack_require__(4);

	var Data = (function () {
	    _createClass(Data, null, [{
	        key: "accepts",
	        value: function accepts(owner) {
	            return owner.nodeType === 1 || owner.nodeType === 9 || ! +owner.nodeType;
	        }
	    }]);

	    function Data() {
	        _classCallCheck(this, Data);

	        this.expando = Data.expando + Data.uid++;
	    }

	    _createClass(Data, [{
	        key: "register",
	        value: function register(owner) {
	            var value = {};

	            if (owner.nodeType) {
	                owner[this.expando] = value;
	            } else {
	                _Object$defineProperty(owner, this.expando, {
	                    value: value,
	                    writable: true,
	                    configurable: true
	                });
	            }

	            return owner[this.expando];
	        }
	    }, {
	        key: "cache",
	        value: function cache(owner) {
	            if (!Data.accepts(owner)) {
	                return {};
	            }

	            var cache = owner[this.expando];

	            if (cache) {
	                return cache;
	            }

	            return this.register(owner);
	        }
	    }, {
	        key: "set",
	        value: function set(owner, data, value) {
	            var prop = undefined,
	                cache = this.cache(owner);

	            if (typeof data === "string") {
	                cache[_coreJs.leoDom.camelCase(data)] = value;
	            } else {
	                for (prop in data) {
	                    cache[_coreJs.leoDom.camelCase(prop)] = data[prop];
	                }
	            }

	            return cache;
	        }
	    }, {
	        key: "get",
	        value: function get(owner, key) {
	            var cache = this.cache(owner);

	            return key === undefined ? cache : cache[_coreJs.leoDom.camelCase(key)];
	        }
	    }, {
	        key: "access",
	        value: function access(owner, key, value) {
	            if (key === undefined || key && typeof key === "string" && value === undefined) {
	                return this.get(owner, key);
	            }

	            this.set(owner, key, value);

	            return value !== undefined ? value : key;
	        }
	    }, {
	        key: "remove",
	        value: function remove(owner, key) {
	            var i = undefined,
	                cache = owner[this.expando];

	            if (cache === undefined) {
	                return;
	            }

	            if (key !== undefined) {
	                if (Array.isArray(key)) {
	                    key = key.map(_coreJs.leoDom.camelCase);
	                } else {
	                    key = _coreJs.leoDom.camelCase(key);
	                    key = key in cache ? [key] : key.match(_constJs.rnotwhite) || [];
	                }

	                i = key.length;

	                while (i--) {
	                    delete cache[key[i]];
	                }
	            }

	            if (key === undefined || _coreJs.leoDom.isEmptyObject(cache)) {
	                delete owner[this.expando];
	            }
	        }
	    }, {
	        key: "hasData",
	        value: function hasData(owner) {
	            var cache = owner[this.expando];

	            return cache !== undefined && !_coreJs.leoDom.isEmptyObject(cache);
	        }
	    }]);

	    return Data;
	})();

	Data.expando = _coreJs.leoDom.generateId('leoDomData');
	Data.uid = 1;

	var dataPriv = new Data();
	var dataUser = new Data();

	var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	    rmultiDash = /[A-Z]/g;

	function dataAttr(elem, key, data) {
	    if (data === undefined && elem.nodeType === 1) {
	        var _name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
	        data = elem.getAttribute(_name);

	        if (typeof data === "string") {
	            try {
	                data = data === "true" ? true : data === "false" ? false : data === "null" ? null : +data + "" === data ? +data : rbrace.test(data) ? JSON.parse(data) : data;
	            } catch (e) {}
	            dataUser.set(elem, key, data);
	        } else {
	            data = undefined;
	        }
	    }

	    return data;
	}

	_privateJs._leoDom.setApi(_coreJs.leoDom, {
	    hasData: function hasData(elem) {
	        return dataUser.hasData(elem) || dataPriv.hasData(elem);
	    },

	    data: function data(elem, name, _data) {
	        return dataUser.access(elem, name, _data);
	    },

	    removeData: function removeData(elem, name) {
	        dataUser.remove(elem, name);
	    },

	    _data: function _data(elem, name, data) {
	        return dataPriv.access(elem, name, data);
	    },

	    _removeData: function _removeData(elem, name) {
	        dataPriv.remove(elem, name);
	    },

	    $data: function $data(selector, key, value) {
	        selector = _coreJs.leoDom.$(selector);

	        var i = undefined,
	            name = undefined,
	            data = undefined,
	            elem = selector[0],
	            attrs = elem && elem.attributes;

	        if (key === undefined) {
	            if (selector.length) {
	                data = dataUser.get(elem);

	                if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
	                    i = attrs.length;

	                    while (i--) {
	                        if (attrs[i]) {
	                            name = attrs[i].name;

	                            if (name.indexOf("data-") === 0) {
	                                name = _coreJs.leoDom.camelCase(name.slice(5));
	                                dataAttr(elem, name, data[name]);
	                            }
	                        }
	                    }

	                    dataPriv.set(elem, "hasDataAttrs", true);
	                }
	            }

	            return data;
	        }

	        if (typeof key === "object") {
	            selector.forEach(function (node) {
	                dataUser.set(node, key);
	            });

	            return;
	        }

	        if (elem && value === undefined) {
	            data = dataUser.get(elem, key);

	            if (data !== undefined) {
	                return data;
	            }

	            data = dataAttr(elem, key);

	            if (data !== undefined) {
	                return data;
	            }

	            return;
	        }

	        selector.forEach(function (node) {
	            dataUser.set(node, key, value);
	        });
	    },

	    $removeData: function $removeData(selector, key) {
	        _coreJs.leoDom.$(selector).forEach(function (node) {
	            dataUser.remove(node, key);
	        });
	    },

	    cloneCopyEvent: function cloneCopyEvent(src, dest) {
	        if (dest.nodeType !== 1) {
	            return;
	        }

	        if (dataPriv.hasData(src)) {
	            dataPriv.set(dest, _coreJs.leoDom.extend({}, dataPriv.access(src)));
	        }

	        if (dataUser.hasData(src)) {
	            dataUser.set(dest, _coreJs.leoDom.extend({}, dataUser.access(src)));
	        }
	    },

	    cleanData: function cleanData(elems) {
	        var elem = undefined,
	            i = 0;

	        for (; (elem = elems[i]) !== undefined; i++) {
	            if (Data.accepts(elem)) {
	                if (elem[dataPriv.expando]) {
	                    delete elem[dataPriv.expando];
	                }
	                if (elem[dataUser.expando]) {
	                    delete elem[dataUser.expando];
	                }
	            }
	        }
	    },

	    queue: function queue(elem, type, data) {
	        var queue = undefined;

	        if (elem) {
	            type = (type || "fx") + "queue";
	            queue = dataPriv.get(elem, type);

	            if (data) {
	                if (!queue || _coreJs.leoDom.isArray(data)) {
	                    queue = dataPriv.access(elem, type, _coreJs.leoDom.makeArray(data));
	                } else {
	                    queue.push(data);
	                }
	            }

	            return queue || [];
	        }
	    },

	    dequeue: function dequeue(elem, type) {
	        type = type || "fx";

	        var queue = _coreJs.leoDom.queue(elem, type),
	            startLength = queue.length,
	            fn = queue.shift(),
	            next = function next() {
	            _coreJs.leoDom.dequeue(elem, type);
	        };

	        if (fn === "inprogress") {
	            fn = queue.shift();
	            startLength--;
	        }

	        if (fn) {
	            if (type === "fx") {
	                queue.unshift("inprogress");
	            }

	            fn(elem, next);
	        }

	        if (!startLength) {
	            dataPriv.remove(elem, type + "queue");
	        }
	    },

	    $queue: function $queue(selector, type, data) {
	        selector = _coreJs.leoDom.$(selector);

	        var setter = 3;

	        if (typeof type !== "string") {
	            data = type;
	            type = "fx";
	            setter--;
	        }

	        if (arguments.length < setter) {
	            return _coreJs.leoDom.queue(selector[0], type);
	        }

	        selector.forEach(function (elem) {
	            var queue = _coreJs.leoDom.queue(elem, type, data);

	            if (type === "fx" && queue[0] !== "inprogress") {
	                _coreJs.leoDom.dequeue(elem, type);
	            }
	        });
	    },

	    $dequeue: function $dequeue(selector, type) {
	        _coreJs.leoDom.$(selector).forEach(function (elem) {
	            _coreJs.leoDom.dequeue(elem, type);
	        });
	    },

	    $clearQueue: function $clearQueue(selector, type) {
	        _coreJs.leoDom.$queue(selector, type || "fx", []);
	    }
	});

	exports.leoDom = _coreJs.leoDom;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$defineProperty = __webpack_require__(10)["default"];

	exports["default"] = (function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;

	      _Object$defineProperty(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	})();

	exports.__esModule = true;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(11), __esModule: true };

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(12);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	exports.__esModule = true;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/**
	+-------------------------------------------------------------------
	* LeoJs--dom--event.js
	+-------------------------------------------------------------------
	* @version    1.0.0 beta
	* @author     leo
	+-------------------------------------------------------------------
	*/

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _privateJs = __webpack_require__(3);

	var _coreJs = __webpack_require__(5);

	var _constJs = __webpack_require__(4);

	var _zid = 1,
	    isFunction = _coreJs.leoDom.isFunction,
	    isString = function isString(obj) {
	    return typeof obj == 'string';
	},
	    handlers = {},
	    specialEvents = {},
	    focusinSupported = ('onfocusin' in window),
	    focus = {
	    focus: 'focusin',
	    blur: 'focusout'
	},
	    hover = {
	    mouseenter: 'mouseover',
	    mouseleave: 'mouseout'
	};

	specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents';

	function zid(element) {
	    return element._zid || (element._zid = _zid++);
	}

	function findHandlers(element, event, fn, selector) {
	    event = parse(event);

	    var matcher = undefined;

	    if (event.ns) {
	        matcher = matcherFor(event.ns);
	    }

	    return (handlers[zid(element)] || []).filter(function (handler) {
	        return handler && (!event.e || handler.e == event.e) && (!event.ns || matcher.test(handler.ns)) && (!fn || zid(handler.fn) === zid(fn)) && (!selector || handler.sel == selector);
	    });
	}

	function parse(event) {
	    var parts = ('' + event).split('.');

	    return {
	        e: parts[0],
	        ns: parts.slice(1).sort().join(' ')
	    };
	}

	function matcherFor(ns) {
	    return new RegExp('(?:^| )' + ns.replace(' ', ' .* ?') + '(?: |$)');
	}

	function eventCapture(handler, captureSetting) {
	    return handler.del && (!focusinSupported && handler.e in focus) || !!captureSetting;
	}

	function realEvent(type) {
	    return hover[type] || focusinSupported && focus[type] || type;
	}

	function add(element, events, fn, data, selector, delegator, capture) {
	    var id = zid(element),
	        set = handlers[id] || (handlers[id] = []);

	    events.split(/\s/).forEach(function (event) {
	        if (event == 'ready') {
	            return _coreJs.leoDom.ready(fn);
	        }

	        var handler = parse(event);

	        handler.fn = fn;
	        handler.sel = selector;

	        if (handler.e in hover) {
	            fn = function (e) {
	                var related = e.relatedTarget;

	                if (!related || related !== this && !_coreJs.leoDom.contains(this, related)) {
	                    return handler.fn.apply(this, arguments);
	                }
	            };
	        }

	        handler.del = delegator;

	        var callback = delegator || fn;

	        handler.proxy = function (e) {
	            e = compatible(e);

	            if (e.isImmediatePropagationStopped()) {
	                return;
	            }

	            e.data = data;

	            var result = callback.apply(element, e._args == undefined ? [e] : [e].concat(e._args));

	            if (result === false) {
	                e.preventDefault();
	                e.stopPropagation();
	            }

	            return result;
	        };

	        handler.i = set.length;
	        set.push(handler);

	        if ('addEventListener' in element) {
	            element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture));
	        }
	    });
	}

	function remove(element, events, fn, selector, capture) {
	    var id = zid(element);

	    (events || '').split(/\s/).forEach(function (event) {
	        findHandlers(element, event, fn, selector).forEach(function (handler) {
	            delete handlers[id][handler.i];

	            if ('removeEventListener' in element) {
	                element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture));
	            }
	        });
	    });
	}

	var returnTrue = function returnTrue() {
	    return true;
	},
	    returnFalse = function returnFalse() {
	    return false;
	},
	    ignoreProperties = /^([A-Z]|returnValue$|layer[XY]$)/,
	    eventMethods = {
	    preventDefault: 'isDefaultPrevented',
	    stopImmediatePropagation: 'isImmediatePropagationStopped',
	    stopPropagation: 'isPropagationStopped'
	};

	function compatible(event, source) {
	    if (source || !event.isDefaultPrevented) {
	        source || (source = event);

	        var _loop = function (_name) {
	            var sourceMethod = source[_name];
	            var predicate = eventMethods[_name];

	            event[_name] = function () {
	                this[predicate] = returnTrue;

	                return sourceMethod && sourceMethod.apply(source, arguments);
	            };

	            event[predicate] = returnFalse;
	        };

	        for (var _name in eventMethods) {
	            _loop(_name);
	        }

	        if (source.defaultPrevented !== undefined ? source.defaultPrevented : 'returnValue' in source ? source.returnValue === false : source.getPreventDefault && source.getPreventDefault()) {
	            event.isDefaultPrevented = returnTrue;
	        }
	    }

	    return event;
	}

	function createProxy(event) {
	    var key = undefined,
	        proxy = {
	        originalEvent: event
	    };

	    for (key in event) {
	        if (!ignoreProperties.test(key) && event[key] !== undefined) {
	            proxy[key] = event[key];
	        }
	    }

	    return compatible(proxy, event);
	}

	_privateJs._leoDom.setApi(_coreJs.leoDom, {
	    event: {
	        add: add,
	        remove: remove
	    },

	    proxy: function proxy(fn, context) {
	        var args = 2 in arguments && _constJs.slice.call(arguments, 2);

	        if (isFunction(fn)) {
	            var proxyFn = function proxyFn() {
	                return fn.apply(context, args ? args.concat(_constJs.slice.call(arguments)) : arguments);
	            };

	            proxyFn._zid = zid(fn);

	            return proxyFn;
	        } else if (isString(context)) {
	            if (args) {
	                args.unshift(fn[context], fn);

	                return _coreJs.leoDom.proxy.apply(null, args);
	            } else {
	                return _coreJs.leoDom.proxy(fn[context], fn);
	            }
	        } else {
	            throw new TypeError("expected function");
	        }
	    },

	    $on: function $on(elems, event, selector, data, callback, one) {
	        var autoRemove = undefined,
	            delegator = undefined;

	        if (event && !isString(event)) {
	            for (var type in event) {
	                var fn = event[type];

	                _coreJs.leoDom.$on(elems, type, selector, data, fn, one);
	            }

	            return;
	        }

	        if (!isString(selector) && !isFunction(callback) && callback !== false) {
	            callback = data;
	            data = selector;
	            selector = undefined;
	        }

	        if (callback === undefined || data === false) {
	            callback = data;
	            data = undefined;
	        }

	        if (callback === false) {
	            callback = returnFalse;
	        }

	        _coreJs.leoDom.$(elems).forEach(function (element) {
	            if (one) {
	                autoRemove = function (e) {
	                    remove(element, e.type, callback);
	                    return callback.apply(this, arguments);
	                };
	            }

	            if (selector) {
	                delegator = function (e) {
	                    var evt = undefined,
	                        match = _coreJs.leoDom.$closest(e.target, selector, element)[0];

	                    if (match && match !== element) {
	                        evt = _coreJs.leoDom.extend(createProxy(e), {
	                            currentTarget: match,
	                            liveFired: element
	                        });

	                        return (autoRemove || callback).apply(match, [evt].concat(_constJs.slice.call(arguments, 1)));
	                    }
	                };
	            }

	            add(element, event, callback, data, selector, delegator || autoRemove);
	        });
	    },

	    $one: function $one(elems, event, selector, data, callback) {
	        return _coreJs.leoDom.$on(elems, event, selector, data, callback, 1);
	    },

	    $off: function $off(elems, event, selector, callback) {
	        if (event && !isString(event)) {
	            for (var type in event) {
	                var fn = event[type];

	                _coreJs.leoDom.$off(elems, type, selector, fn);
	            }

	            return;
	        }

	        if (!isString(selector) && !isFunction(callback) && callback !== false) {
	            callback = selector;
	            selector = undefined;
	        }

	        if (callback === false) {
	            callback = returnFalse;
	        }

	        _coreJs.leoDom.$(elems).forEach(function (elem) {
	            remove(elem, event, callback, selector);
	        });
	    },

	    $trigger: function $trigger(selector, event, args) {
	        event = isString(event) || _coreJs.leoDom.isPlainObject(event) ? _coreJs.leoDom.Event(event) : compatible(event);
	        event._args = args;

	        _coreJs.leoDom.$(selector).forEach(function (elem) {
	            if (event.type in focus && typeof elem[event.type] == "function") {
	                elem[event.type]();
	            } else if ('dispatchEvent' in elem) {
	                elem.dispatchEvent(event);
	            } else {
	                _coreJs.leoDom.$triggerHandler(elem, event, args);
	            }
	        });
	    },

	    $triggerHandler: function $triggerHandler(selector, event, args) {
	        var e = undefined,
	            result = undefined;

	        _coreJs.leoDom.$(selector).forEach(function (element, i) {
	            e = createProxy(isString(event) ? _coreJs.leoDom.Event(event) : event);
	            e._args = args;
	            e.target = element;
	            findHandlers(element, event.type || event).some(function (handler, i) {
	                result = handler.proxy(e);

	                if (e.isImmediatePropagationStopped()) {
	                    return true;
	                }
	            });
	        });

	        return result;
	    },

	    Event: function Event(type, props) {
	        if (!isString(type)) {
	            props = type;
	            type = props.type;
	        }

	        var event = _constJs.document.createEvent(specialEvents[type] || 'Events'),
	            bubbles = true;

	        if (props) {
	            for (var _name2 in props) {
	                _name2 == 'bubbles' ? bubbles = !!props[_name2] : event[_name2] = props[_name2];
	            }
	        }

	        event.initEvent(type, bubbles, true);

	        return compatible(event);
	    }
	});

	exports.leoDom = _coreJs.leoDom;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/**
	+-------------------------------------------------------------------
	* LeoJs--dom--css.js
	+-------------------------------------------------------------------
	* @version    1.0.0 beta
	* @author     leo
	+-------------------------------------------------------------------
	*/

	"use strict";

	var _defineProperty = __webpack_require__(16)["default"];

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _privateJs = __webpack_require__(3);

	var _coreJs = __webpack_require__(5);

	var _constJs = __webpack_require__(4);

	var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
	var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");
	var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");
	var rmargin = /^margin/;
	var cssExpand = ["Top", "Right", "Bottom", "Left"];
	var rdisplayswap = /^(none|table(?!-c[ea]).+)/;
	var rnumsplit = new RegExp("^(" + pnum + ")(.*)$", "i");
	var cssShow = {
	    position: "absolute",
	    visibility: "hidden",
	    display: "block"
	};
	var cssNormalTransform = {
	    letterSpacing: "0",
	    fontWeight: "400"
	};
	var cssPrefixes = ["Webkit", "Moz", "ms"];
	var emptyStyle = _constJs.document.createElement("div").style;

	(function () {
	    var boxSizingReliableVal = undefined,
	        pixelMarginRightVal = undefined,
	        container = _constJs.document.createElement("div"),
	        div = _constJs.document.createElement("div");

	    if (!div.style) {
	        return;
	    }

	    div.style.backgroundClip = "content-box";
	    div.cloneNode(true).style.backgroundClip = "";
	    _privateJs.support.clearCloneStyle = div.style.backgroundClip === "content-box";

	    container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" + "padding:0;margin-top:1px;position:absolute";
	    container.appendChild(div);

	    function computeStyleTests() {
	        div.style.cssText = "-webkit-box-sizing:border-box;box-sizing:border-box;" + "display:block;position:absolute;" + "margin:0;margin-top:1%;margin-right:50%;" + "border:1px;padding:1px;" + "top:1%;width:50%;height:4px";
	        div.innerHTML = "";
	        _constJs.documentElement.appendChild(container);

	        var divStyle = window.getComputedStyle(div);
	        boxSizingReliableVal = divStyle.height === "4px";
	        pixelMarginRightVal = divStyle.marginRight === "4px";

	        _constJs.documentElement.removeChild(container);
	    }

	    _coreJs.leoDom.extend(_privateJs.support, {
	        boxSizingReliable: function boxSizingReliable() {
	            if (boxSizingReliableVal == null) {
	                computeStyleTests();
	            }
	            return boxSizingReliableVal;
	        },
	        pixelMarginRight: function pixelMarginRight() {
	            if (boxSizingReliableVal == null) {
	                computeStyleTests();
	            }
	            return pixelMarginRightVal;
	        },
	        reliableMarginRight: function reliableMarginRight() {
	            var ret = undefined,
	                marginDiv = div.appendChild(_constJs.document.createElement("div"));

	            marginDiv.style.cssText = div.style.cssText = "-webkit-box-sizing:content-box;box-sizing:content-box;" + "display:block;margin:0;border:0;padding:0";
	            marginDiv.style.marginRight = marginDiv.style.width = "0";
	            div.style.width = "1px";
	            _constJs.documentElement.appendChild(container);

	            ret = !parseFloat(window.getComputedStyle(marginDiv).marginRight);

	            _constJs.documentElement.removeChild(container);
	            div.removeChild(marginDiv);

	            return ret;
	        }
	    });
	})();

	function swap(elem, options, callback, args) {
	    var ret = undefined,
	        name = undefined,
	        old = {};

	    for (name in options) {
	        old[name] = elem.style[name];
	        elem.style[name] = options[name];
	    }

	    ret = callback.apply(elem, args || []);

	    for (name in options) {
	        elem.style[name] = old[name];
	    }

	    return ret;
	}

	function adjustCSS(elem, prop, valueParts) {
	    var adjusted = undefined,
	        scale = 1,
	        maxIterations = 20,
	        currentValue = function currentValue() {
	        return _coreJs.leoDom.css(elem, prop, "");
	    },
	        initial = currentValue(),
	        unit = valueParts && valueParts[3] || (_coreJs.leoDom.cssNumber[prop] ? "" : "px"),
	        initialInUnit = (_coreJs.leoDom.cssNumber[prop] || unit !== "px" && +initial) && rcssNum.exec(_coreJs.leoDom.css(elem, prop));

	    if (initialInUnit && initialInUnit[3] !== unit) {
	        unit = unit || initialInUnit[3];
	        valueParts = valueParts || [];
	        initialInUnit = +initial || 1;

	        do {
	            scale = scale || ".5";
	            initialInUnit = initialInUnit / scale;
	            _coreJs.leoDom.style(elem, prop, initialInUnit + unit);
	        } while (scale !== (scale = currentValue() / initial) && scale !== 1 && --maxIterations);
	    }

	    if (valueParts) {
	        initialInUnit = +initialInUnit || +initial || 0;
	        adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2];
	    }

	    return adjusted;
	}

	function getStyles(elem) {
	    var view = elem.ownerDocument.defaultView;

	    if (!view.opener) {
	        view = window;
	    }

	    return view.getComputedStyle(elem);
	}

	function curCSS(elem, name, computed) {
	    var width = undefined,
	        minWidth = undefined,
	        maxWidth = undefined,
	        ret = undefined,
	        style = elem.style;

	    computed = computed || getStyles(elem);

	    if (computed) {
	        ret = computed.getPropertyValue(name) || computed[name];

	        if (ret === "" && !_coreJs.leoDom.contains(elem.ownerDocument, elem)) {
	            ret = _coreJs.leoDom.style(elem, name);
	        }

	        if (!_privateJs.support.pixelMarginRight() && rnumnonpx.test(ret) && rmargin.test(name)) {
	            width = style.width;
	            minWidth = style.minWidth;
	            maxWidth = style.maxWidth;

	            style.minWidth = style.maxWidth = style.width = ret;
	            ret = computed.width;

	            style.width = width;
	            style.minWidth = minWidth;
	            style.maxWidth = maxWidth;
	        }
	    }

	    return ret !== undefined ? ret + "" : ret;
	}

	function addGetHookIf(conditionFn, hookFn) {
	    return {
	        get: function get() {
	            if (conditionFn()) {
	                delete this.get;

	                return;
	            }

	            return (this.get = hookFn).apply(this, arguments);
	        }
	    };
	}

	function vendorPropName(name) {
	    if (name in emptyStyle) {
	        return name;
	    }

	    var capName = name[0].toUpperCase() + name.slice(1),
	        i = cssPrefixes.length;

	    while (i--) {
	        name = cssPrefixes[i] + capName;
	        if (name in emptyStyle) {
	            return name;
	        }
	    }
	}

	function setPositiveNumber(elem, value, subtract) {
	    var matches = rnumsplit.exec(value);

	    return matches ? Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") : value;
	}

	function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
	    var i = extra === (isBorderBox ? "border" : "content") ? 4 : name === "width" ? 1 : 0,
	        val = 0;

	    for (; i < 4; i += 2) {
	        if (extra === "margin") {
	            val += _coreJs.leoDom.css(elem, extra + cssExpand[i], true, styles);
	        }

	        if (isBorderBox) {
	            if (extra === "content") {
	                val -= _coreJs.leoDom.css(elem, "padding" + cssExpand[i], true, styles);
	            }

	            if (extra !== "margin") {
	                val -= _coreJs.leoDom.css(elem, "border" + cssExpand[i] + "Width", true, styles);
	            }
	        } else {
	            val += _coreJs.leoDom.css(elem, "padding" + cssExpand[i], true, styles);

	            if (extra !== "padding") {
	                val += _coreJs.leoDom.css(elem, "border" + cssExpand[i] + "Width", true, styles);
	            }
	        }
	    }

	    return val;
	}

	function getWidthOrHeight(elem, name, extra) {
	    var val = undefined,
	        valueIsBorderBox = true,
	        styles = getStyles(elem),
	        isBorderBox = _coreJs.leoDom.css(elem, "boxSizing", false, styles) === "border-box";

	    if (elem.getClientRects().length) {
	        val = elem.getBoundingClientRect()[name];
	    }

	    if (_constJs.document.msFullscreenElement && window.top !== window) {
	        val *= 100;
	    }

	    if (val <= 0 || val == null) {
	        val = curCSS(elem, name, styles);

	        if (val < 0 || val == null) {
	            val = elem.style[name];
	        }

	        if (rnumnonpx.test(val)) {
	            return val;
	        }

	        valueIsBorderBox = isBorderBox && (_privateJs.support.boxSizingReliable() || val === elem.style[name]);

	        val = parseFloat(val) || 0;
	    }

	    return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles) + "px";
	}

	_privateJs._leoDom.setApi(_coreJs.leoDom, {
	    cssHooks: {
	        opacity: {
	            get: function get(elem, computed) {
	                if (computed) {
	                    var ret = curCSS(elem, "opacity");

	                    return ret === "" ? "1" : ret;
	                }
	            }
	        }
	    },

	    cssNumber: {
	        "columnCount": true,
	        "fillOpacity": true,
	        "flexGrow": true,
	        "flexShrink": true,
	        "fontWeight": true,
	        "lineHeight": true,
	        "opacity": true,
	        "order": true,
	        "orphans": true,
	        "widows": true,
	        "zIndex": true,
	        "zoom": true
	    },

	    cssProps: {
	        "float": "cssFloat"
	    },

	    style: function style(elem, name, value, extra) {
	        if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
	            return;
	        }

	        var ret = undefined,
	            type = undefined,
	            hooks = undefined,
	            origName = _coreJs.leoDom.camelCase(name),
	            style = elem.style;

	        name = _coreJs.leoDom.cssProps[origName] || (_coreJs.leoDom.cssProps[origName] = vendorPropName(origName) || origName);
	        hooks = _coreJs.leoDom.cssHooks[name] || _coreJs.leoDom.cssHooks[origName];

	        if (value !== undefined) {
	            type = typeof value;

	            if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
	                value = adjustCSS(elem, name, ret);
	                type = "number";
	            }

	            if (value == null || value !== value) {
	                return;
	            }

	            if (type === "number") {
	                value += ret && ret[3] || (_coreJs.leoDom.cssNumber[origName] ? "" : "px");
	            }

	            if (!_privateJs.support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
	                style[name] = "inherit";
	            }

	            if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {
	                style[name] = value;
	            }
	        } else {
	            if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
	                return ret;
	            }

	            return style[name];
	        }
	    },

	    css: function css(elem, name, extra, styles) {
	        var val = undefined,
	            num = undefined,
	            hooks = undefined,
	            origName = _coreJs.leoDom.camelCase(name);

	        name = _coreJs.leoDom.cssProps[origName] || (_coreJs.leoDom.cssProps[origName] = vendorPropName(origName) || origName);
	        hooks = _coreJs.leoDom.cssHooks[name] || _coreJs.leoDom.cssHooks[origName];

	        if (hooks && "get" in hooks) {
	            val = hooks.get(elem, true, extra);
	        }

	        if (val === undefined) {
	            val = curCSS(elem, name, styles);
	        }

	        if (val === "normal" && name in cssNormalTransform) {
	            val = cssNormalTransform[name];
	        }

	        if (extra === "" || extra) {
	            num = parseFloat(val);

	            return extra === true || _coreJs.leoDom.isNumeric(num) ? num || 0 : val;
	        }

	        return val;
	    },

	    $css: function $css(selector, name, value) {
	        if (_coreJs.leoDom.isPlainObject(name)) {
	            for (var n in name) {
	                _coreJs.leoDom.$css(selector, n, name[n]);
	            }

	            return;
	        }

	        selector = _coreJs.leoDom.$(selector);

	        if (Array.isArray(name)) {
	            var i = 0,
	                elem = selector[0],
	                map = {},
	                styles = getStyles(elem),
	                len = name.length;

	            for (; i < len; i++) {
	                map[name[i]] = _coreJs.leoDom.css(elem, name[i], false, styles);
	            }

	            return map;
	        }

	        if (value === undefined) {
	            return _coreJs.leoDom.css(selector[0], name);
	        }

	        var callback = _coreJs.leoDom.isFunction(value) ? function (node, i) {
	            _coreJs.leoDom.style(node, name, value(node, i, _coreJs.leoDom.css(node, name)));
	        } : function (node, i) {
	            _coreJs.leoDom.style(node, name, value);
	        };

	        selector.forEach(function (node, i) {
	            callback(node, i);
	        });
	    }
	});

	["height", "width"].forEach(function (name) {
	    _coreJs.leoDom.cssHooks[name] = {
	        get: function get(elem, computed, extra) {
	            if (computed) {
	                return rdisplayswap.test(_coreJs.leoDom.css(elem, "display")) && (!elem.getClientRects().length || !elem.getBoundingClientRect().width) ? swap(elem, cssShow, function () {
	                    return getWidthOrHeight(elem, name, extra);
	                }) : getWidthOrHeight(elem, name, extra);
	            }
	        },

	        set: function set(elem, value, extra) {
	            var styles = extra && getStyles(elem);
	            return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, _coreJs.leoDom.css(elem, "boxSizing", false, styles) === "border-box", styles) : 0);
	        }
	    };
	});

	_coreJs.leoDom.cssHooks.marginRight = addGetHookIf(_privateJs.support.reliableMarginRight, function (elem, computed) {
	    if (computed) {
	        return swap(elem, {
	            "display": "inline-block"
	        }, curCSS, [elem, "marginRight"]);
	    }
	});

	var sizeObj = {
	    Height: "height",
	    Width: "width"
	};

	var _loop = function (_name) {
	    var type = sizeObj[_name];
	    var boxObj = {
	        padding: "inner" + _name,
	        content: type,
	        "": "outer" + _name
	    };

	    var _loop2 = function (defaultExtra) {
	        var funcName = '$' + boxObj[defaultExtra];

	        _privateJs._leoDom.setApi(_coreJs.leoDom, _defineProperty({}, funcName, function (selector, value) {
	            selector = _coreJs.leoDom.$(selector);

	            var elem = selector[0];

	            if (_coreJs.leoDom.isWindow(elem)) {
	                return elem.document.documentElement["client" + _name];
	            }

	            if (elem.nodeType === 9) {
	                var doc = elem.documentElement;

	                return Math.max(elem.body["scroll" + _name], doc["scroll" + _name], elem.body["offset" + _name], doc["offset" + _name], doc["client" + _name]);
	            }

	            var extra = defaultExtra || (value === true ? "margin" : "border");

	            if (value === undefined || typeof value === 'boolean') {
	                return _coreJs.leoDom.css(elem, type, extra);
	            }

	            var callback = _coreJs.leoDom.isFunction(value) ? function (node, i) {
	                _coreJs.leoDom.style(node, type, value(node, i, _coreJs.leoDom[funcName](node)), extra);
	            } : function (node, i) {
	                _coreJs.leoDom.style(node, type, value, extra);
	            };

	            selector.forEach(function (node, i) {
	                callback(node, i);
	            });
	        }));
	    };

	    for (var defaultExtra in boxObj) {
	        _loop2(defaultExtra);
	    }
	};

	for (var _name in sizeObj) {
	    _loop(_name);
	}

	exports.leoDom = _coreJs.leoDom;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$defineProperty = __webpack_require__(10)["default"];

	exports["default"] = function (obj, key, value) {
	  if (key in obj) {
	    _Object$defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	};

	exports.__esModule = true;

/***/ },
/* 17 */,
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/**
	+-------------------------------------------------------------------
	* LeoJs--dom--attr.js
	+-------------------------------------------------------------------
	* @version    1.0.0 beta
	* @author     leo
	+-------------------------------------------------------------------
	*/

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _privateJs = __webpack_require__(3);

	var _coreJs = __webpack_require__(5);

	var _constJs = __webpack_require__(4);

	var rclass = /[\t\r\n\f]/g;

	function getClass(elem) {
	    return elem.getAttribute && elem.getAttribute("class") || "";
	}

	_privateJs._leoDom.setApi(_coreJs.leoDom, {
	    prop: function prop(elem, name, value) {
	        var nType = elem.nodeType;

	        if (nType === 3 || nType === 8 || nType === 2) {
	            return;
	        }

	        if (value !== undefined) {
	            return elem[name] = value;
	        }

	        return elem[name];
	    },

	    $prop: function $prop(selector, name, value) {
	        if (_coreJs.leoDom.isPlainObject(name)) {
	            for (var n in name) {
	                _coreJs.leoDom.$prop(selector, n, name[n]);
	            }

	            return;
	        }

	        selector = _coreJs.leoDom.$(selector);

	        if (value === undefined) {
	            return _coreJs.leoDom.prop(selector[0], name);
	        }

	        var callback = _coreJs.leoDom.isFunction(value) ? function (node, i) {
	            _coreJs.leoDom.prop(node, name, value(node, i, _coreJs.leoDom.prop(node, name)));
	        } : function (node, i) {
	            _coreJs.leoDom.prop(node, name, value);
	        };

	        selector.forEach(function (node, i) {
	            callback(node, i);
	        });
	    },

	    $removeProp: function $removeProp(selector, name) {
	        _coreJs.leoDom.$(selector).forEach(function (node) {
	            delete node[name];
	        });
	    },

	    attr: function attr(elem, name, value) {
	        var nType = elem.nodeType;

	        if (nType === 3 || nType === 8 || nType === 2) {
	            return;
	        }

	        if (typeof elem.getAttribute === "undefined") {
	            return _coreJs.leoDom.prop(elem, name, value);
	        }

	        if (value !== undefined) {
	            if (value === null) {
	                _coreJs.leoDom.removeAttr(elem, name);
	                return;
	            }

	            elem.setAttribute(name, value + "");

	            return value;
	        }

	        var ret = elem.getAttribute(name);

	        return ret == null ? undefined : ret;
	    },

	    removeAttr: function removeAttr(elem, value) {
	        var name = undefined,
	            i = 0,
	            attrNames = value && value.match(_constJs.rnotwhite);

	        if (attrNames && elem.nodeType === 1) {
	            while (name = attrNames[i++]) {
	                elem.removeAttribute(name);
	            }
	        }
	    },

	    $attr: function $attr(selector, name, value) {
	        if (_coreJs.leoDom.isPlainObject(name)) {
	            for (var n in name) {
	                _coreJs.leoDom.$attr(selector, n, name[n]);
	            }

	            return;
	        }

	        selector = _coreJs.leoDom.$(selector);

	        if (value === undefined) {
	            return _coreJs.leoDom.attr(selector[0], name);
	        }

	        var callback = _coreJs.leoDom.isFunction(value) ? function (node, i) {
	            _coreJs.leoDom.attr(node, name, value(node, i, _coreJs.leoDom.attr(node, name)));
	        } : function (node, i) {
	            _coreJs.leoDom.attr(node, name, value);
	        };

	        selector.forEach(function (node, i) {
	            callback(node, i);
	        });
	    },

	    $removeAttr: function $removeAttr(selector, name) {
	        _coreJs.leoDom.$(selector).forEach(function (node) {
	            _coreJs.leoDom.removeAttr(node, name);
	        });
	    },

	    $addClass: function $addClass(selector, value) {
	        selector = _coreJs.leoDom.$(selector);

	        if (_coreJs.leoDom.isFunction(value)) {
	            selector.forEach(function (node, i) {
	                _coreJs.leoDom.$addClass(node, value(node, i, getClass(node)));
	            });

	            return;
	        }

	        if (typeof value === "string" && value) {
	            (function () {
	                var classes = (value || "").match(_constJs.rnotwhite) || [],
	                    cur = undefined,
	                    curValue = undefined,
	                    clazz = undefined,
	                    j = undefined,
	                    finalValue = undefined;

	                selector.forEach(function (elem, i) {
	                    curValue = getClass(elem);
	                    cur = elem.nodeType === 1 && (" " + curValue + " ").replace(rclass, " ");

	                    if (cur) {
	                        j = 0;

	                        while (clazz = classes[j++]) {
	                            if (cur.indexOf(" " + clazz + " ") < 0) {
	                                cur += clazz + " ";
	                            }
	                        }

	                        finalValue = _coreJs.leoDom.trim(cur);

	                        if (curValue !== finalValue) {
	                            elem.setAttribute("class", finalValue);
	                        }
	                    }
	                });
	            })();
	        }
	    },

	    $removeClass: function $removeClass(selector, value) {
	        selector = _coreJs.leoDom.$(selector);

	        if (_coreJs.leoDom.isFunction(value)) {
	            selector.forEach(function (node, i) {
	                _coreJs.leoDom.$removeClass(node, value(node, i, getClass(node)));
	            });

	            return;
	        }

	        if (arguments.length === 1 || typeof value === "string" && value) {
	            (function () {
	                var classes = (value || "").match(_constJs.rnotwhite) || [],
	                    cur = undefined,
	                    curValue = undefined,
	                    clazz = undefined,
	                    j = undefined,
	                    finalValue = undefined;

	                selector.forEach(function (elem, i) {
	                    curValue = getClass(elem);
	                    cur = elem.nodeType === 1 && (" " + curValue + " ").replace(rclass, " ");

	                    if (cur) {
	                        j = 0;

	                        while (clazz = classes[j++]) {
	                            while (cur.indexOf(" " + clazz + " ") > -1) {
	                                cur = cur.replace(" " + clazz + " ", " ");
	                            }
	                        }

	                        finalValue = value ? _coreJs.leoDom.trim(cur) : "";

	                        if (curValue !== finalValue) {
	                            elem.setAttribute("class", finalValue);
	                        }
	                    }
	                });
	            })();
	        }
	    },

	    $toggleClass: function $toggleClass(selector, value, stateVal) {
	        var type = typeof value;

	        if (typeof stateVal === "boolean" && type === "string") {
	            return stateVal ? _coreJs.leoDom.$addClass(selector, value) : _coreJs.leoDom.$removeClass(selector, value);
	        }

	        selector = _coreJs.leoDom.$(selector);

	        if (_coreJs.leoDom.isFunction(value)) {
	            selector.forEach(function (node, i) {
	                _coreJs.leoDom.$toggleClass(node, value(node, i, getClass(node)));
	            });

	            return;
	        }

	        selector.forEach(function (node, i) {
	            if (type === "string") {
	                var _i = 0,
	                    className = undefined,
	                    classNames = value.match(_constJs.rnotwhite) || [];

	                while (className = classNames[_i++]) {
	                    if (_coreJs.leoDom.$hasClass(node, className)) {
	                        _coreJs.leoDom.$removeClass(node, className);
	                    } else {
	                        _coreJs.leoDom.$addClass(node, className);
	                    }
	                }
	            }
	        });
	    },

	    $hasClass: function $hasClass(selector, className) {
	        selector = _coreJs.leoDom.$(selector);
	        className = " " + className + " ";

	        var i = 0,
	            l = selector.length;

	        for (; i < l; i++) {
	            if (selector[i].nodeType === 1 && (" " + getClass(selector[i]) + " ").replace(rclass, " ").indexOf(className) > -1) {
	                return true;
	            }
	        }

	        return false;
	    }
	});

	(function () {
	    var input = document.createElement("input"),
	        select = document.createElement("select"),
	        opt = select.appendChild(document.createElement("option"));

	    input.type = "checkbox";
	    _privateJs.support.checkOn = input.value !== "";
	    select.disabled = true;
	    _privateJs.support.optDisabled = !opt.disabled;
	})();

	var rreturn = /\r/g;

	_privateJs._leoDom.setApi(_coreJs.leoDom, {
	    valHooks: {
	        option: {
	            get: function get(elem) {
	                return _coreJs.leoDom.trim(elem.value);
	            }
	        },
	        select: {
	            get: function get(elem) {
	                var value = undefined,
	                    option = undefined,
	                    options = elem.options,
	                    index = elem.selectedIndex,
	                    one = elem.type === "select-one" || index < 0,
	                    values = one ? null : [],
	                    max = one ? index + 1 : options.length,
	                    i = index < 0 ? max : one ? index : 0;

	                for (; i < max; i++) {
	                    option = options[i];
	                    if ((option.selected || i === index) && (_privateJs.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) && (!option.parentNode.disabled || !_coreJs.leoDom.nodeName(option.parentNode, "optgroup"))) {

	                        value = _coreJs.leoDom.$val(option);

	                        if (one) {
	                            return value;
	                        }

	                        values.push(value);
	                    }
	                }

	                return values;
	            },

	            set: function set(elem, value) {
	                var optionSet = undefined,
	                    option = undefined,
	                    options = elem.options,
	                    values = Array.isArray(value) ? value : [value],
	                    i = options.length;

	                while (i--) {
	                    option = options[i];

	                    if (option.selected = values.indexOf(_coreJs.leoDom.valHooks.option.get(option)) > -1) {
	                        optionSet = true;
	                    }
	                }

	                if (!optionSet) {
	                    elem.selectedIndex = -1;
	                }

	                return values;
	            }
	        }
	    },

	    $val: function $val(selector, value) {
	        selector = _coreJs.leoDom.$(selector);

	        var hooks = undefined,
	            ret = undefined,
	            isFunction = undefined;

	        if (arguments.length === 1) {
	            var elem = selector[0];

	            if (elem) {
	                hooks = _coreJs.leoDom.valHooks[elem.type] || _coreJs.leoDom.valHooks[elem.nodeName.toLowerCase()];

	                if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
	                    return ret;
	                }

	                ret = elem.value;

	                return typeof ret === "string" ? ret.replace(rreturn, "") : ret == null ? "" : ret;
	            }

	            return;
	        }

	        isFunction = _coreJs.leoDom.isFunction(value);

	        selector.forEach(function (node, i) {
	            if (node.nodeType !== 1) {
	                return;
	            }

	            var val = undefined;

	            if (isFunction) {
	                val = value(node, i, _coreJs.leoDom.$val(node));
	            } else {
	                val = value;
	            }

	            if (val == null) {
	                val = "";
	            } else if (typeof val === "number") {
	                val += "";
	            } else if (Array.isArray(val)) {
	                val = val.map(function (value) {
	                    return value == null ? "" : value + "";
	                });
	            }

	            hooks = _coreJs.leoDom.valHooks[node.type] || _coreJs.leoDom.valHooks[node.nodeName.toLowerCase()];

	            if (!hooks || !("set" in hooks) || hooks.set(node, val, "value") === undefined) {
	                node.value = val;
	            }
	        });
	    }
	});

	["radio", "checkbox"].forEach(function (name) {
	    _coreJs.leoDom.valHooks[name] = {
	        set: function set(elem, value) {
	            if (Array.isArray(value)) {
	                return elem.checked = value.indexOf(_coreJs.leoDom.$val(elem)) > -1;
	            }
	        }
	    };

	    if (!_privateJs.support.checkOn) {
	        _coreJs.leoDom.valHooks[name].get = function (elem) {
	            return elem.getAttribute("value") === null ? "on" : elem.value;
	        };
	    }
	});

	exports.leoDom = _coreJs.leoDom;

/***/ },
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(23)['default'];

	var _domIndexJs = __webpack_require__(24);

	var _domIndexJs2 = _interopRequireDefault(_domIndexJs);

	console.log(_domIndexJs2['default'].version);

	// console.log(leoDom.$css('div', "background-color"), leoDom.$css('div', ["background-color", 'width']))
	// console.log($('div').css("background-color"), leoDom.$css('div', ["background-color", 'width']));
	// leoDom.$css('div', 'width', 200);
	// leoDom.$css('div', {'width': 200, 'height': 100});
	// leoDom.$css('div', 'width', function(elem, i, val){
	//     console.log(elem, i, val);
	//     return i * '50';
	// });
	// $('div').css('width', function(i, val){
	//     console.log(this, i, val);
	//     return i * '50';
	// });

	// leoDom.$on('span', 'leo', function(event){
	//     event.preventDefault();
	//     console.log(this, event);
	// });
	// leoDom.$on('a', 'click', function(event){
	//     event.preventDefault();
	//     console.log(this, event);
	// });
	_domIndexJs2['default'].$data('a', 'leo', 'hahah');
	_domIndexJs2['default'].$on(document, 'click', 'a', function (event) {
	    event.preventDefault();
	    console.log(this, event, _domIndexJs2['default'].$data(event.target, 'leo'));
	    _domIndexJs2['default'].$transition('#mBox', {
	        x: 50
	    });
	    _domIndexJs2['default'].$transition('#mBox', {
	        x: 0
	    });
	    _domIndexJs2['default'].$transition('#mBox', {
	        y: 50
	    });
	    _domIndexJs2['default'].$transition('#mBox', {
	        y: 0
	    });
	});
	// $('span').on('leo', function(event) {
	//     event.preventDefault();
	//     console.log(this, event);
	// });

	// leoDom.$trigger('span', 'leo');
	// leoDom.$triggerHandler('span', 'leo');
	// $('span').triggerHandler('leo');

	// console.log(leoDom.$width(window), leoDom.$width(document));
	// console.log($(window).width(), $(document).width());
	// console.log(leoDom.$height(window), leoDom.$height(document));
	// console.log($(window).height(), $(document).height());

	// console.log(leoDom.$width('#box'));
	// console.log($('#box').width());
	// leoDom.$width('#box', '100rem');
	// leoDom.$width('#box', '+100');
	// $('#box').width('100rem');
	// $('#box').width('+100');
	// leoDom.$width('#box', function(elem, i, val){
	//     console.log(elem, i, val);
	//     return '100rem';
	// });
	// $('#box').width(function(i, val){
	//     console.log(this, i, val);
	//     return '100rem';
	// })

	// console.log(leoDom.$height('#box'));
	// console.log($('#box').height());
	// leoDom.$height('#box', '100rem');
	// console.log(leoDom.$height('#box'));
	// console.log($('#box').height());
	// leoDom.$height('#box', '+100');
	// $('#box').height('100rem');
	// $('#box').height('+100');
	// leoDom.$height('#box', function(elem, i, val){
	//     console.log(elem, i, val);
	//     return '100rem';
	// });
	// $('#box').height(function(i, val){
	//     console.log(this, i, val);
	//     return '100rem';
	// })

	// console.log(leoDom.$innerWidth('#box'));
	// console.log($('#box').innerWidth());
	// leoDom.$innerWidth('#box', '100rem');
	// console.log(leoDom.$innerWidth('#box'));
	// console.log($('#box').innerWidth());
	// leoDom.$innerWidth('#box', '+=200');
	// $('#box').innerWidth('+=200');
	// console.log(leoDom.$innerWidth('#box'));
	// console.log($('#box').innerWidth());
	// leoDom.$innerWidth('#box', function(elem, i, val){
	//     console.log(elem, i, val);
	//     return '100rem';
	// });
	// $('#box').innerWidth(function(i, val){
	//     console.log(this, i, val);
	//     return '100rem';
	// });

	// console.log(leoDom.$outerWidth('#box'));
	// console.log($('#box').outerWidth());
	// leoDom.$outerWidth('#box', '100rem');
	// console.log(leoDom.$outerWidth('#box'));
	// console.log($('#box').outerWidth());
	// leoDom.$outerWidth('#box', '+=200');
	// $('#box').outerWidth('+=200');
	// console.log(leoDom.$outerWidth('#box'));
	// console.log($('#box').outerWidth());
	// leoDom.$outerWidth('#box', function(elem, i, val){
	//     console.log(elem, i, val);
	//     return '100rem';
	// });
	// $('#box').outerWidth(function(i, val){
	//     console.log(this, i, val);
	//     return '100rem';
	// });

	// console.log(leoDom.$innerHeight('#box'));
	// console.log($('#box').innerHeight());
	// leoDom.$innerHeight('#box', '100rem');
	// console.log(leoDom.$innerHeight('#box'));
	// console.log($('#box').innerHeight());
	// leoDom.$innerHeight('#box', '+=200');
	// $('#box').innerHeight('+=200');
	// console.log(leoDom.$innerHeight('#box'));
	// console.log($('#box').innerHeight());
	// leoDom.$innerHeight('#box', function(elem, i, val){
	//     console.log(elem, i, val);
	//     return '100rem';
	// });
	// $('#box').innerHeight(function(i, val){
	//     console.log(this, i, val);
	//     return '100rem';
	// });

	// console.log(leoDom.$outerHeight('#box'));
	// console.log($('#box').outerHeight());
	// leoDom.$outerHeight('#box', '100rem');
	// console.log(leoDom.$outerHeight('#box'));
	// console.log($('#box').outerHeight());
	// leoDom.$outerHeight('#box', '+=200');
	// $('#box').outerHeight('+=200');
	// console.log(leoDom.$outerHeight('#box'));
	// console.log($('#box').outerHeight());
	// leoDom.$outerHeight('#box', function(elem, i, val){
	//     console.log(elem, i, val);
	//     return '100rem';
	// });
	// $('#box').outerHeight(function(i, val){
	//     console.log(this, i, val);
	//     return '100rem';
	// });

	var div = _domIndexJs2['default'].$tag('div');
	var div1 = _domIndexJs2['default'].$qsa('div');

	var i = _domIndexJs2['default'].$tag('input');
	var i1 = _domIndexJs2['default'].$qsa('input');

	var result = _domIndexJs2['default'].$id('result');

	console.log(div, _domIndexJs2['default'].isNodeList(div), div1, _domIndexJs2['default'].isNodeList(div1));

	console.log(i, _domIndexJs2['default'].isNodeList(i), i1, _domIndexJs2['default'].isNodeList(i1));

	console.log(_domIndexJs2['default'].isNodeList(result));

	console.log(i1 instanceof window.NodeList);

/***/ },
/* 23 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	};

	exports.__esModule = true;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/**
	+-------------------------------------------------------------------
	* LeoJs--dom--index.js
	+-------------------------------------------------------------------
	* @version    1.0.0 beta
	* @author     leo
	+-------------------------------------------------------------------
	*/

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	__webpack_require__(5);

	__webpack_require__(25);

	__webpack_require__(2);

	__webpack_require__(18);

	__webpack_require__(15);

	__webpack_require__(8);

	__webpack_require__(26);

	__webpack_require__(7);

	var _eventJs = __webpack_require__(14);

	Object.defineProperty(_eventJs.leoDom, "version", {
	    get: function get() {
	        return 'leoDom-1.0';
	    },
	    enumerable: false,
	    configurable: false
	});

	exports["default"] = _eventJs.leoDom;
	module.exports = exports["default"];

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/**
	+-------------------------------------------------------------------
	* LeoJs--dom--traversing.js
	+-------------------------------------------------------------------
	* @version    1.0.0 beta
	* @author     leo
	+-------------------------------------------------------------------
	*/

	"use strict";

	var _defineProperty = __webpack_require__(16)["default"];

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _privateJs = __webpack_require__(3);

	var _coreJs = __webpack_require__(5);

	var _constJs = __webpack_require__(4);

	function sibling(cur, dir) {
	    while ((cur = cur[dir]) && cur.nodeType !== 1) {}

	    return cur;
	}

	_privateJs._leoDom.setApi(_coreJs.leoDom, {
	    dir: function dir(elem, _dir, until) {
	        var matched = [],
	            truncate = until !== undefined;

	        while ((elem = elem[_dir]) && elem.nodeType !== 9) {
	            if (elem.nodeType === 1) {
	                if (truncate && _coreJs.leoDom.$is(elem, until)) {
	                    break;
	                }

	                matched.push(elem);
	            }
	        }

	        return matched;
	    },

	    sibling: function sibling(n, elem) {
	        var matched = [];

	        for (; n; n = n.nextSibling) {
	            if (n.nodeType === 1 && n !== elem) {
	                matched.push(n);
	            }
	        }

	        return matched;
	    }
	});

	var rparentsprev = /^(?:parents|prev(?:Until|All))/;

	var guaranteedUnique = {
	    children: true,
	    contents: true,
	    next: true,
	    prev: true
	};

	var treeObj = {
	    parent: function parent(elem) {
	        var parent = elem.parentNode;
	        return parent && parent.nodeType !== 11 ? parent : null;
	    },
	    parents: function parents(elem) {
	        return _coreJs.leoDom.dir(elem, "parentNode");
	    },
	    parentsUntil: function parentsUntil(elem, i, until) {
	        return _coreJs.leoDom.dir(elem, "parentNode", until);
	    },
	    next: function next(elem) {
	        return sibling(elem, "nextSibling");
	    },
	    prev: function prev(elem) {
	        return sibling(elem, "previousSibling");
	    },
	    nextAll: function nextAll(elem) {
	        return _coreJs.leoDom.dir(elem, "nextSibling");
	    },
	    prevAll: function prevAll(elem) {
	        return _coreJs.leoDom.dir(elem, "previousSibling");
	    },
	    nextUntil: function nextUntil(elem, i, until) {
	        return _coreJs.leoDom.dir(elem, "nextSibling", until);
	    },
	    prevUntil: function prevUntil(elem, i, until) {
	        return _coreJs.leoDom.dir(elem, "previousSibling", until);
	    },
	    siblings: function siblings(elem) {
	        return _coreJs.leoDom.sibling((elem.parentNode || {}).firstChild, elem);
	    },
	    children: function children(elem) {
	        return _coreJs.leoDom.sibling(elem.firstChild);
	    },
	    contents: function contents(elem) {
	        return elem.contentDocument || _constJs.slice.call(elem.childNodes);
	    }
	};

	var _loop = function (_name) {
	    var fn = treeObj[_name];
	    _privateJs._leoDom.setApi(_coreJs.leoDom, _defineProperty({}, '$' + _name, function (selector, until, treeSelector) {
	        selector = _coreJs.leoDom.$(selector);

	        var matched = selector.map(function (elem, i) {
	            return fn(elem, i, until);
	        });

	        matched = _constJs.concat.apply([], matched);

	        if (_name.slice(-5) !== "Until") {
	            treeSelector = until;
	        }

	        if (treeSelector && typeof treeSelector === "string") {
	            matched = _coreJs.leoDom.$filter(matched, treeSelector);
	        }

	        if (selector.length > 1) {
	            if (!guaranteedUnique[_name]) {
	                _coreJs.leoDom.uniqueSort(matched);
	            }

	            if (rparentsprev.test(_name)) {
	                matched.reverse();
	            }
	        }

	        return matched;
	    }));
	};

	for (var _name in treeObj) {
	    _loop(_name);
	}

	exports.leoDom = _coreJs.leoDom;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/**
	+-------------------------------------------------------------------
	* LeoJs--dom--offset.js
	+-------------------------------------------------------------------
	* @version    1.0.0 beta
	* @author     leo
	+-------------------------------------------------------------------
	*/

	"use strict";

	var _defineProperty = __webpack_require__(16)["default"];

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _privateJs = __webpack_require__(3);

	var _cssJs = __webpack_require__(15);

	var _constJs = __webpack_require__(4);

	function getWindow(elem) {
	    return _cssJs.leoDom.isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
	}

	var scrollObj = {
	    scrollLeft: "pageXOffset",
	    scrollTop: "pageYOffset"
	};

	var _loop = function (method) {
	    var prop = scrollObj[method];
	    var top = "pageYOffset" === prop;
	    var $method = '$' + method;

	    _privateJs._leoDom.setApi(_cssJs.leoDom, _defineProperty({}, $method, function (selector, val) {
	        selector = _cssJs.leoDom.$(selector);

	        if (val === undefined) {
	            var elem = selector[0];
	            var win = getWindow(elem);

	            return win ? win[prop] : elem[method];
	        }

	        var callback = _cssJs.leoDom.isFunction(val) ? function (node, i) {
	            _cssJs.leoDom[$method](node, val(node, i));
	        } : function (node, i) {
	            var win = getWindow(node);

	            if (win) {
	                win.scrollTo(!top ? val : win.pageXOffset, top ? val : win.pageYOffset);
	            } else {
	                node[method] = val;
	            }
	        };

	        selector.forEach(function (node, i) {
	            callback(node, i);
	        });
	    }));
	};

	for (var method in scrollObj) {
	    _loop(method);
	}

	_privateJs._leoDom.setApi(_cssJs.leoDom, {
	    $offsetParent: function $offsetParent(selector) {
	        return _cssJs.leoDom.$(selector).map(function (node) {
	            var offsetParent = node.offsetParent;

	            while (offsetParent && _cssJs.leoDom.css(offsetParent, "position") === "static") {
	                offsetParent = offsetParent.offsetParent;
	            }

	            return offsetParent || _constJs.documentElement;
	        });
	    },

	    $position: function $position(selector) {
	        selector = _cssJs.leoDom.$(selector);

	        if (!selector[0]) {
	            return;
	        }

	        var offsetParent = undefined,
	            offset = undefined,
	            elem = selector[0],
	            parentOffset = {
	            top: 0,
	            left: 0
	        };

	        if (_cssJs.leoDom.css(elem, "position") === "fixed") {
	            offset = elem.getBoundingClientRect();
	        } else {
	            offsetParent = _cssJs.leoDom.$offsetParent(selector);
	            offset = _cssJs.leoDom.$offset(selector);

	            if (!_cssJs.leoDom.nodeName(offsetParent[0], "html")) {
	                parentOffset = _cssJs.leoDom.$offset(offsetParent);
	            }

	            parentOffset.top += _cssJs.leoDom.css(offsetParent[0], "borderTopWidth", true) - _cssJs.leoDom.$scrollTop(offsetParent);
	            parentOffset.left += _cssJs.leoDom.css(offsetParent[0], "borderLeftWidth", true) - _cssJs.leoDom.$scrollLeft(offsetParent);
	        }

	        return {
	            top: offset.top - parentOffset.top - _cssJs.leoDom.css(elem, "marginTop", true),
	            left: offset.left - parentOffset.left - _cssJs.leoDom.css(elem, "marginLeft", true)
	        };
	    },

	    $offset: function $offset(selector, options) {
	        selector = _cssJs.leoDom.$(selector);

	        if (options) {
	            selector.forEach(function (node, i) {
	                _cssJs.leoDom.setOffset(node, options, i);
	            });

	            return;
	        }

	        var docElem = undefined,
	            win = undefined,
	            rect = undefined,
	            doc = undefined,
	            elem = selector[0];

	        if (!elem) {
	            return;
	        }

	        if (!elem.getClientRects().length) {
	            return {
	                top: 0,
	                left: 0
	            };
	        }

	        rect = elem.getBoundingClientRect();

	        if (rect.width || rect.height) {
	            doc = elem.ownerDocument;
	            win = getWindow(doc);
	            docElem = doc.documentElement;

	            return {
	                top: rect.top + win.pageYOffset - docElem.clientTop,
	                left: rect.left + win.pageXOffset - docElem.clientLeft
	            };
	        }

	        return rect;
	    },

	    setOffset: function setOffset(elem, options, i) {
	        var curPosition = undefined,
	            curLeft = undefined,
	            curCSSTop = undefined,
	            curTop = undefined,
	            curOffset = undefined,
	            curCSSLeft = undefined,
	            calculatePosition = undefined,
	            position = _cssJs.leoDom.css(elem, "position"),
	            curElem = _cssJs.leoDom.$(elem),
	            props = {};

	        if (position === "static") {
	            elem.style.position = "relative";
	        }

	        curOffset = _cssJs.leoDom.$offset(curElem);
	        curCSSTop = _cssJs.leoDom.css(elem, "top");
	        curCSSLeft = _cssJs.leoDom.css(elem, "left");
	        calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1;

	        if (calculatePosition) {
	            curPosition = _cssJs.leoDom.$position(curElem);
	            curTop = curPosition.top;
	            curLeft = curPosition.left;
	        } else {
	            curTop = parseFloat(curCSSTop) || 0;
	            curLeft = parseFloat(curCSSLeft) || 0;
	        }

	        if (_cssJs.leoDom.isFunction(options)) {
	            options = options(elem, i, _cssJs.leoDom.extend({}, curOffset));
	        }

	        if (options.top != null) {
	            props.top = options.top - curOffset.top + curTop;
	        }
	        if (options.left != null) {
	            props.left = options.left - curOffset.left + curLeft;
	        }

	        if ("using" in options) {
	            options.using(elem, props);
	        } else {
	            _cssJs.leoDom.$css(curElem, props);
	        }
	    }
	});

	exports.leoDom = _cssJs.leoDom;

/***/ }
/******/ ]);