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

	module.exports = __webpack_require__(17);


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
	var indexOf = arr.indexOf;

	exports.document = document;
	exports.documentElement = documentElement;
	exports.arr = arr;
	exports.slice = slice;
	exports.concat = concat;
	exports.rnotwhite = rnotwhite;
	exports.indexOf = indexOf;

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
	var sortInput = undefined;
	var leoRandom = _utilJs.leoDom.generateId('leoRandom');
	var sortStable = leoRandom.split("").sort(sortOrder).join("") === leoRandom;
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

	if (_constJs.document.readyState === "complete" || _constJs.document.readyState !== "loading" && !_constJs.document.documentElement.doScroll) {
	    window.setTimeout(fireReady);
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

	    var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
	    if (compare) {
	        return compare;
	    }

	    compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1;

	    if (compare & 1) {
	        if (a === _constJs.document || a.ownerDocument === _constJs.document && _utilJs.leoDom.contains(_constJs.document, a)) {
	            return -1;
	        }
	        if (b === _constJs.document || b.ownerDocument === _constJs.document && _utilJs.leoDom.contains(_constJs.document, b)) {
	            return 1;
	        }

	        return sortInput ? _constJs.indexOf.call(sortInput, a) - _constJs.indexOf.call(sortInput, b) : 0;
	    }

	    return compare & 4 ? -1 : 1;
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
	            j = 0,
	            i = 0;

	        hasDuplicate = false;
	        sortInput = !sortStable && results.slice(0);
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

	        sortInput = null;

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

	"Boolean Number String Function Array Date RegExp Object Error".replace(/[^, ]+/g, function (name) {
	    class2type["[object " + name + "]"] = name.toLowerCase();
	});

	leoDom.noop = function () {};

	leoDom.error = function (msg) {
	    throw new Error(msg);
	};

	leoDom.inArray = function (elem, arr, i) {
	    return arr == null ? -1 : _constJs.indexOf.call(arr, elem, i);
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
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _domAttrJs = __webpack_require__(18);

	// console.log(leoDom.$prop('input', 'checked'));
	// console.log($('input').prop('checked'));

	// leoDom.$prop('input', 'checked', true);
	// $('input').prop('checked', true);

	// leoDom.$prop('input', {'checked': false, 'disabled': false});
	// $('input').prop({'checked': false, 'disabled': false});

	// leoDom.$prop('input', 'checked', function(elem, i, val){
	//     console.log(elem, i, val);
	//     return !val;
	// });
	// $('input').prop('checked', function(i, val){
	//     console.log(this, i, val);
	//     return !val;
	// });

	// leoDom.$prop('input', {'leo1': 12123, 'leo2': 1231231});
	// $('input').prop({'leo1': false, 'leo2': false});

	// console.log(leoDom.$prop('input', 'leo1'));
	// console.log($('input').prop('leo2'));

	// leoDom.$removeProp('input', 'leo1');
	// $('input').removeProp('leo2');

	// console.log(leoDom.$prop('input', 'leo1'));
	// console.log($('input').prop('leo2'));

	// console.log(leoDom.$attr('.greatphoto', 'alt'));
	// console.log($('.greatphoto').attr('alt'));

	// leoDom.$attr('.greatphoto', 'alt', 'hahahaahhaha');
	// $('.greatphoto').attr('alt', 'hahahaahhaha');

	// leoDom.$attr('.greatphoto', {'alt': 'oooooo', 'leo': 'tctctc'});
	// $('.greatphoto').attr({'alt': 'oooooo', 'leo': 'tctctc'});

	// leoDom.$attr('.greatphoto', 'alt', function(elem, i, attr){
	//     console.log(elem, i, attr);
	//     return !attr;
	// });
	// $('.greatphoto').attr('alt', function(i, attr){
	//     console.log(this, i, attr);
	//     return !attr;
	// });

	// leoDom.$removeAttr('.greatphoto', 'alt src');
	// $('.greatphoto').removeAttr('alt src');

	// console.log(leoDom.$val("#single"))
	// console.log($("#single").val());
	// leoDom.$val("#single", 'Single');
	// $("#single").val('Single')
	// console.log(leoDom.$val("#multiple"));
	// console.log($("#multiple").val());
	// leoDom.$val("#multiple", ['Multiple2', 'Multiple1']);
	// $("#multiple").val(['Multiple2', 'Multiple1']);
	// console.log(leoDom.$val("#multiple"));
	// console.log($("#multiple").val())
	// console.log(leoDom.$val('input[name=checkboxname]'));
	// console.log($('input[name=checkboxname]').val());
	// leoDom.$val('input[leo=tc]', ["check1", "check2", "radio1"]);
	// $("input[leo=tc]").val(["check1", "check2", "radio1"]);
	// leoDom.$val('input[leo=tc]', function(elem, i, val){
	//     console.log(elem, i, val);
	//     return val;
	// });
	// $("input[leo=tc]").val(function(i, val){
	//     console.log(this, i, val);
	//     return val;
	// });
	// console.log(leoDom.$val('.text') === $('.text').val());
	// leoDom.$val('.text', 'leosdfsdfsdfs');
	// console.log(leoDom.$val('.text'), $('.text').val());

	// console.log(leoDom.$('p:last-of-type'))

	// leoDom.$addClass('p:last-of-type', "selected highlight");
	// $('p:last-of-type').addClass("selected highlight");
	// leoDom.$addClass('p:last-of-type', function(elem, i, cls){
	//     console.log(elem, i, cls);
	//     return 'aaa';
	// });
	// $('p:last-of-type').addClass(function(i, cls){
	//     console.log(this, i, cls);
	//     return 'vvv'
	// });
	// console.log(leoDom.$hasClass('p:last-of-type','highlight'));
	// leoDom.$removeClass('p:last-of-type', "highlight");
	// leoDom.$removeClass('p:last-of-type', function(elem, i, cls){
	//     console.log(elem, i, cls);
	//     return 'aaa';
	// });
	// $('p:last-of-type').removeClass(function(i, cls){
	//     console.log(this, i, cls);
	//     return 'vvv'
	// });
	// console.log(leoDom.$hasClass('p:last-of-type','selected highlight'));
	// $("p:last").addClass("selected highlight");

	// $('#btn').on('click', function(event) {
	//     event.preventDefault();
	//     // $('p').toggleClass("selected highlight");
	//     leoDom.$toggleClass('p', "selected highlight");
	// });

/***/ },
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
	                    if (stateVal === false || stateVal !== true && _coreJs.leoDom.$hasClass(node, className)) {
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
	                    one = elem.type === "select-one",
	                    values = one ? null : [],
	                    max = one ? index + 1 : options.length,
	                    i = index < 0 ? max : one ? index : 0;

	                for (; i < max; i++) {
	                    option = options[i];
	                    if ((option.selected || i === index) && !option.disabled && (!option.parentNode.disabled || !_coreJs.leoDom.nodeName(option.parentNode, "optgroup"))) {

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

/***/ }
/******/ ]);