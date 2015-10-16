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

	module.exports = __webpack_require__(33);


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
	};

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
	};

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
	};

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
	    return !!(node && node.nodeName && (node.nodeType == 1 || node.nodeType == 11));
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
/* 7 */,
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
/* 14 */,
/* 15 */
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
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
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

	var _defineProperty = __webpack_require__(15)["default"];

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
	};

	exports.leoDom = _coreJs.leoDom;

/***/ },
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	__webpack_require__(8);

	var _domWrapJs = __webpack_require__(34);

	var ap = _domWrapJs.leoDom.$('.ap');
	// let inner = leoDom.$('.inner');
	// leoDom.$data(ap, {'leo': '2342342342', 'leo1': 'hahah'});
	// $(ap).data({'leo': '2342342342', 'leo1': 'hahah'})
	// console.log(leoDom.$data(ap), $(ap).data());
	// leoDom.$wrapAll('.inner', '<p>Test</p>');
	// $('.inner').wrapAll('<p>Test</p>');
	// leoDom.$wrapAll('.inner', ap);
	// $('.inner').wrapAll(ap);
	// leoDom.$wrapAll('.inner', document.createTextNode("leoleoleo"));
	// $(".inner").wrapAll(document.createTextNode("leoleoleo"));
	// leoDom.$wrapAll('.inner', function(elem){
	//     console.log(elem);
	//     return '<div></div>';
	// });
	// $('.inner').wrapAll(function(){
	//     console.log(this);
	//     return '<div></div>';
	// });
	// console.log(leoDom.$data(leoDom.$('.ap')[2]), $($('.ap')[2]).data());

	// let inner = leoDom.$('.inner');
	// leoDom.$data(ap, {'leo': '2342342342', 'leo1': 'hahah'});
	// $(ap).data({'leo': '2342342342', 'leo1': 'hahah'})
	// console.log(leoDom.$data(ap), $(ap).data());
	// leoDom.$wrapInner('.inner', '<p>Test</p>');
	// $('.inner').wrapInner('<p>Test</p>');
	// leoDom.$wrapInner('.inner', ap);
	// $('.inner').wrapInner(ap);
	// leoDom.$wrapInner('.inner', document.createTextNode("leoleoleo"));
	// $(".inner").wrapInner(document.createTextNode("leoleoleo"));
	// leoDom.$wrapInner('.inner', function(elem, i){
	//     console.log(elem, i);
	//     return '<div>' + i + '</div>';;
	// });
	// $('.inner').wrapInner(function(i){
	//     console.log(this, i);
	//     return '<div>' + i + '</div>';
	// });
	// console.log(leoDom.$data(leoDom.$('.ap')[2]), $($('.ap')[2]).data());

	// leoDom.$data(ap, {'leo': '2342342342', 'leo1': 'hahah'});
	// $(ap).data({'leo': '2342342342', 'leo1': 'hahah'})
	// console.log(leoDom.$data(ap), $(ap).data());
	// leoDom.$wrap('.inner', '<p>Test</p>');
	// $('.inner').wrap('<p>Test</p>');
	// leoDom.$wrap('.inner', ap);
	// $('.inner').wrap(ap);
	// leoDom.$wrap('.inner', document.createTextNode("leoleoleo"));
	// $(".inner").wrap(document.createTextNode("leoleoleo"));
	// leoDom.$wrap('.inner', function(elem, i){
	//     console.log(elem, i);
	//     return '<div>' + i + '</div>';
	// });
	// $('.inner').wrap(function(i){
	//     console.log(this, i);
	//     return '<div>' + i + '</div>';
	// });
	// console.log(leoDom.$data(leoDom.$('.ap')[2]), $($('.ap')[2]).data());

	// leoDom.$unwrap('.inner');
	// $('.inner').unwrap();

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/**
	+-------------------------------------------------------------------
	* LeoJs--dom--wrap.js
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

	__webpack_require__(25);

	var _manipulationJs = __webpack_require__(2);

	_privateJs._leoDom.setApi(_manipulationJs.leoDom, {
	    $wrapAll: function $wrapAll(selector, html) {
	        selector = _manipulationJs.leoDom.$(selector);

	        var elem = selector[0];

	        if (elem) {
	            if (_manipulationJs.leoDom.isFunction(html)) {
	                html = html(elem);
	            }

	            var wrap = _manipulationJs.leoDom.$(html, elem.ownerDocument)[0];

	            if (!wrap) {
	                return;
	            }

	            wrap = _manipulationJs.leoDom.$clone(wrap, true)[0];

	            if (elem.parentNode) {
	                elem.parentNode.insertBefore(wrap, elem);
	            }

	            while (wrap.firstElementChild) {
	                wrap = wrap.firstElementChild;
	            }

	            _manipulationJs.leoDom.$append(wrap, selector);
	        }
	    },

	    $wrapInner: function $wrapInner(selector, html) {
	        selector = _manipulationJs.leoDom.$(selector);

	        if (_manipulationJs.leoDom.isFunction(html)) {
	            return selector.forEach(function (node, i) {
	                _manipulationJs.leoDom.$wrapInner(node, html(node, i));
	            });
	        }

	        selector.forEach(function (node) {
	            var contents = _manipulationJs.leoDom.$contents(node);

	            if (contents.length) {
	                _manipulationJs.leoDom.$wrapAll(contents, html);
	            } else {
	                _manipulationJs.leoDom.$append(node, html);
	            }
	        });
	    },

	    $wrap: function $wrap(selector, html) {
	        selector = _manipulationJs.leoDom.$(selector);

	        var isFunction = _manipulationJs.leoDom.isFunction(html);

	        selector.forEach(function (node, i) {
	            _manipulationJs.leoDom.$wrapAll(node, isFunction ? html(node, i) : html);
	        });
	    },

	    $unwrap: function $unwrap(selector, unwrapSelector) {
	        _manipulationJs.leoDom.$not(_manipulationJs.leoDom.$parent(selector, unwrapSelector), 'body').forEach(function (elem) {
	            _manipulationJs.leoDom.$replaceWith(elem, elem.childNodes);
	        });
	    }
	});

	exports.leoDom = _manipulationJs.leoDom;

/***/ }
/******/ ]);