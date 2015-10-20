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

	module.exports = __webpack_require__(21);


/***/ },
/* 1 */,
/* 2 */,
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
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
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
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _domEventJs = __webpack_require__(14);

	// leoDom.$on('span', 'leo', function(event){
	//     event.preventDefault();
	//     console.log(this, event);
	// });

	// $('span').on('leo', function(event) {
	//     event.preventDefault();
	//     console.log(this, event);
	// });

	// leoDom.$trigger('span', 'leo');
	// leoDom.$triggerHandler('span', 'leo');
	// $('span').triggerHandler('leo');

	// leoDom.$on(document, 'click', 'li', function(event){
	//     // event.preventDefault();
	//     // event.stopPropagation();
	//     // event.stopImmediatePropagation();
	//     console.log(this, event, event.target);
	//     // return false;
	// });

	// $(document).on('click', 'li', function(event) {
	//     // event.preventDefault();
	//     // event.stopPropagation();
	//     // event.stopImmediatePropagation();
	//     console.log(this, event, event.target);
	// });

	// leoDom.$on('li', 'click', function(event){
	//     // event.preventDefault();
	//     // event.stopPropagation();
	//     // event.stopImmediatePropagation();
	//     console.log(this, event, event.target);
	// });
	// leoDom.$on('li', 'click.leo', function(event){
	//     // event.preventDefault();
	//     // event.stopPropagation();
	//     // event.stopImmediatePropagation();
	//     console.log(this, event, event.target, 'leo');
	// });
	// leoDom.$on('li', 'mouseenter', function(event){
	//     // event.preventDefault();
	//     // event.stopPropagation();
	//     // event.stopImmediatePropagation();
	//     console.log(this, event, event.target, 'leo');
	// });
	// leoDom.$one('li', 'click', function(event){
	//     // event.preventDefault();
	//     event.stopPropagation();
	//     // event.stopImmediatePropagation();
	//     console.log(this, event, event.target, 'leo');
	// });
	// leoDom.$off('li');
	// $('li').on('click', function(event) {
	//     // event.preventDefault();
	//     // event.stopPropagation();
	//     // event.stopImmediatePropagation();
	//     console.log(this, event, event.target);
	// });

	// jQuery(document).on('click', 'li', function(event) {
	//     event.preventDefault();
	//     event.stopPropagation();
	//     event.stopImmediatePropagation();
	//     console.log(this, event, event.target);
	//     return false;
	// });

	// leoDom.$on(document, 'click', function(event){
	//     event.preventDefault();
	//     console.log(this, event, event.target);
	// });
	// jQuery(document).on('click', 'li', function(event) {
	//     event.preventDefault();
	//     console.log(this, event, event.target);
	// });

	// $(document).on('click', function(event) {
	//     event.preventDefault();
	//     console.log(this, event, event.target);
	// });

	// leoDom.$on('#btn', 'click', function(event){
	//     event.preventDefault();
	//     console.log(this, event);
	// });

	// $('#btn').on('click', function(event) {
	//     event.preventDefault();
	//     console.log(this, event);
	// });

/***/ }
/******/ ]);