/**
+-------------------------------------------------------------------
* LeoJs--dom--prvate.js
+-------------------------------------------------------------------
* @version    1.0.0 beta
* @author     leo
+-------------------------------------------------------------------
*/

import {
    arr, slice
}
from "./const.js";

const _leoDom = {};

_leoDom.setApi = function(...arg) {
    let target = arg[0],
        len = arg.length;

    if (!len) {
        return target;
    }

    let i = 1,
        options, src, copy;

    for (; i < len; i++) {
        if ((options = arg[i]) != null) {
            for (let name in options) {
                src = target[name];
                copy = options[name];

                if (src === copy) {
                    continue;
                }

                if (typeof src !== 'undefined') {
                    console.warn(name + '已经存在！');
                }

                target[name] = copy;
            }
        }
    }

    return target;
};

const some = arr.some;
const filter = arr.filter;
const indexOf = arr.indexOf;

_leoDom.setApi(_leoDom, {
    some(elem, callback) {
        return some.call(elem.length ? elem : [elem], callback);
    },

    filter(elem, callback) {
        return filter.call(elem.length ? elem : [elem], callback);
    },

    merge(first, second) {
        if (typeof first !== 'undefined' && typeof first.length === 'undefined') {
            first = [first];
        }

        if (typeof second !== 'undefined' && typeof second.length === 'undefined') {
            second = [second];
        }

        let len = +second.length,
            j = 0,
            i = first.length;

        for (; j < len; j++) {
            first[i++] = second[j];
        }

        first.length = i;

        return first;
    },

    inArray(elems, elem) {
        return indexOf.call(elems.length ? elems : [elems], elem) > -1;
    },

    domToArr(elem) {
        if (!elem) {
            return false;
        }

        if (typeof elem.length === 'undefined') {
            return [elem];
        }

        return slice.call(elem);
    }
});

let support = _leoDom.support = {};

export {_leoDom, support};
