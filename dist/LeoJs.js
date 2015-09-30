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

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	+-------------------------------------------------------------------
	* LeoJs--index.js
	+-------------------------------------------------------------------
	* @version    1.0.0 beta
	* @author     leo
	+-------------------------------------------------------------------
	*/

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

	var _utilIndexJs = __webpack_require__(2);

	var util = _interopRequireWildcard(_utilIndexJs);

	var _domIndexJs = __webpack_require__(3);

	var Dom = _interopRequireWildcard(_domIndexJs);

	var LeoJs = {},
	    LeoJsId = util.api.generateId();

	Object.defineProperty(LeoJs, "version", {
	    get: function get() {
	        return 'LeoJs-1.0';
	    },
	    enumerable: false,
	    configurable: false
	});

	Object.defineProperty(LeoJs, "id", {
	    get: function get() {
	        return LeoJsId;
	    },
	    enumerable: false,
	    configurable: false
	});

	// let s = Symbol('leo');

	// console.log(s.toString())

	// let dom = new Dom();
	// let body = document.getElementById('leo');
	//     let a = dom.getDom('.leo').filter('#abc').get();
	// console.log(a)

	// console.log(body.insertAdjacentHTML('afterend', a))
	var dApi = Dom.dApi;
	// let a = dApi.$('.leo')
	// console.log(dApi.$is({selector: 'h1', context: dApi.$('#iframe')[0].contentWindow.document}, '.leo'))
	// console.log($('h1').is('.leo'))
	// console.log(dApi.$filter('.leo', 'h1'))
	// console.log($('.leo').filter('h1'))
	// console.log(dApi.$find('#leo', 'h2'))
	// console.log($('#leo').find('h2'))
	// console.log(dApi.$add('#leo', 'h2'))
	// console.log($('#leo').add('h2'))
	// console.log(dApi.$has('.leo', 'h2'))
	// console.log($('.leo').has('h2'))
	// console.log(dApi.$('#iframe')[0].contentWindow.document.body)
	// console.log(dApi.$closest('#in', '#h2', '#leo'))
	// console.log($('#in').closest('#h2', '#leo'))
	// console.log(dApi.$parent('#in', 'div'))
	// console.log($('#in').parent('div'))
	// console.log(dApi.$parents('#in'))
	// console.log($('#in').parents())
	// console.log(dApi.$parentsUntil('h1', 'body', 'div'))
	// console.log($('h1').parentsUntil('body', 'div'))
	// console.log(dApi.$next('#h2', '#eee'))
	// console.log($('#h2').next('#eee'))
	// console.log(dApi.$prev('#h2'))
	// console.log($('#h2').prev())
	// console.log(dApi.$nextAll('#h2', 'h1'))
	// console.log($('#h2').nextAll('h1'))
	// console.log(dApi.$prevAll('#last'))
	// console.log($('#last').prevAll())
	// console.log(dApi.$nextUntil('#frist', '#last', 'div'))
	// console.log($('#frist').nextUntil('#last', 'div'))
	// console.log(dApi.$prevUntil('#last', '#frist', 'h1'))
	// console.log($('#last').prevUntil('#frist', 'h1'))
	// console.log(dApi.$siblings('#last'))
	// console.log($('#last').siblings())
	// console.log(dApi.$children('div'))
	// console.log($('div').children())
	// console.log(dApi.$contents('div'))
	// console.log($('div').contents())
	// console.log(dApi.$remove('.remove'))
	// console.log($('.remove').remove('.span'))
	// console.log(dApi.$empty('#leo'))
	// console.log($('#leo').empty())
	// console.log(dApi.$text('.append',function(elem, i, selector){
	//     console.log(elem, i, selector)
	//     return '34243'
	// }))
	// console.log($('.append').text(function(i, text){
	//     console.log(this, i, text)
	//     return '32424'
	// }))
	// console.log(dApi.$clone('#h2'))
	// console.log($('#h2').clone())
	// console.log(dApi.$append('.append', function(elem, i, elems){
	//     console.log(elem, i, elems)
	//     return i + '';
	// }))
	// console.log($('.append').append(function(i, html){
	//     console.log(this, i, html)
	//     return i + '';
	// }));
	// console.log(dApi.$prepend('.append', 23423, 'h1'))
	// console.log($('.append').prepend($('h1'), [$('#last'), $('.leo')]))
	// console.log(dApi.$before('.append', 'h1', ['#last', '.leo']))
	// console.log($('.append').before($('h1'), [$('#last'), $('.leo')]))
	// console.log(dApi.$after('.append', function(){
	//     return '12312312'
	// }, ['#last', '.leo']))
	// console.log($('.append').after(function(){
	//     return '12312312'
	// }, [$('#last'), $('.leo')]))
	// console.log(dApi.$html('.append', function(elem, i, selector){
	//     console.log(elem, i, selector)
	//     return i + '';
	// }))
	// console.log($('.append').html(function(i, oldhtml){
	//     console.log(this, i, oldhtml)
	//     return i;
	// }))
	// console.log(dApi.$replaceWith('.append', '.append'))
	// console.log($('.append').replaceWith($('.append')))
	// console.log(dApi.$wrapAll('.append', function(elem){
	//     console.log(elem)
	//     return elem;
	// }))
	// console.log($('.append').wrapAll(function(){
	//     console.log(this)
	//     return this;
	// }))
	// console.log(dApi.$not('div', function(elem, i){
	//     console.log(elem, i)
	//     return false;
	// }))
	// console.log($('div').not(function(i, elem){
	//     return false;
	// }))
	// console.log(dApi.$wrapInner('.append', function(elem, i){
	//     console.log(elem, i)
	//     return elem;
	// }))
	// console.log($('.append').wrapInner(function(i, elem){
	//     console.log(this, i)
	//     return this;
	// }))
	// console.log(dApi.$wrap('.append', function(elem, i){
	//     console.log(elem, i)
	//     return elem;
	// }))
	// console.log($('.append').wrap(function(i){
	//     console.log(this, i)
	//     return this;
	// }))
	// console.log(dApi.$unwrap('.unwrap'))
	// console.log($('.unwrap').unwrap('#unwrap1'))
	// console.log(dApi.$prop('input[type="button"]', {'leo': function(node, i){
	//     console.log(node, i)
	//     return false;
	// }, 'lee': function(node, i){
	//     console.log(node, i)
	//     return false;
	// }}))
	// console.log($('input[type="button"]').prop('disabled', function(i, val){

	// }))
	// console.log($('input[type="button"]').prop('leo'))
	// console.log(dApi.$removeProp('input[type="button"]'))
	// console.log($('input[type="button"]').removeProp('leo'))
	// console.log($('input[type="button"]').prop('leo'))
	// console.log(dApi.$removeAttr('input[type="button"]', 'lee'))
	// console.log($('input[type="button"]').removeAttr('leo'))

	// console.log(dApi.$('#multiple option[selected]'));
	// $("#single").val("Single2");
	// $("#multiple").val(["Multiple2", "Multiple3"]);
	// $("input").val(["check1","check2", "radio1"]);
	// console.log($('#textarea').val('2342342'));
	// console.log(dApi.$val('#single'))
	// console.log($("#single").val());
	// console.log(dApi.$val("input", function(node, i){
	//     console.log(node, i)
	//     return i;
	// }));
	// console.log($("input").val(function(i, val){
	//     console.log(this, i, val)
	//     return i;
	// }));

	// $('#box').css( "width","+=200" );
	// console.log(dApi.$css('input', ['width', 'height']))
	// console.log($('input').css("width"))
	// console.log($(window).width())
	// console.log(dApi.$width(window))
	// console.log($('#class').hasClass('leo sdfsdfs'))
	// console.log(dApi.$hasClass('#class', 'leo sdfsdfs'))

	// console.log(dApi.$scrollTop('.demo', 1000))
	// console.log($('.demo').scrollLeft(function(i, left){
	//     console.log(this,i,left)
	//     return 200;
	// }))
	// console.log($('.item-1').offsetParent())
	// console.log(dApi.$offsetParent('.item-1'))
	// console.log($('input').offset({
	//     using(props){
	//         console.log(this, props)
	//     }
	// }))
	// console.log(dApi.$offset('input',{
	//     using(elem, props){
	//         console.log(elem, props)
	//     }
	// }))
	// console.log($('.item-a').position())
	// console.log(dApi.$position('.item-a'))
	// $(function($){
	//     // console.log(this, $('#box'))
	//     // console.log($('#box').css('width'))
	//     // console.log(dApi.$css('#box', 'width'))
	// })

	// $(function($){
	//     console.log(this, $('#box'))
	//     console.log($('#box').css('width'))
	//     console.log(dApi.$css('#box', 'width'))
	// })
	// console.log($('#box').css('width') + 'leo')

	// dApi.$(function(){
	//     console.log(this)
	//     console.log($('#box').css('width'))
	//     console.log(dApi.$css('#box', 'width'))
	// })

	// console.log(dApi.$css('#box', 'width') + 'leo')
	// console.log(dApi.$data('.user', 'user', {'sdfs':'sdfsdf'}))
	// console.log(dApi.$data('.user', 'user', ''))
	// console.log($('.user').data())

	dApi.uiPosition(".positionable", {
	    of: "#parent",
	    my: 'center bottom',
	    at: 'center top',
	    collision: 'none fit',
	    within: window
	});

	dApi.$();

	exports["default"] = LeoJs;
	module.exports = exports["default"];

