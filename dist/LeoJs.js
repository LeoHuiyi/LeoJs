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

	// dApi.uiPosition(".positionable", {
	//     of: "#parent",
	//     my: 'center bottom',
	//     at: 'center top',
	//     collision: 'none fit',
	//     within: window
	// });
	// var input = dApi.$('input')
	// dApi.$data(input, 'leo', 'sdfsdfdsfsd')
	// console.log(dApi.$data(input, 'leo'))
	// dApi.$replaceWith(input, 'asasdass');
	// console.log(dApi.$data(input, 'leo'), input);
	// console.log($('.innerHa').data('leo', 'sdfdsfdd'))
	// console.log($('.innerHa').data('leo'))

	dApi.$on('input', 'click', function () {
	    for (var _len = arguments.length, arg = Array(_len), _key = 0; _key < _len; _key++) {
	        arg[_key] = arguments[_key];
	    }

	    console.log(arg, 'leo');
	    console.log(this);
	});

	// dApi.$on(document, 'mouseenter.leo', 'div', function(event){
	//     console.log(event.target)
	// })

	// $('input').on('click', function(...arg) {
	//     console.log(arg, 'leo')
	//     console.log(this)
	// });

	// dApi.$trigger('input', 'foucs');

	// dApi.$triggerHandler('input', 'foucs');
	// $('input').trigger('foucs');
	// $('input').triggerHandler('foucs');
	//
	// console.log(dApi.$('input')[0].focus())

	// dApi.$trigger('#foucs', 'foucs', ['one', 'two'])

	// $('#foucs').trigger('foucs', ['one', 'two'])

	// dApi.$off(document, '.leo')

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

	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./dom/core.js\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./dom/travesing.js\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./dom/manipulation.js\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./dom/attr.js\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./dom/css.js\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./dom/data.js\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./dom/offset.js\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var _domEventJs = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./dom/event.js\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	exports["default"] = _domEventJs.leoDom;
	module.exports = exports["default"];

/***/ }
/******/ ]);