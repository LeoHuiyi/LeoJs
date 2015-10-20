/**
+-------------------------------------------------------------------
* LeoJs--dom--util.js
+-------------------------------------------------------------------
* @version    1.0.0 beta
* @author     leo
+-------------------------------------------------------------------
*/

import {
    document, arr
}
from "./const.js";

const leoDom = {};
const class2type = {};
const toString = class2type.toString;
const hasOwn = class2type.hasOwnProperty;
const rgenerateId = /\d\.\d{4}/;
const indexOf = arr.indexOf;

"Boolean Number String Function Array Date RegExp Object Error".replace(/[^, ]+/g, function(name) {
    class2type["[object " + name + "]"] = name.toLowerCase();
});

leoDom.noop = function() {};

leoDom.error = function(msg) {
    throw new Error(msg);
};

leoDom.inArray = function(elem, arr, i) {
    return arr == null ? -1 : indexOf.call(arr, elem, i);
};

leoDom.isNumeric = function(obj) {
    return !leoDom.isArray(obj) && (obj - parseFloat(obj) + 1) >= 0;
};

leoDom.isEmptyObject = function(obj) {
    for (let name in obj) {
        return false;
    }

    return true;
};

leoDom.isFunction = function(obj) {
    return leoDom.type(obj) === "function";
};

leoDom.type = function(obj) {
    if (obj == null) {
        return obj + "";
    }

    return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj;
};

leoDom.generateId = function(prefix) {
    prefix = prefix || "LeoJs";

    return String(Math.random() + Math.random()).replace(rgenerateId, prefix);
};

leoDom.isPlainObject = function(obj) {
    if (leoDom.type(obj) !== "object" || obj.nodeType || obj === obj.window) {
        return false;
    }

    if (obj.constructor && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
        return false;
    }

    return true;
};

leoDom.uniq = function(collection) {
    return collection.filter((item, index) => collection.indexOf(item) === index);
};

leoDom.isArray = Array.isArray;

leoDom.extend = function(...arg) {
    let options, name, src, copy, copyIsArray, clone,
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

                if (deep && copy && (leoDom.isPlainObject(copy) ||
                    (copyIsArray = leoDom.isArray(copy)))) {

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

const fcamelCase = function(all, letter) {
    return letter.toUpperCase();
};

const rmsPrefix = /^-ms-/;
const rdashAlpha = /-([a-z])/g;

leoDom.camelCase = function(string) {
    return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
};

leoDom.nodeName = function(elem, name) {
    return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
};

leoDom.globalEval = function(code) {
    let script = document.createElement("script");

    script.text = code;
    document.head.appendChild(script).parentNode.removeChild(script);
};

leoDom.isWindow = function(obj) {
    return obj != null && obj === obj.window;
};

leoDom.isNode = function(node) {
    return !!(node && node.nodeName);
};

leoDom.isNodeList = function(variable) {
    return typeof variable === "object" && /^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(variable)) && variable.length !== undefined && (variable.length === 0 || (typeof variable[0] === "object" && variable[0].nodeType > 0));
};

leoDom.isXMLDoc = function(elem) {
    let documentElement = elem && (elem.ownerDocument || elem).documentElement;
    return documentElement ? documentElement.nodeName !== "HTML" : false;
};

const rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

leoDom.trim = function(text) {
    return text == null ? "" : (text + "").replace(rtrim, "");
};

leoDom.makeArray = function(arr, results) {
    let ret = results || [];

    if (arr != null) {
        if (isArrayLike(Object(arr))) {
            leoDom.merge(ret,
                typeof arr === "string" ?
                [arr] : arr
            );
        } else {
            push.call(ret, arr);
        }
    }

    return ret;
};

const push = arr.push;

leoDom.merge = function(first, second) {
    let len = +second.length,
        j = 0,
        i = first.length;

    for (; j < len; j++) {
        first[i++] = second[j];
    }

    first.length = i;

    return first;
};

function isArrayLike(obj) {
    let length = !!obj && "length" in obj && obj.length,
        type = leoDom.type(obj);

    if (type === "function" || leoDom.isWindow(obj)) {
        return false;
    }

    return type === "array" || length === 0 ||
        typeof length === "number" && length > 0 && (length - 1) in obj;
}

leoDom.each = function(obj, callback) {
    let length, i = 0;

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

export {
    leoDom
};