/***/ },
/* 2 */
/***/ function(module, exports) {

	/**
	+-------------------------------------------------------------------
	* LeoJs--util--index.js
	+-------------------------------------------------------------------
	* @version    1.0.0 beta
	* @author     leo
	+-------------------------------------------------------------------
	*/

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var api = {};
	var _api = {};
	var class2type = {};
	var toString = class2type.toString;
	var hasOwn = class2type.hasOwnProperty;

	var rword = /[^, ]+/g;
	var rgenerateId = /\d\.\d{4}/;
	var uuid = 0;

	"Boolean Number String Function Array Date RegExp Object Error".replace(rword, function (name) {
	    class2type["[object " + name + "]"] = name.toLowerCase();
	});

	api.noop = function () {};

	api.error = function (msg) {
	    throw new Error(msg);
	};

	api.isNumeric = function (obj) {
	    return !api.isArray(obj) && obj - parseFloat(obj) + 1 >= 0;
	};

	api.isEmptyObject = function (obj) {
	    for (var _name in obj) {
	        return false;
	    }

	    return true;
	};

	api.isFunction = function (obj) {
	    return api.type(obj) === "function";
	};

	api.type = function (obj) {
	    if (obj == null) {
	        return obj + "";
	    }

	    return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj;
	};

	api.generateId = function (prefix) {
	    prefix = prefix || "LeoJs";

	    return String(Math.random() + Math.random()).replace(rgenerateId, prefix);
	};

	api.getUuid = function () {
	    return 'LeoJs' + uuid++;
	};

	api.isPlainObject = function (obj) {
	    if (api.type(obj) !== "object" || obj.nodeType || obj === obj.window) {
	        return false;
	    }

	    if (obj.constructor && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
	        return false;
	    }

	    return true;
	};

	api.uniq = function (collection) {
	    return collection.filter(function (item, index) {
	        return collection.indexOf(item) === index;
	    });
	};

	api.isArray = Array.isArray;

	api.extend = function () {
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

	    if (typeof target !== "object" && !api.isFunction(target)) {
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

	                if (deep && copy && (api.isPlainObject(copy) || (copyIsArray = api.isArray(copy)))) {

	                    if (copyIsArray) {
	                        copyIsArray = false;
	                        clone = src && api.isArray(src) ? src : [];
	                    } else {
	                        clone = src && api.isPlainObject(src) ? src : {};
	                    }

	                    target[name] = api.extend(deep, clone, copy);
	                } else if (copy !== undefined) {
	                    target[name] = copy;
	                }
	            }
	        }
	    }

	    return target;
	};

	_api.setApi = function () {
	    for (var _len2 = arguments.length, arg = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        arg[_key2] = arguments[_key2];
	    }

	    var target = arg[0],
	        len = arg.length;

	    if (!len || api.type(target) !== 'object') {
	        return target;
	    }

	    var i = 1,
	        option = undefined,
	        src = undefined,
	        copy = undefined;

	    for (; i < len; i++) {
	        if (api.type(option = arg[i]) === 'object') {
	            for (var _name2 in option) {
	                src = target[_name2];
	                copy = option[_name2];

	                if (src === copy) {
	                    continue;
	                }

	                if (api.type(src) !== 'undefined') {
	                    console.warn(_name2 + '已经存在！');
	                }

	                target[_name2] = copy;
	            }
	        }
	    }

	    return target;
	};

	exports.api = api;
	exports._api = _api;

