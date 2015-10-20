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

	module.exports = __webpack_require__(28);


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
/* 13 */,
/* 14 */,
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
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
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

/***/ },
/* 27 */,
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _domOffsetJs = __webpack_require__(26);

	// console.log(leoDom.$offsetParent('li.item-a'));
	// console.log($('li.item-a').offsetParent());
	// leoDom.$scrollLeft("div.demo", 300);
	// console.log(leoDom.$scrollLeft("div.demo"), $("div.demo").scrollLeft())
	// leoDom.$scrollTop("div.demo", 300);
	// console.log(leoDom.$scrollTop("div.demo"), $("div.demo").scrollTop())
	// console.log(leoDom.$position('.item-1'), $('.item-1').position());
	// console.log(leoDom.$offset('.item-1'), $('.item-1').offset());
	// leoDom.$offset('.item-1', {top:10, left:120});
	// $('.item-1').offset({top:10, left:120});
	// leoDom.$offset('.item-1', function(elem, i, coords){
	//     console.log(elem, i, coords);
	//     return { top: 110, left: 310 };
	// });
	// $('.item-1').offset(function(i, coords) {
	//     console.log(this, i, coords);
	//     return { top: 110, left: 310 };
	// })
	// console.log(leoDom.$offset('.item-1'), $('.item-1').offset());

/***/ }
/******/ ]);