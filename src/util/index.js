/**
+-------------------------------------------------------------------
* LeoJs--util--index.js
+-------------------------------------------------------------------
* @version    1.0.0 beta
* @author     leo
+-------------------------------------------------------------------
*/

const api = {};
const _api = {};
const class2type = {};
const toString = class2type.toString;
const hasOwn = class2type.hasOwnProperty;

let rword = /[^, ]+/g;
let rgenerateId = /\d\.\d{4}/
let uuid = 0;

"Boolean Number String Function Array Date RegExp Object Error".replace(rword, function(name) {
    class2type["[object " + name + "]"] = name.toLowerCase();
});

api.noop = function() {};

api.error = function(msg) {
    throw new Error(msg);
};

api.isNumeric = function(obj) {
    return !api.isArray(obj) && (obj - parseFloat(obj) + 1) >= 0;
};

api.isEmptyObject = function(obj) {
    for (let name in obj) {
        return false;
    }

    return true;
};

api.isFunction = function(obj) {
    return api.type(obj) === "function";
};

api.type = function(obj) {
    if (obj == null) {
        return obj + "";
    }

    return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj;
};

api.generateId = function(prefix) {
    prefix = prefix || "LeoJs";

    return String(Math.random() + Math.random()).replace(rgenerateId, prefix);
};

api.getUuid = function() {
    return 'LeoJs' + uuid++;
};

api.isPlainObject = function(obj) {
    if (api.type(obj) !== "object" || obj.nodeType || obj === obj.window) {
        return false;
    }

    if (obj.constructor && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
        return false;
    }

    return true;
};

api.uniq = function(collection) {
    return collection.filter((item, index) => collection.indexOf(item) === index);
};

api.isArray = Array.isArray;

api.extend = function(...arg) {
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

                if (deep && copy && (api.isPlainObject(copy) ||
                    (copyIsArray = api.isArray(copy)))) {

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

_api.setApi = function(...arg) {
    let target = arg[0], len = arg.length;

    if(!len || api.type(target) !== 'object'){
        return target;
    }

    let i = 1, option, src, copy;

    for(; i < len; i++){
        if(api.type(option = arg[i]) === 'object'){
            for(let name in option){
                src = target[name];
                copy = option[name];

                if(src === copy){
                    continue;
                }

                if(api.type(src) !== 'undefined'){
                    console.warn(name + '已经存在！');
                }

                target[name] = copy;
            }
        }
    }

    return target;
}

export {
    api, _api
};