/***/ },
/* 3 */
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

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var _utilIndexJs = __webpack_require__(2);

	var util = _interopRequireWildcard(_utilIndexJs);

	var document = window.document;
	var dApi = {};
	var _dApi = {};
	var reSingleTag = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/;
	var rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;
	var reSimpleSelector = /^[\.#]?[\w-]*$/;
	var rmsPrefix = /^-ms-/;
	var rdashAlpha = /-([a-z])/g;
	var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
	var documentElement = document.documentElement;
	var matches = documentElement.matches || documentElement.webkitMatchesSelector || documentElement.mozMatchesSelector || documentElement.oMatchesSelector || documentElement.msMatchesSelector;
	var arr = [];
	var slice = arr.slice;
	var _some = arr.some;
	var _filter = arr.filter;
	var push = arr.push;
	var indexOf = arr.indexOf;
	var hasOwn = ({}).hasOwnProperty;
	var concat = arr.concat;

	var uApi = util.api;
	var _uApi = util._api;
	var hasDuplicate = undefined;
	var fcamelCase = function fcamelCase(all, letter) {
	    return letter.toUpperCase();
	};

	dApi.camelCase = function (string) {
	    return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
	};

	dApi.nodeName = function (elem, name) {
	    return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	};

	dApi.globalEval = function (code) {
	    var script = document.createElement("script");

	    script.text = code;
	    document.head.appendChild(script).parentNode.removeChild(script);
	};

	dApi.isWindow = function (obj) {
	    return obj != null && obj === obj.window;
	};

	dApi.isNode = function () {
	    return node && node.nodeName && (node.nodeType == 1 || node.nodeType == 11);
	};

	dApi.matchesSelector = function (element, expr) {
	    return matches.call(element, expr);
	};

	dApi.matches = function (elements, expr) {
	    return dApi.find(expr, null, null, elements);
	};

	dApi.isXMLDoc = function (elem) {
	    var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	    return documentElement ? documentElement.nodeName !== "HTML" : false;
	};

	dApi.trim = function (text) {
	    return text == null ? "" : (text + "").replace(rtrim, "");
	};

	function sortOrder(a, b) {
	    if (a === b) {
	        hasDuplicate = true;
	        return 0;
	    }

	    var compare = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition(b);

	    if (compare) {
	        if (compare & 1) {
	            if (a === document || dApi.contains(document, a)) {
	                return -1;
	            }

	            if (b === document || dApi.contains(document, b)) {
	                return 1;
	            }

	            return 0;
	        }

	        return compare & 4 ? -1 : 1;
	    }

	    return a.compareDocumentPosition ? -1 : 1;
	};

	dApi.uniqueSort = function (results) {
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
	};

	dApi.find = function (selector, context, results, seed) {
	    var elem = undefined,
	        nodeType = undefined,
	        i = 0;

	    results = results || [];
	    context = context || document;

	    if (!selector || typeof selector !== "string") {
	        return results;
	    }

	    if ((nodeType = context.nodeType) !== 1 && nodeType !== 9) {
	        return [];
	    }

	    if (seed) {
	        while (elem = seed[i++]) {
	            if (dApi.matchesSelector(elem, selector)) {
	                results.push(elem);
	            }
	        }
	    } else {
	        _dApi.merge(results, querySelector(selector, context));
	    }

	    return results;
	};

	dApi.text = function (elem) {
	    var node = undefined,
	        ret = "",
	        i = 0,
	        nodeType = elem.nodeType;

	    if (!nodeType) {
	        while (node = elem[i++]) {
	            ret += dApi.text(node);
	        }
	    } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
	        return elem.textContent;
	    } else if (nodeType === 3 || nodeType === 4) {
	        return elem.nodeValue;
	    }

	    return ret;
	};

	dApi.contains = function (a, b) {
	    var adown = a.nodeType === 9 ? a.documentElement : a,
	        bup = b && b.parentNode;

	    return a === bup || !!(bup && bup.nodeType === 1 && adown.contains(bup));
	};

	function querySelector(selector) {
	    var context = arguments.length <= 1 || arguments[1] === undefined ? document : arguments[1];

	    if (typeof context === 'string') {
	        context = querySelector(context);
	    }

	    context[0] && (context = context[0]);

	    var isSimpleSelector = reSimpleSelector.test(selector);

	    if (isSimpleSelector) {
	        if (selector[0] === '#') {
	            return [(context.getElementById ? context : context.ownerDocument).getElementById(selector.slice(1))];
	        }

	        if (selector[0] === '.') {
	            return slice.call(context.getElementsByClassName(selector.slice(1)));
	        }

	        return slice.call(context.getElementsByTagName(selector));
	    }

	    return slice.call(context.querySelectorAll(selector));
	};

	_uApi.setApi(_dApi, {
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

	        return slice.call(elem);
	    }
	});

	_uApi.setApi(dApi, uApi, {
	    $id: function $id(id) {
	        var context = arguments.length <= 1 || arguments[1] === undefined ? document : arguments[1];

	        return context.getElementById(id);
	    },

	    $tag: function $tag(tagName) {
	        var context = arguments.length <= 1 || arguments[1] === undefined ? document : arguments[1];

	        return context.getElementsByTagName(tagName);
	    },

	    $class: function $class(className) {
	        var context = arguments.length <= 1 || arguments[1] === undefined ? document : arguments[1];

	        return context.getElementsByClassName(className);
	    },

	    $qsa: function $qsa(selector) {
	        var context = arguments.length <= 1 || arguments[1] === undefined ? document : arguments[1];

	        return context.querySelectorAll(selector);
	    },

	    $newHtml: function $newHtml(html) {
	        var context = arguments.length <= 1 || arguments[1] === undefined ? document : arguments[1];

	        if (typeof html !== 'string') {
	            return;
	        }

	        if (typeof context === 'string') {
	            context = querySelector(context);
	        }

	        context[0] && (context = context[0]);

	        var _html = html.match(rquickExpr);

	        if (_html && (_html = _html[1])) {
	            if (reSingleTag.test(_html)) {
	                return [context.createElement(RegExp.$1)];
	            }

	            var domArr = [],
	                container = context.createElement('div'),
	                children = container.childNodes;

	            container.innerHTML = _html;

	            for (var i = 0, l = children.length; i < l; i++) {
	                domArr.push(children[i]);
	            }

	            return domArr;
	        }
	    },

	    ready: function ready(callback) {
	        if (document.readyState === "complete") {
	            window.setTimeout(function () {
	                callback();
	            });
	        } else {
	            (function () {
	                var completed = function completed() {
	                    document.removeEventListener("DOMContentLoaded", completed);
	                    window.removeEventListener("load", completed);
	                    callback();
	                };

	                document.addEventListener('DOMContentLoaded', completed);
	                window.addEventListener("load", completed);
	            })();
	        }
	    },

	    $: function $(selector, context) {
	        if (dApi.isPlainObject(selector)) {
	            context = selector.context;
	            selector = selector.selector;
	        }

	        if (!selector) {
	            return [];
	        }

	        if (dApi.isFunction(selector)) {
	            dApi.ready(selector);

	            return [];
	        }

	        if (Array.isArray(selector)) {
	            return selector;
	        }

	        if (selector.nodeType || dApi.isWindow(selector)) {
	            return [selector];
	        }

	        if (selector instanceof HTMLCollection || selector instanceof NodeList) {
	            return slice.call(selector);
	        }

	        if (typeof selector === 'string') {
	            var html = undefined;

	            if (html = dApi.$newHtml(selector, context)) {
	                return html;
	            }

	            return querySelector(selector, context);
	        }

	        return [];
	    },

	    $is: function $is(selector, isSelector) {
	        selector = dApi.$(selector);

	        var callback = typeof isSelector === 'string' ? function (el) {
	            if (el.nodeType === 1) {
	                return dApi.matchesSelector(el, isSelector);
	            }
	        } : dApi.isFunction(isSelector) ? function (el, i) {
	            return !!isSelector(el, i);
	        } : function (el) {
	            return dApi.$(isSelector).some(function (node) {
	                return node === el;
	            });
	        };

	        return selector.some(function (el, i) {
	            return callback(el, i);
	        });
	    },

	    $filter: function $filter(selector, filterSelector) {
	        selector = dApi.$(selector);

	        var callback = dApi.isFunction(filterSelector) ? function (el, i) {
	            return !!filterSelector(el, i);
	        } : function (el) {
	            return dApi.$is(el, filterSelector);
	        };

	        return selector.filter(function (el, i) {
	            return callback(el, i);
	        });
	    },

	    $not: function $not(selector, notSelector) {
	        selector = dApi.$(selector);

	        var callback = dApi.isFunction(notSelector) ? function (el, i) {
	            return !!notSelector(el, i);
	        } : function (el) {
	            return dApi.$is(el, notSelector);
	        };

	        return selector.filter(function (el, i) {
	            return !callback(el, i);
	        });
	    },

	    $find: function $find(selector, findSelector) {
	        selector = dApi.$(selector);

	        var i = undefined,
	            len = selector.length,
	            ret = [];

	        if (typeof findSelector !== "string") {
	            return dApi.$(findSelector).filter(function (node) {
	                for (i = 0; i < len; i++) {
	                    if (dApi.contains(selector[i], node)) {
	                        return true;
	                    }
	                }
	            });
	        }

	        for (i = 0; i < len; i++) {
	            dApi.find(findSelector, selector[i], ret);
	        }

	        return len > 1 ? dApi.uniqueSort(ret) : ret;
	    },

	    $add: function $add(selector, addSelector, context) {
	        selector = dApi.$(selector);

	        return dApi.uniqueSort(_dApi.merge(selector, dApi.$(addSelector, context)));
	    },

	    $has: function $has(selector, hasSelector) {
	        selector = dApi.$(selector);

	        var targets = dApi.$(hasSelector, selector),
	            l = targets.length;

	        return selector.filter(function (node) {
	            for (var i = 0; i < l; i++) {
	                if (dApi.contains(node, targets[i])) {
	                    return true;
	                }
	            }
	        });
	    },

	    $closest: function $closest(selector, closestSelector, context) {
	        selector = dApi.$(selector);
	        context = dApi.$(context)[0];

	        var cur = undefined,
	            i = 0,
	            l = selector.length,
	            matched = [],
	            pos = typeof closestSelector !== "string" ? dApi.$(closestSelector, context) : 0;

	        for (; i < l; i++) {
	            for (cur = selector[i]; cur && cur !== context; cur = cur.parentNode) {
	                if (cur.nodeType < 11 && (pos ? pos.indexOf(cur) > -1 : cur.nodeType === 1 && dApi.matchesSelector(cur, closestSelector))) {
	                    matched.push(cur);
	                    break;
	                }
	            }
	        }

	        return matched.length > 1 ? dApi.uniqueSort(matched) : matched;
	    },

	    dir: function dir(elem, _dir, until) {
	        var matched = [],
	            truncate = until !== undefined;

	        while ((elem = elem[_dir]) && elem.nodeType !== 9) {
	            if (elem.nodeType === 1) {
	                if (truncate && dApi.$is(elem, until)) {
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

	function sibling(cur, dir) {
	    while ((cur = cur[dir]) && cur.nodeType !== 1) {}

	    return cur;
	}

	var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	    guaranteedUnique = {
	    children: true,
	    contents: true,
	    next: true,
	    prev: true
	},
	    treeObj = {
	    parent: function parent(elem) {
	        var parent = elem.parentNode;
	        return parent && parent.nodeType !== 11 ? parent : null;
	    },
	    parents: function parents(elem) {
	        return dApi.dir(elem, "parentNode");
	    },
	    parentsUntil: function parentsUntil(elem, i, until) {
	        return dApi.dir(elem, "parentNode", until);
	    },
	    next: function next(elem) {
	        return sibling(elem, "nextSibling");
	    },
	    prev: function prev(elem) {
	        return sibling(elem, "previousSibling");
	    },
	    nextAll: function nextAll(elem) {
	        return dApi.dir(elem, "nextSibling");
	    },
	    prevAll: function prevAll(elem) {
	        return dApi.dir(elem, "previousSibling");
	    },
	    nextUntil: function nextUntil(elem, i, until) {
	        return dApi.dir(elem, "nextSibling", until);
	    },
	    prevUntil: function prevUntil(elem, i, until) {
	        return dApi.dir(elem, "previousSibling", until);
	    },
	    siblings: function siblings(elem) {
	        return dApi.sibling((elem.parentNode || {}).firstChild, elem);
	    },
	    children: function children(elem) {
	        return dApi.sibling(elem.firstChild);
	    },
	    contents: function contents(elem) {
	        return elem.contentDocument || slice.call(elem.childNodes);
	    }
	};

	var _loop = function (_name) {
	    if (hasOwn.call(treeObj, _name)) {
	        (function () {
	            var fn = treeObj[_name];
	            _uApi.setApi(dApi, _defineProperty({}, '$' + _name, function (selector, until, treeSelector) {
	                selector = dApi.$(selector);

	                var matched = selector.map(function (elem, i) {
	                    return fn(elem, i, until);
	                });

	                matched = concat.apply([], matched);

	                if (_name.slice(-5) !== "Until") {
	                    treeSelector = until;
	                }

	                if (treeSelector && typeof treeSelector === "string") {
	                    matched = dApi.$filter(matched, treeSelector);
	                }

	                if (selector.length > 1) {
	                    if (!guaranteedUnique[_name]) {
	                        dApi.uniqueSort(matched);
	                    }

	                    if (rparentsprev.test(_name)) {
	                        matched.reverse();
	                    }
	                }

	                return matched;
	            }));
	        })();
	    }
	};

	for (var _name in treeObj) {
	    _loop(_name);
	};

	var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi;

	_uApi.setApi(dApi, {
	    $remove: function $remove(selector, removeSelector) {
	        var node = undefined,
	            nodes = removeSelector ? dApi.$filter(selector, removeSelector) : dApi.$(selector),
	            i = 0;

	        for (; (node = nodes[i]) != null; i++) {
	            if (node.parentNode) {
	                node.parentNode.removeChild(node);
	            }
	        }
	    },

	    $empty: function $empty(selector) {
	        selector = dApi.$(selector);

	        var elem,
	            i = 0;

	        for (; (elem = selector[i]) != null; i++) {
	            if (elem.nodeType === 1) {
	                elem.textContent = "";
	            }
	        }
	    },

	    $text: function $text(selector, value) {
	        selector = dApi.$(selector);

	        if (value === undefined) {
	            return dApi.text(selector);
	        }

	        selector.forEach(function (node, i) {
	            var val = dApi.isFunction(value) ? value(node, i, selector) : value;

	            if (val !== undefined && (node.nodeType === 1 || node.nodeType === 11 || node.nodeType === 9)) {
	                dApi.$empty(node);
	                node.textContent = val;
	            }
	        });
	    },

	    $clone: function $clone(selector) {
	        return dApi.$(selector).map(function (node) {
	            return node.cloneNode(true);
	        });
	    },

	    $append: function $append(selector) {
	        for (var _len = arguments.length, arg = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	            arg[_key - 1] = arguments[_key];
	        }

	        domManip(dApi.$(selector), arg, function (target, node, index) {
	            if (target.nodeType === 1 || target.nodeType === 11 || target.nodeType === 9) {
	                target.appendChild(node);
	            }
	        });
	    },

	    $prepend: function $prepend(selector) {
	        for (var _len2 = arguments.length, arg = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	            arg[_key2 - 1] = arguments[_key2];
	        }

	        domManip(dApi.$(selector), arg, function (target, node, index) {
	            if (target.nodeType === 1 || target.nodeType === 11 || target.nodeType === 9) {
	                target.insertBefore(node, target.firstChild);
	            }
	        });
	    },

	    $before: function $before(selector) {
	        for (var _len3 = arguments.length, arg = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	            arg[_key3 - 1] = arguments[_key3];
	        }

	        domManip(dApi.$(selector), arg, function (target, node, index) {
	            if (target.parentNode) {
	                target.parentNode.insertBefore(node, target);
	            }
	        });
	    },

	    $after: function $after(selector) {
	        for (var _len4 = arguments.length, arg = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
	            arg[_key4 - 1] = arguments[_key4];
	        }

	        domManip(dApi.$(selector), arg, function (target, node, index) {
	            if (target.parentNode) {
	                target.parentNode.insertBefore(node, target.nextSibling);
	            }
	        });
	    },

	    $replaceWith: function $replaceWith(selector) {
	        for (var _len5 = arguments.length, arg = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
	            arg[_key5 - 1] = arguments[_key5];
	        }

	        domManip(dApi.$(selector), arg, function (target, node, index) {
	            var parent = target.parentNode;
	            if (parent) {
	                parent.replaceChild(node, target);
	            }
	        });
	    },

	    $wrapAll: function $wrapAll(selector, html) {
	        selector = dApi.$(selector);

	        var elem = selector[0];

	        if (elem) {
	            if (dApi.isFunction(html)) {
	                html = html(elem);
	            }

	            var wrap = dApi.$(html, elem.ownerDocument)[0];

	            if (!wrap) {
	                return;
	            }

	            wrap = wrap.cloneNode(true);

	            if (elem.parentNode) {
	                elem.parentNode.insertBefore(wrap, elem);
	            }

	            while (wrap.firstElementChild) {
	                wrap = wrap.firstElementChild;
	            }

	            dApi.$append(wrap, selector);
	        }
	    },

	    $wrapInner: function $wrapInner(selector, html) {
	        selector = dApi.$(selector);

	        if (dApi.isFunction(html)) {
	            return selector.forEach(function (node, i) {
	                dApi.$wrapInner(node, html(node, i));
	            });
	        }

	        selector.forEach(function (node) {
	            var contents = dApi.$contents(node);

	            if (contents.length) {
	                dApi.$wrapAll(contents, html);
	            } else {
	                dApi.$append(node, html);
	            }
	        });
	    },

	    $wrap: function $wrap(selector, html) {
	        selector = dApi.$(selector);

	        var isFunction = dApi.isFunction(html);

	        selector.forEach(function (node, i) {
	            dApi.$wrapAll(node, isFunction ? html(node, i) : html);
	        });
	    },

	    $unwrap: function $unwrap(selector, unwrapSelector) {
	        dApi.$not(dApi.$parent(selector, unwrapSelector), 'body').forEach(function (elem) {
	            dApi.$replaceWith(elem, elem.childNodes);
	        });
	    },

	    htmlPrefilter: function htmlPrefilter(html) {
	        return html.replace(rxhtmlTag, "<$1></$2>");
	    },

	    $html: function $html(selector, value) {
	        selector = dApi.$(selector);

	        if (value === undefined) {
	            var elem = undefined;
	            if ((elem = selector[0]) && elem.nodeType === 1) {
	                return elem.innerHTML;
	            }
	        }

	        var type = dApi.type(value);

	        if (type === 'function') {
	            selector.forEach(function (elem, i) {
	                var val = value(elem, i, selector);

	                if (dApi.type(val) === 'string') {
	                    elem.innerHTML = dApi.htmlPrefilter(val);
	                }
	            });
	        } else if (type === 'string') {
	            value = dApi.htmlPrefilter(value);

	            selector.forEach(function (elem) {
	                elem.innerHTML = value;
	            });
	        }
	    }
	});

	var rhtml = /<|&#?\w+;/;

	function domManip(targets, arg, callback) {
	    var l = targets.length;

	    if (l && arg.length) {
	        var _ret3 = (function () {
	            var value = arg[0];
	            if (dApi.type(value) === 'function') {
	                targets.forEach(function (target, i) {
	                    arg[0] = value(target, i, targets);
	                    domManip([target], arg, callback, targets);
	                });

	                return {
	                    v: undefined
	                };
	            }

	            var context = targets[0].ownerDocument,
	                nodes = concat.apply([], concat.apply([], arg).map(function (node) {
	                var value = dApi.$(node);

	                if (value.length) {
	                    return value;
	                }

	                if (dApi.type(node) === 'string' && !rhtml.test(node)) {
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

	        if (typeof _ret3 === "object") return _ret3.v;
	    }
	}

	var rnotwhite = /\S+/g;

	_uApi.setApi(dApi, {
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
	        if (dApi.isPlainObject(name)) {
	            for (var n in name) {
	                dApi.$prop(selector, n, name[n]);
	            }

	            return;
	        }

	        selector = dApi.$(selector);

	        if (value === undefined) {
	            return dApi.prop(selector[0], name);
	        }

	        var callback = dApi.isFunction(value) ? function (node, i) {
	            dApi.prop(node, name, value(node, i));
	        } : function (node, i) {
	            dApi.prop(node, name, value);
	        };

	        selector.forEach(function (node, i) {
	            callback(node, i);
	        });
	    },

	    $removeProp: function $removeProp(selector, name) {
	        dApi.$(selector).forEach(function (node) {
	            delete node[name];
	        });
	    },

	    attr: function attr(elem, name, value) {
	        var nType = elem.nodeType;

	        if (nType === 3 || nType === 8 || nType === 2) {
	            return;
	        }

	        if (typeof elem.getAttribute === "undefined") {
	            return dApi.prop(elem, name, value);
	        }

	        if (value !== undefined) {
	            if (value === null) {
	                dApi.removeAttr(elem, name);
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
	            attrNames = value && value.match(rnotwhite);

	        if (attrNames && elem.nodeType === 1) {
	            while (name = attrNames[i++]) {
	                elem.removeAttribute(name);
	            }
	        }
	    },

	    $attr: function $attr(selector, name, value) {
	        if (dApi.isPlainObject(name)) {
	            for (var n in name) {
	                dApi.$attr(selector, n, name[n]);
	            }

	            return;
	        }

	        selector = dApi.$(selector);

	        if (value === undefined) {
	            return dApi.attr(selector[0], name);
	        }

	        var callback = dApi.isFunction(value) ? function (node, i) {
	            dApi.attr(node, name, value(node, i));
	        } : function (node, i) {
	            dApi.attr(node, name, value);
	        };

	        selector.forEach(function (node, i) {
	            callback(node, i);
	        });
	    },

	    $removeAttr: function $removeAttr(selector, name) {
	        dApi.$(selector).forEach(function (node) {
	            dApi.removeAttr(node, name);
	        });
	    }
	});

	var support = _dApi.support = {};

	(function () {
	    var input = document.createElement("input"),
	        select = document.createElement("select"),
	        opt = select.appendChild(document.createElement("option"));

	    input.type = "checkbox";
	    support.checkOn = input.value !== "";
	    select.disabled = true;
	    support.optDisabled = !opt.disabled;
	})();

	dApi.valHooks = {
	    option: {
	        get: function get(elem) {
	            return dApi.trim(elem.value);
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
	                if ((option.selected || i === index) && (support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) && (!option.parentNode.disabled || !dApi.nodeName(option.parentNode, "optgroup"))) {

	                    value = dApi.$val(option);

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

	                if (option.selected = values.indexOf(dApi.valHooks.option.get(option)) > -1) {
	                    optionSet = true;
	                }
	            }

	            if (!optionSet) {
	                elem.selectedIndex = -1;
	            }

	            return values;
	        }
	    }
	};

	;
	["radio", "checkbox"].forEach(function (name) {
	    dApi.valHooks[name] = {
	        set: function set(elem, value) {
	            if (Array.isArray(value)) {
	                return elem.checked = value.indexOf(dApi.$val(elem)) > -1;
	            }
	        }
	    };

	    if (!support.checkOn) {
	        dApi.valHooks[name].get = function (elem) {
	            return elem.getAttribute("value") === null ? "on" : elem.value;
	        };
	    }
	});

	var rreturn = /\r/g;

	_uApi.setApi(dApi, {
	    $val: function $val(selector, value) {
	        selector = dApi.$(selector);

	        var hooks = undefined,
	            ret = undefined,
	            isFunction = undefined;

	        if (arguments.length === 1) {
	            var elem = selector[0];

	            if (elem) {
	                hooks = dApi.valHooks[elem.type] || dApi.valHooks[elem.nodeName.toLowerCase()];

	                if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
	                    return ret;
	                }

	                ret = elem.value;

	                return typeof ret === "string" ? ret.replace(rreturn, "") : ret == null ? "" : ret;
	            }

	            return;
	        }

	        isFunction = dApi.isFunction(value);

	        selector.forEach(function (node, i) {
	            if (node.nodeType !== 1) {
	                return;
	            }

	            var val = undefined;

	            if (isFunction) {
	                val = value(node, i);
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

	            hooks = dApi.valHooks[node.type] || dApi.valHooks[node.nodeName.toLowerCase()];

	            if (!hooks || !("set" in hooks) || hooks.set(node, val, "value") === undefined) {
	                node.value = val;
	            }
	        });
	    }
	});

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
	var emptyStyle = document.createElement("div").style;

	(function () {
	    var pixelPositionVal = undefined,
	        boxSizingReliableVal = undefined,
	        pixelMarginRightVal = undefined,
	        container = document.createElement("div"),
	        div = document.createElement("div");

	    if (!div.style) {
	        return;
	    }

	    div.style.backgroundClip = "content-box";
	    div.cloneNode(true).style.backgroundClip = "";
	    support.clearCloneStyle = div.style.backgroundClip === "content-box";

	    container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" + "padding:0;margin-top:1px;position:absolute";
	    container.appendChild(div);

	    function computeStyleTests() {
	        div.style.cssText = "-webkit-box-sizing:border-box;box-sizing:border-box;" + "display:block;position:absolute;" + "margin:0;margin-top:1%;margin-right:50%;" + "border:1px;padding:1px;" + "top:1%;width:50%;height:4px";
	        div.innerHTML = "";
	        documentElement.appendChild(container);

	        var divStyle = window.getComputedStyle(div);
	        pixelPositionVal = divStyle.top !== "1%";
	        boxSizingReliableVal = divStyle.height === "4px";
	        pixelMarginRightVal = divStyle.marginRight === "4px";

	        documentElement.removeChild(container);
	    }

	    dApi.extend(support, {
	        pixelPosition: function pixelPosition() {
	            computeStyleTests();
	            return pixelPositionVal;
	        },
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
	                marginDiv = div.appendChild(document.createElement("div"));

	            marginDiv.style.cssText = div.style.cssText = "-webkit-box-sizing:content-box;box-sizing:content-box;" + "display:block;margin:0;border:0;padding:0";
	            marginDiv.style.marginRight = marginDiv.style.width = "0";
	            div.style.width = "1px";
	            documentElement.appendChild(container);

	            ret = !parseFloat(window.getComputedStyle(marginDiv).marginRight);

	            documentElement.removeChild(container);
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
	};

	function adjustCSS(elem, prop, valueParts) {
	    var adjusted = undefined,
	        scale = 1,
	        maxIterations = 20,
	        currentValue = function currentValue() {
	        return dApi.css(elem, prop, "");
	    },
	        initial = currentValue(),
	        unit = valueParts && valueParts[3] || (dApi.cssNumber[prop] ? "" : "px"),
	        initialInUnit = (dApi.cssNumber[prop] || unit !== "px" && +initial) && rcssNum.exec(dApi.css(elem, prop));

	    if (initialInUnit && initialInUnit[3] !== unit) {
	        unit = unit || initialInUnit[3];
	        valueParts = valueParts || [];
	        initialInUnit = +initial || 1;

	        do {
	            scale = scale || ".5";
	            initialInUnit = initialInUnit / scale;
	            dApi.style(elem, prop, initialInUnit + unit);
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
	};

	function curCSS(elem, name, computed) {
	    var width = undefined,
	        minWidth = undefined,
	        maxWidth = undefined,
	        ret = undefined,
	        style = elem.style;

	    computed = computed || getStyles(elem);

	    if (computed) {
	        ret = computed.getPropertyValue(name) || computed[name];

	        if (ret === "" && !dApi.contains(elem.ownerDocument, elem)) {
	            ret = dApi.style(elem, name);
	        }

	        if (!support.pixelMarginRight() && rnumnonpx.test(ret) && rmargin.test(name)) {
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
	            val += dApi.css(elem, extra + cssExpand[i], true, styles);
	        }

	        if (isBorderBox) {
	            if (extra === "content") {
	                val -= dApi.css(elem, "padding" + cssExpand[i], true, styles);
	            }

	            if (extra !== "margin") {
	                val -= dApi.css(elem, "border" + cssExpand[i] + "Width", true, styles);
	            }
	        } else {
	            val += dApi.css(elem, "padding" + cssExpand[i], true, styles);

	            if (extra !== "padding") {
	                val += dApi.css(elem, "border" + cssExpand[i] + "Width", true, styles);
	            }
	        }
	    }

	    return val;
	}

	function getWidthOrHeight(elem, name, extra) {
	    var val = undefined,
	        valueIsBorderBox = true,
	        styles = getStyles(elem),
	        isBorderBox = dApi.css(elem, "boxSizing", false, styles) === "border-box";

	    if (elem.getClientRects().length) {
	        val = elem.getBoundingClientRect()[name];
	    }

	    if (document.msFullscreenElement && window.top !== window) {
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

	        valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]);

	        val = parseFloat(val) || 0;
	    }

	    return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles) + "px";
	}

	_uApi.setApi(dApi, {
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
	            origName = dApi.camelCase(name),
	            style = elem.style;

	        name = dApi.cssProps[origName] || (dApi.cssProps[origName] = vendorPropName(origName) || origName);
	        hooks = dApi.cssHooks[name] || dApi.cssHooks[origName];

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
	                value += ret && ret[3] || (dApi.cssNumber[origName] ? "" : "px");
	            }

	            if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
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
	            origName = dApi.camelCase(name);

	        name = dApi.cssProps[origName] || (dApi.cssProps[origName] = vendorPropName(origName) || origName);
	        hooks = dApi.cssHooks[name] || dApi.cssHooks[origName];

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

	            return extra === true || dApi.isNumeric(num) ? num || 0 : val;
	        }

	        return val;
	    },

	    $css: function $css(selector, name, value) {
	        if (dApi.isPlainObject(name)) {
	            for (var n in name) {
	                dApi.$css(selector, n, name[n]);
	            }

	            return;
	        }

	        selector = dApi.$(selector);

	        if (Array.isArray(name)) {
	            var i = 0,
	                elem = selector[0],
	                map = {},
	                styles = getStyles(elem),
	                len = name.length;

	            for (; i < len; i++) {
	                map[name[i]] = dApi.css(elem, name[i], false, styles);
	            }

	            return map;
	        }

	        if (value === undefined) {
	            return dApi.css(selector[0], name);
	        }

	        var callback = dApi.isFunction(value) ? function (node, i) {
	            dApi.style(node, name, value(node, i));
	        } : function (node, i) {
	            dApi.style(node, name, value);
	        };

	        selector.forEach(function (node, i) {
	            callback(node, i);
	        });
	    }
	});

	;
	["height", "width"].forEach(function (name) {
	    dApi.cssHooks[name] = {
	        get: function get(elem, computed, extra) {
	            if (computed) {
	                return rdisplayswap.test(dApi.css(elem, "display")) && (!elem.getClientRects().length || !elem.getBoundingClientRect().width) ? swap(elem, cssShow, function () {
	                    return getWidthOrHeight(elem, name, extra);
	                }) : getWidthOrHeight(elem, name, extra);
	            }
	        },

	        set: function set(elem, value, extra) {
	            var styles = extra && getStyles(elem);
	            return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, dApi.css(elem, "boxSizing", false, styles) === "border-box", styles) : 0);
	        }
	    };
	});

	dApi.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight, function (elem, computed) {
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

	var _loop2 = function (_name2) {
	    var type = sizeObj[_name2];
	    var boxObj = {
	        padding: "inner" + _name2,
	        content: type,
	        "": "outer" + _name2
	    };

	    var _loop4 = function (defaultExtra) {
	        var funcName = boxObj[defaultExtra];

	        _uApi.setApi(dApi, _defineProperty({}, '$' + funcName, function (selector, value) {
	            selector = dApi.$(selector);

	            var elem = selector[0];

	            if (dApi.isWindow(elem)) {
	                return elem.document.documentElement["client" + _name2];
	            }

	            if (elem.nodeType === 9) {
	                var doc = elem.documentElement;

	                return Math.max(elem.body["scroll" + _name2], doc["scroll" + _name2], elem.body["offset" + _name2], doc["offset" + _name2], doc["client" + _name2]);
	            }

	            var extra = defaultExtra || (value === true ? "margin" : "border");

	            if (value === undefined || typeof value === 'boolean') {
	                return dApi.css(elem, type, extra);
	            }

	            var callback = dApi.isFunction(value) ? function (node, i) {
	                dApi.style(node, type, value(node, i), extra);
	            } : function (node, i) {
	                dApi.style(node, type, value, extra);
	            };

	            selector.forEach(function (node, i) {
	                callback(node, i);
	            });
	        }));
	    };

	    for (var defaultExtra in boxObj) {
	        _loop4(defaultExtra);
	    }
	};

	for (var _name2 in sizeObj) {
	    _loop2(_name2);
	}

	var rclass = /[\t\r\n\f]/g;

	function getClass(elem) {
	    return elem.getAttribute && elem.getAttribute("class") || "";
	}

	_uApi.setApi(dApi, {
	    $addClass: function $addClass(selector, value) {
	        selector = dApi.$(selector);

	        if (dApi.isFunction(value)) {
	            selector.forEach(function (node, i) {
	                dApi.$addClass(node, value(node, i, getClass(node)));
	            });

	            return;
	        }

	        if (typeof value === "string" && value) {
	            (function () {
	                var classes = (value || "").match(rnotwhite) || [],
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

	                        finalValue = dApi.trim(cur);

	                        if (curValue !== finalValue) {
	                            elem.setAttribute("class", finalValue);
	                        }
	                    }
	                });
	            })();
	        }
	    },

	    $removeClass: function $removeClass(selector, value) {
	        selector = dApi.$(selector);

	        if (dApi.isFunction(value)) {
	            selector.forEach(function (node, i) {
	                dApi.$removeClass(node, value(node, i, getClass(node)));
	            });

	            return;
	        }

	        if (arguments.length === 1 || typeof value === "string" && value) {
	            (function () {
	                var classes = (value || "").match(rnotwhite) || [],
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

	                        finalValue = value ? dApi.trim(cur) : "";

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
	            return stateVal ? dApi.$addClass(selector, value) : dApi.$removeClass(selector, value);
	        }

	        selector = dApi.$(selector);

	        if (dApi.isFunction(value)) {
	            selector.forEach(function (node, i) {
	                dApi.$toggleClass(node, value(node, i, getClass(node)));
	            });

	            return;
	        }

	        selector.forEach(function (node, i) {
	            if (type === "string") {
	                var _i = 0,
	                    className = undefined,
	                    classNames = value.match(rnotwhite) || [];

	                while (className = classNames[_i++]) {
	                    if (dApi.$hasClass(node, className)) {
	                        dApi.$removeClass(node, className);
	                    } else {
	                        dApi.$addClass(node, className);
	                    }
	                }
	            }
	        });
	    },

	    $hasClass: function $hasClass(selector, className) {
	        selector = dApi.$(selector);
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

	function getWindow(elem) {
	    return dApi.isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
	}

	var scrollObj = {
	    scrollLeft: "pageXOffset",
	    scrollTop: "pageYOffset"
	};

	var _loop3 = function (method) {
	    var prop = scrollObj[method];
	    var top = "pageYOffset" === prop;
	    var $method = '$' + method;

	    _uApi.setApi(dApi, _defineProperty({}, $method, function (selector, val) {
	        selector = dApi.$(selector);

	        if (val === undefined) {
	            var elem = selector[0];
	            var win = getWindow(elem);

	            return win ? win[prop] : elem[method];
	        }

	        var callback = dApi.isFunction(val) ? function (node, i) {
	            dApi[$method](node, val(node, i));
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
	    _loop3(method);
	}

	_uApi.setApi(dApi, {
	    $offsetParent: function $offsetParent(selector) {
	        return dApi.$(selector).map(function (node) {
	            var offsetParent = node.offsetParent;

	            while (offsetParent && dApi.css(offsetParent, "position") === "static") {
	                offsetParent = offsetParent.offsetParent;
	            }

	            return offsetParent || documentElement;
	        });
	    },

	    $position: function $position(selector) {
	        selector = dApi.$(selector);

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

	        if (dApi.css(elem, "position") === "fixed") {
	            offset = elem.getBoundingClientRect();
	        } else {
	            offsetParent = dApi.$offsetParent(selector);
	            offset = dApi.$offset(selector);

	            if (!dApi.nodeName(offsetParent[0], "html")) {
	                parentOffset = dApi.$offset(offsetParent);
	            }

	            parentOffset.top += dApi.css(offsetParent[0], "borderTopWidth", true) - dApi.$scrollTop(offsetParent);
	            parentOffset.left += dApi.css(offsetParent[0], "borderLeftWidth", true) - dApi.$scrollLeft(offsetParent);
	        }

	        return {
	            top: offset.top - parentOffset.top - dApi.css(elem, "marginTop", true),
	            left: offset.left - parentOffset.left - dApi.css(elem, "marginLeft", true)
	        };
	    },

	    $offset: function $offset(selector, options) {
	        selector = dApi.$(selector);

	        if (options) {
	            selector.forEach(function (node, i) {
	                dApi.setOffset(node, options, i);
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
	            position = dApi.css(elem, "position"),
	            curElem = dApi.$(elem),
	            props = {};

	        if (position === "static") {
	            elem.style.position = "relative";
	        }

	        curOffset = dApi.$offset(curElem);
	        curCSSTop = dApi.css(elem, "top");
	        curCSSLeft = dApi.css(elem, "left");
	        calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1;

	        if (calculatePosition) {
	            curPosition = dApi.$position(curElem);
	            curTop = curPosition.top;
	            curLeft = curPosition.left;
	        } else {
	            curTop = parseFloat(curCSSTop) || 0;
	            curLeft = parseFloat(curCSSLeft) || 0;
	        }

	        if (dApi.isFunction(options)) {
	            options = options(elem, i, dApi.extend({}, curOffset));
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
	            dApi.$css(curElem, props);
	        }
	    }
	});

	;
	['left', 'top'].forEach(function (name) {
	    dApi.cssHooks[name] = addGetHookIf(support.pixelPosition, function (elem, computed) {
	        if (computed) {
	            computed = curCSS(elem, prop);

	            return rnumnonpx.test(computed) ? dApi.$position(elem)[prop] + "px" : computed;
	        }
	    });
	});

	var cachedScrollbarWidth = undefined,
	    supportsOffsetFractions = undefined,
	    max = Math.max,
	    abs = Math.abs,
	    round = Math.round,
	    rhorizontal = /left|center|right/,
	    rvertical = /top|center|bottom/,
	    roffset = /[\+\-]\d+(\.[\d]+)?%?/,
	    rposition = /^\w+/,
	    rpercent = /%$/;

	supportsOffsetFractions = function () {
	    var elem = dApi.$('<div>'),
	        support = undefined;

	    dApi.$css(elem, "position", "absolute");
	    dApi.$offset(elem, {
	        top: 1.5,
	        left: 1.5
	    });
	    dApi.$append('body', elem);

	    support = dApi.$offset(elem).top === 1.5;

	    dApi.$remove(elem);

	    supportsOffsetFractions = function () {
	        return support;
	    };

	    return support;
	};

	function getOffsets(offsets, width, height) {
	    return [parseFloat(offsets[0]) * (rpercent.test(offsets[0]) ? width / 100 : 1), parseFloat(offsets[1]) * (rpercent.test(offsets[1]) ? height / 100 : 1)];
	}

	function parseCss(element, property) {
	    return parseInt(dApi.css(element, property), 10) || 0;
	}

	function getDimensions(elem) {
	    var raw = elem[0];

	    if (raw.nodeType === 9) {
	        return {
	            width: dApi.$width(elem),
	            height: dApi.$height(elem),
	            offset: {
	                top: 0,
	                left: 0
	            }
	        };
	    }

	    if (dApi.isWindow(raw)) {
	        return {
	            width: dApi.$width(elem),
	            height: dApi.$height(elem),
	            offset: {
	                top: dApi.$scrollTop(elem),
	                left: dApi.$scrollLeft(elem)
	            }
	        };
	    }

	    if (raw.preventDefault) {
	        return {
	            width: 0,
	            height: 0,
	            offset: {
	                top: raw.pageY,
	                left: raw.pageX
	            }
	        };
	    }

	    return {
	        width: dApi.$outerWidth(elem),
	        height: dApi.$outerHeight(elem),
	        offset: dApi.$offset(elem)
	    };
	}

	_uApi.setApi(dApi, {
	    scrollbarWidth: function scrollbarWidth() {
	        if (cachedScrollbarWidth !== undefined) {
	            return cachedScrollbarWidth;
	        }

	        var w1 = undefined,
	            w2 = undefined,
	            div = dApi.$("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
	            innerDiv = dApi.$children(div)[0];

	        dApi.$append("body", div);
	        w1 = innerDiv.offsetWidth;
	        dApi.$css(div, "overflow", "scroll");

	        w2 = innerDiv.offsetWidth;

	        if (w1 === w2) {
	            w2 = div[0].clientWidth;
	        }

	        dApi.$remove(div);

	        return cachedScrollbarWidth = w1 - w2;
	    },

	    getScrollInfo: function getScrollInfo(within) {
	        console.log();
	        var overflowX = within.isWindow || within.isDocument ? "" : dApi.$css(within.element, "overflow-x"),
	            overflowY = within.isWindow || within.isDocument ? "" : dApi.$css(within.element, "overflow-y"),
	            hasOverflowX = overflowX === "scroll" || overflowX === "auto" && within.width < within.element[0].scrollWidth,
	            hasOverflowY = overflowY === "scroll" || overflowY === "auto" && within.height < within.element[0].scrollHeight;

	        return {
	            width: hasOverflowY ? dApi.scrollbarWidth() : 0,
	            height: hasOverflowX ? dApi.scrollbarWidth() : 0
	        };
	    },

	    getWithinInfo: function getWithinInfo(element) {
	        var withinElement = dApi.$(element || window),
	            isWindow = dApi.isWindow(withinElement[0]),
	            isDocument = !!withinElement[0] && withinElement[0].nodeType === 9,
	            hasOffset = !isWindow && !isDocument;

	        return {
	            element: withinElement,
	            isWindow: isWindow,
	            isDocument: isDocument,
	            offset: hasOffset ? dApi.$offset(element) : {
	                left: 0,
	                top: 0
	            },
	            scrollLeft: dApi.$scrollLeft(withinElement),
	            scrollTop: dApi.$scrollTop(withinElement),
	            width: dApi.$outerWidth(withinElement),
	            height: dApi.$outerHeight(withinElement)
	        };
	    },

	    positionCollision: {
	        fit: {
	            left: function left(position, data) {
	                var within = data.within,
	                    withinOffset = within.isWindow ? within.scrollLeft : within.offset.left,
	                    outerWidth = within.width,
	                    collisionPosLeft = position.left - data.collisionPosition.marginLeft,
	                    overLeft = withinOffset - collisionPosLeft,
	                    overRight = collisionPosLeft + data.collisionWidth - outerWidth - withinOffset,
	                    newOverRight = undefined;

	                if (data.collisionWidth > outerWidth) {
	                    if (overLeft > 0 && overRight <= 0) {
	                        newOverRight = position.left + overLeft + data.collisionWidth - outerWidth - withinOffset;
	                        position.left += overLeft - newOverRight;
	                    } else if (overRight > 0 && overLeft <= 0) {
	                        position.left = withinOffset;
	                    } else {
	                        if (overLeft > overRight) {
	                            position.left = withinOffset + outerWidth - data.collisionWidth;
	                        } else {
	                            position.left = withinOffset;
	                        }
	                    }
	                } else if (overLeft > 0) {
	                    position.left += overLeft;
	                } else if (overRight > 0) {
	                    position.left -= overRight;
	                } else {
	                    position.left = max(position.left - collisionPosLeft, position.left);
	                }
	            },
	            top: function top(position, data) {
	                var within = data.within,
	                    withinOffset = within.isWindow ? within.scrollTop : within.offset.top,
	                    outerHeight = data.within.height,
	                    collisionPosTop = position.top - data.collisionPosition.marginTop,
	                    overTop = withinOffset - collisionPosTop,
	                    overBottom = collisionPosTop + data.collisionHeight - outerHeight - withinOffset,
	                    newOverBottom;

	                if (data.collisionHeight > outerHeight) {
	                    if (overTop > 0 && overBottom <= 0) {
	                        newOverBottom = position.top + overTop + data.collisionHeight - outerHeight - withinOffset;
	                        position.top += overTop - newOverBottom;
	                    } else if (overBottom > 0 && overTop <= 0) {
	                        position.top = withinOffset;
	                    } else {
	                        if (overTop > overBottom) {
	                            position.top = withinOffset + outerHeight - data.collisionHeight;
	                        } else {
	                            position.top = withinOffset;
	                        }
	                    }
	                } else if (overTop > 0) {
	                    position.top += overTop;
	                } else if (overBottom > 0) {
	                    position.top -= overBottom;
	                } else {
	                    position.top = max(position.top - collisionPosTop, position.top);
	                }
	            }
	        },

	        flip: {
	            left: function left(position, data) {
	                var within = data.within,
	                    withinOffset = within.offset.left + within.scrollLeft,
	                    outerWidth = within.width,
	                    offsetLeft = within.isWindow ? within.scrollLeft : within.offset.left,
	                    collisionPosLeft = position.left - data.collisionPosition.marginLeft,
	                    overLeft = collisionPosLeft - offsetLeft,
	                    overRight = collisionPosLeft + data.collisionWidth - outerWidth - offsetLeft,
	                    myOffset = data.my[0] === "left" ? -data.elemWidth : data.my[0] === "right" ? data.elemWidth : 0,
	                    atOffset = data.at[0] === "left" ? data.targetWidth : data.at[0] === "right" ? -data.targetWidth : 0,
	                    offset = -2 * data.offset[0],
	                    newOverRight = undefined,
	                    newOverLeft = undefined;

	                if (overLeft < 0) {
	                    newOverRight = position.left + myOffset + atOffset + offset + data.collisionWidth - outerWidth - withinOffset;
	                    if (newOverRight < 0 || newOverRight < abs(overLeft)) {
	                        position.left += myOffset + atOffset + offset;
	                    }
	                } else if (overRight > 0) {
	                    newOverLeft = position.left - data.collisionPosition.marginLeft + myOffset + atOffset + offset - offsetLeft;
	                    if (newOverLeft > 0 || abs(newOverLeft) < overRight) {
	                        position.left += myOffset + atOffset + offset;
	                    }
	                }
	            },
	            top: function top(position, data) {
	                var within = data.within,
	                    withinOffset = within.offset.top + within.scrollTop,
	                    outerHeight = within.height,
	                    offsetTop = within.isWindow ? within.scrollTop : within.offset.top,
	                    collisionPosTop = position.top - data.collisionPosition.marginTop,
	                    overTop = collisionPosTop - offsetTop,
	                    overBottom = collisionPosTop + data.collisionHeight - outerHeight - offsetTop,
	                    top = data.my[1] === "top",
	                    myOffset = top ? -data.elemHeight : data.my[1] === "bottom" ? data.elemHeight : 0,
	                    atOffset = data.at[1] === "top" ? data.targetHeight : data.at[1] === "bottom" ? -data.targetHeight : 0,
	                    offset = -2 * data.offset[1],
	                    newOverTop = undefined,
	                    newOverBottom = undefined;

	                if (overTop < 0) {
	                    newOverBottom = position.top + myOffset + atOffset + offset + data.collisionHeight - outerHeight - withinOffset;
	                    if (newOverBottom < 0 || newOverBottom < abs(overTop)) {
	                        position.top += myOffset + atOffset + offset;
	                    }
	                } else if (overBottom > 0) {
	                    newOverTop = position.top - data.collisionPosition.marginTop + myOffset + atOffset + offset - offsetTop;
	                    if (newOverTop > 0 || abs(newOverTop) < overBottom) {
	                        position.top += myOffset + atOffset + offset;
	                    }
	                }
	            }
	        },

	        flipfit: {
	            left: function left() {
	                dApi.positionCollision.flip.left.apply(this, arguments);
	                dApi.positionCollision.fit.left.apply(this, arguments);
	            },
	            top: function top() {
	                dApi.positionCollision.flip.top.apply(this, arguments);
	                dApi.positionCollision.fit.top.apply(this, arguments);
	            }
	        }
	    },

	    uiPosition: function uiPosition(selector, options) {
	        if (!options || !options.of) {
	            return;
	        }

	        options = dApi.extend({}, options);

	        var atOffset = undefined,
	            targetWidth = undefined,
	            targetHeight = undefined,
	            targetOffset = undefined,
	            basePosition = undefined,
	            dimensions = undefined,
	            target = dApi.$(options.of),
	            within = dApi.getWithinInfo(options.within),
	            scrollInfo = dApi.getScrollInfo(within),
	            collision = (options.collision || "flip").split(" "),
	            offsets = {};

	        dimensions = getDimensions(target);

	        if (target[0].preventDefault) {
	            options.at = "left top";
	        }

	        targetWidth = dimensions.width;
	        targetHeight = dimensions.height;
	        targetOffset = dimensions.offset;

	        basePosition = dApi.extend({}, targetOffset);

	        ;["my", "at"].forEach(function (name) {
	            var pos = (options[name] || "").split(" "),
	                horizontalOffset = undefined,
	                verticalOffset = undefined;

	            if (pos.length === 1) {
	                pos = rhorizontal.test(pos[0]) ? pos.concat(["center"]) : rvertical.test(pos[0]) ? ["center"].concat(pos) : ["center", "center"];
	            }

	            pos[0] = rhorizontal.test(pos[0]) ? pos[0] : "center";
	            pos[1] = rvertical.test(pos[1]) ? pos[1] : "center";

	            horizontalOffset = roffset.exec(pos[0]);
	            verticalOffset = roffset.exec(pos[1]);
	            offsets[name] = [horizontalOffset ? horizontalOffset[0] : 0, verticalOffset ? verticalOffset[0] : 0];
	            options[name] = [rposition.exec(pos[0])[0], rposition.exec(pos[1])[0]];
	        });

	        if (collision.length === 1) {
	            collision[1] = collision[0];
	        }

	        if (options.at[0] === "right") {
	            basePosition.left += targetWidth;
	        } else if (options.at[0] === "center") {
	            basePosition.left += targetWidth / 2;
	        }

	        if (options.at[1] === "bottom") {
	            basePosition.top += targetHeight;
	        } else if (options.at[1] === "center") {
	            basePosition.top += targetHeight / 2;
	        }

	        atOffset = getOffsets(offsets.at, targetWidth, targetHeight);
	        basePosition.left += atOffset[0];
	        basePosition.top += atOffset[1];

	        dApi.$(selector).forEach(function (elem) {
	            var collisionPosition = undefined,
	                using = undefined,
	                elemWidth = dApi.$outerWidth(elem),
	                elemHeight = dApi.$outerHeight(elem),
	                marginLeft = parseCss(elem, "marginLeft"),
	                marginTop = parseCss(elem, "marginTop"),
	                collisionWidth = elemWidth + marginLeft + parseCss(elem, "marginRight") + scrollInfo.width,
	                collisionHeight = elemHeight + marginTop + parseCss(elem, "marginBottom") + scrollInfo.height,
	                position = dApi.extend({}, basePosition),
	                myOffset = getOffsets(offsets.my, dApi.$outerWidth(elem), dApi.$outerHeight(elem));

	            if (options.my[0] === "right") {
	                position.left -= elemWidth;
	            } else if (options.my[0] === "center") {
	                position.left -= elemWidth / 2;
	            }

	            if (options.my[1] === "bottom") {
	                position.top -= elemHeight;
	            } else if (options.my[1] === "center") {
	                position.top -= elemHeight / 2;
	            }

	            position.left += myOffset[0];
	            position.top += myOffset[1];

	            if (!supportsOffsetFractions()) {
	                position.left = round(position.left);
	                position.top = round(position.top);
	            }

	            collisionPosition = {
	                marginLeft: marginLeft,
	                marginTop: marginTop
	            };

	            ;["left", "top"].forEach(function (dir, i) {
	                if (dApi.positionCollision[collision[i]]) {
	                    dApi.positionCollision[collision[i]][dir](position, {
	                        targetWidth: targetWidth,
	                        targetHeight: targetHeight,
	                        elemWidth: elemWidth,
	                        elemHeight: elemHeight,
	                        collisionPosition: collisionPosition,
	                        collisionWidth: collisionWidth,
	                        collisionHeight: collisionHeight,
	                        offset: [atOffset[0] + myOffset[0], atOffset[1] + myOffset[1]],
	                        my: options.my,
	                        at: options.at,
	                        within: within,
	                        elem: elem
	                    });
	                }
	            });

	            if (options.using) {
	                using = function (node, props) {
	                    var left = targetOffset.left - position.left,
	                        right = left + targetWidth - elemWidth,
	                        top = targetOffset.top - position.top,
	                        bottom = top + targetHeight - elemHeight,
	                        feedback = {
	                        target: {
	                            element: target,
	                            left: targetOffset.left,
	                            top: targetOffset.top,
	                            width: targetWidth,
	                            height: targetHeight
	                        },
	                        element: {
	                            element: elem,
	                            left: position.left,
	                            top: position.top,
	                            width: elemWidth,
	                            height: elemHeight
	                        },
	                        horizontal: right < 0 ? "left" : left > 0 ? "right" : "center",
	                        vertical: bottom < 0 ? "top" : top > 0 ? "bottom" : "middle"
	                    };

	                    if (targetWidth < elemWidth && abs(left + right) < targetWidth) {
	                        feedback.horizontal = "center";
	                    }

	                    if (targetHeight < elemHeight && abs(top + bottom) < targetHeight) {
	                        feedback.vertical = "middle";
	                    }

	                    if (max(abs(left), abs(right)) > max(abs(top), abs(bottom))) {
	                        feedback.important = "horizontal";
	                    } else {
	                        feedback.important = "vertical";
	                    }

	                    options.using(node, props, feedback);
	                };
	            }

	            dApi.$offset(elem, dApi.extend(position, {
	                using: using
	            }));
	        });
	    }
	});

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
	                Object.defineProperty(owner, this.expando, {
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
	                cache[dApi.camelCase(data)] = value;
	            } else {
	                for (prop in data) {
	                    cache[dApi.camelCase(prop)] = data[prop];
	                }
	            }

	            return cache;
	        }
	    }, {
	        key: "get",
	        value: function get(owner, key) {
	            var cache = this.cache(owner);

	            return key === undefined ? cache : cache[jQuery.camelCase(key)];
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
	                    key = key.map(dApi.camelCase);
	                } else {
	                    key = dApi.camelCase(key);
	                    key = key in cache ? [key] : key.match(rnotwhite) || [];
	                }

	                i = key.length;

	                while (i--) {
	                    delete cache[key[i]];
	                }
	            }

	            if (key === undefined || dApi.isEmptyObject(cache)) {
	                delete owner[this.expando];
	            }
	        }
	    }, {
	        key: "hasData",
	        value: function hasData(owner) {
	            var cache = owner[this.expando];

	            return cache !== undefined && !dApi.isEmptyObject(cache);
	        }
	    }]);

	    return Data;
	})();

	Data.expando = dApi.generateId('leoJsData');
	Data.uid = 1;

	var dataPriv = new Data();
	var dataUser = new Data();

	var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	    rmultiDash = /[A-Z]/g;

	function dataAttr(elem, key, data) {
	    if (data === undefined && elem.nodeType === 1) {
	        var _name3 = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
	        data = elem.getAttribute(_name3);

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

	var _zid = 1,
	    isFunction = dApi.isFunction,
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

	    if (event.ns) {
	        var _matcher = matcherFor(event.ns);
	    };

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
	            return dApi.ready(fn);
	        }

	        var handler = parse(event);

	        handler.fn = fn;
	        handler.sel = selector;

	        if (handler.e in hover) {
	            fn = function (e) {
	                var related = e.relatedTarget;

	                if (!related || related !== this && !$.contains(this, related)) {
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

	    ;
	    (events || '').split(/\s/).forEach(function (event) {
	        findHandlers(element, event, fn, selector).forEach(function (handler) {
	            delete handlers[id][handler.i];

	            if ('removeEventListener' in element) {
	                element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture));
	            }
	        });
	    });
	}

	dApi.event = {
	    add: add,
	    remove: remove
	};

	dApi.proxy = function (fn, context) {
	    var args = 2 in arguments && slice.call(arguments, 2);

	    if (isFunction(fn)) {
	        var proxyFn = function proxyFn() {
	            return fn.apply(context, args ? args.concat(slice.call(arguments)) : arguments);
	        };

	        proxyFn._zid = zid(fn);

	        return proxyFn;
	    } else if (isString(context)) {
	        if (args) {
	            args.unshift(fn[context], fn);

	            return dApi.proxy.apply(null, args);
	        } else {
	            return dApi.proxy(fn[context], fn);
	        }
	    } else {
	        throw new TypeError("expected function");
	    }
	};

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

	        dApi.each(eventMethods, function (name, predicate) {
	            var sourceMethod = source[name];

	            event[name] = function () {
	                this[predicate] = returnTrue;

	                return sourceMethod && sourceMethod.apply(source, arguments);
	            };

	            event[predicate] = returnFalse;
	        });

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
	        if (!ignoreProperties.test(key) && event[key] !== undefined) proxy[key] = event[key];
	    }

	    return compatible(proxy, event);
	}

	dApi.$on = function (event, selector, data, callback, one) {
	    var autoRemove,
	        delegator,
	        $this = this;
	    if (event && !isString(event)) {
	        dApi.each(event, function (type, fn) {
	            $this.on(type, selector, data, fn, one);
	        });
	        return $this;
	    }

	    if (!isString(selector) && !isFunction(callback) && callback !== false) callback = data, data = selector, selector = undefined;
	    if (callback === undefined || data === false) callback = data, data = undefined;

	    if (callback === false) callback = returnFalse;

	    return $this.each(function (_, element) {
	        if (one) autoRemove = function (e) {
	            remove(element, e.type, callback);
	            return callback.apply(this, arguments);
	        };

	        if (selector) delegator = function (e) {
	            var evt,
	                match = $(e.target).closest(selector, element).get(0);
	            if (match && match !== element) {
	                evt = $.extend(createProxy(e), {
	                    currentTarget: match,
	                    liveFired: element
	                });
	                return (autoRemove || callback).apply(match, [evt].concat(slice.call(arguments, 1)));
	            }
	        };

	        add(element, event, callback, data, selector, delegator || autoRemove);
	    });
	};

	dApi.$one = function (event, selector, data, callback) {
	    return this.on(event, selector, data, callback, 1);
	};

	dApi.$off = function (event, selector, callback) {
	    var $this = this;
	    if (event && !isString(event)) {
	        $.each(event, function (type, fn) {
	            $this.off(type, selector, fn);
	        });
	        return $this;
	    }

	    if (!isString(selector) && !isFunction(callback) && callback !== false) callback = selector, selector = undefined;

	    if (callback === false) callback = returnFalse;

	    return $this.each(function () {
	        remove(this, event, callback, selector);
	    });
	};

	dApi.$trigger = function (event, args) {
	    event = isString(event) || $.isPlainObject(event) ? $.Event(event) : compatible(event);
	    event._args = args;
	    return this.each(function () {
	        // handle focus(), blur() by calling them directly
	        if (event.type in focus && typeof this[event.type] == "function") this[event.type]();
	        // items in the collection might not be DOM elements
	        else if ('dispatchEvent' in this) this.dispatchEvent(event);else $(this).triggerHandler(event, args);
	    });
	};

	dApi.$triggerHandler = function (event, args) {
	    var e, result;
	    this.each(function (i, element) {
	        e = createProxy(isString(event) ? $.Event(event) : event);
	        e._args = args;
	        e.target = element;
	        $.each(findHandlers(element, event.type || event), function (i, handler) {
	            result = handler.proxy(e);
	            if (e.isImmediatePropagationStopped()) return false;
	        });
	    });
	    return result;
	};

	dApi.Event = function (type, props) {
	    if (!isString(type)) props = type, type = props.type;
	    var event = document.createEvent(specialEvents[type] || 'Events'),
	        bubbles = true;
	    if (props) for (var name in props) name == 'bubbles' ? bubbles = !!props[name] : event[name] = props[name];
	    event.initEvent(type, bubbles, true);
	    return compatible(event);
	};

	exports.dApi = dApi;

/***/ }
/******/ ]);