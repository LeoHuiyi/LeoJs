/**
+-------------------------------------------------------------------
* LeoJs--dom--core.js
+-------------------------------------------------------------------
* @version    1.0.0 beta
* @author     leo
+-------------------------------------------------------------------
*/

import {
    _leoDom
}
from "./private.js";
import {
    leoDom
}
from "./util.js";
import {
    document, documentElement, slice
}
from "./const.js";

const reSingleTag = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/;
const rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;
const reSimpleSelector = /^[\.#]?[\w-]*$/;
const matches = documentElement.matches ||
    documentElement.webkitMatchesSelector ||
    documentElement.mozMatchesSelector ||
    documentElement.oMatchesSelector ||
    documentElement.msMatchesSelector;

let hasDuplicate;
let readyList = [];
let isReady;
let fireReady = function(fn) {
    isReady = true;

    while (fn = readyList.shift()) {
        fn();
    }

    document.removeEventListener("DOMContentLoaded", fireReady);
    window.removeEventListener("load", fireReady);
};

if (document.readyState === "complete") {
    setTimeout(fireReady);
} else {
    document.addEventListener("DOMContentLoaded", fireReady);
}

window.addEventListener("load", fireReady);

function querySelector(selector, context = document) {
    let isSimpleSelector = reSimpleSelector.test(selector);

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

function sortOrder(a, b) {
    if (a === b) {
        hasDuplicate = true;
        return 0;
    }

    let compare = b.compareDocumentPosition &&
        a.compareDocumentPosition &&
        a.compareDocumentPosition(b);

    if (compare) {
        if (compare & 1) {
            if (a === document || leoDom.contains(document, a)) {
                return -1;
            }

            if (b === document || leoDom.contains(document, b)) {
                return 1;
            }

            return 0;
        }

        return compare & 4 ? -1 : 1;
    }

    return a.compareDocumentPosition ? -1 : 1;
};

_leoDom.setApi(leoDom, {
    $id(id, context = document) {
        return context.getElementById(id);
    },

    $tag(tagName, context = document) {
        return context.getElementsByTagName(tagName);
    },

    $class(className, context = document) {
        return context.getElementsByClassName(className);
    },

    $qs(selector, context = document) {
        return context.querySelector(selector);
    },

    $qsa(selector, context = document) {
        return context.querySelectorAll(selector);
    },

    $newHtml(html, context = document) {
        if (typeof html !== 'string') {
            return;
        }

        let _html = html.match(rquickExpr);

        if (_html && (_html = _html[1])) {
            if (typeof context === 'string') {
                context = querySelector(context);
            }

            context[0] && (context = context[0]);
            context = context && context.nodeType ? context.ownerDocument || context : document;

            if (reSingleTag.test(_html)) {
                return [context.createElement(RegExp.$1)];
            }

            let domArr = [],
                container = context.createElement('div'),
                children = container.childNodes;

            container.innerHTML = _html;

            for (let i = 0, l = children.length; i < l; i++) {
                domArr.push(container.removeChild(children[i]));
            }

            return domArr;
        }
    },

    ready(fn) {
        if (!isReady) {
            readyList.push(fn);
        } else {
            fn();
        }
    },

    $(selector, context) {
        if (leoDom.isPlainObject(selector)) {
            context = selector.context;
            selector = selector.selector;
        }

        if (!selector) {
            return [];
        }

        if (leoDom.isFunction(selector)) {
            leoDom.ready(selector);

            return [];
        }

        if (Array.isArray(selector)) {
            return selector;
        }

        if (selector.nodeType || leoDom.isWindow(selector)) {
            return [selector];
        }

        if (selector instanceof HTMLCollection || selector instanceof NodeList) {
            return slice.call(selector);
        }

        if (typeof selector === 'string') {
            let html;

            if ((html = leoDom.$newHtml(selector, context))) {
                return html;
            }

            if (!context) {
                return querySelector(selector);
            } else {
                if (context.nodeType === 1) {
                    return querySelector(selector, context);
                } else {
                    return leoDom.$find(context, selector);
                }
            }

        }

        return [];
    },

    contains(a, b) {
        let adown = a.nodeType === 9 ? a.documentElement : a,
            bup = b && b.parentNode;

        return a === bup || !!(bup && bup.nodeType === 1 && adown.contains(bup));
    },

    matchesSelector(element, expr) {
        return matches.call(element, expr);
    },

    matches(elements, expr) {
        return leoDom.find(expr, null, null, elements);
    },

    uniqueSort(results) {
        let elem,
            duplicates = [],
            i = 0,
            j = 0;

        hasDuplicate = false;
        results.sort(sortOrder);

        if (hasDuplicate) {
            while ((elem = results[i++])) {
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

    find(selector, context, results, seed) {
        let elem, nodeType,
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
            while ((elem = seed[i++])) {
                if (leoDom.matchesSelector(elem, selector)) {
                    results.push(elem);
                }
            }
        } else {
            _leoDom.merge(results, querySelector(selector, context));
        }

        return results;
    },

    $is(selector, isSelector) {
        selector = leoDom.$(selector);

        let callback = typeof isSelector === 'string' ? (el) => {
            if (el.nodeType === 1) {
                return leoDom.matchesSelector(el, isSelector);
            }
        } : leoDom.isFunction(isSelector) ? (el, i) => {
            return !!isSelector(el, i);
        } : (el) => {
            return leoDom.$(isSelector).some((node) => {
                return node === el;
            });
        };

        return selector.some((el, i) => {
            return callback(el, i);
        });
    },

    $filter(selector, filterSelector) {
        selector = leoDom.$(selector);

        let callback = leoDom.isFunction(filterSelector) ? (el, i) => {
            return !!filterSelector(el, i);
        } : (el) => {
            return leoDom.$is(el, filterSelector);
        };

        return selector.filter((el, i) => {
            return callback(el, i);
        });
    },

    $not(selector, notSelector) {
        selector = leoDom.$(selector);

        let callback = leoDom.isFunction(notSelector) ? (el, i) => {
            return !!notSelector(el, i);
        } : (el) => {
            return leoDom.$is(el, notSelector);
        };

        return selector.filter((el, i) => {
            return !callback(el, i);
        });
    },

    $find(selector, findSelector) {
        selector = leoDom.$(selector);

        let i, len = selector.length,
            ret = [];

        if (typeof findSelector !== "string") {
            return leoDom.$(findSelector).filter((node) => {
                for (i = 0; i < len; i++) {
                    if (leoDom.contains(selector[i], node)) {
                        return true;
                    }
                }
            });
        }

        for (i = 0; i < len; i++) {
            leoDom.find(findSelector, selector[i], ret);
        }

        return len > 1 ? leoDom.uniqueSort(ret) : ret;
    },

    $add(selector, addSelector, context) {
        selector = leoDom.$(selector);

        return leoDom.uniqueSort(
            _leoDom.merge(selector, leoDom.$(addSelector, context))
        );
    },

    $has(selector, hasSelector) {
        selector = leoDom.$(selector);

        let targets = leoDom.$(hasSelector, selector),
            l = targets.length;

        return selector.filter(function(node) {
            for (let i = 0; i < l; i++) {
                if (leoDom.contains(node, targets[i])) {
                    return true;
                }
            }
        });
    },

    $closest(selector, closestSelector, context) {
        selector = leoDom.$(selector);

        let cur,
            i = 0,
            l = selector.length,
            matched = [],
            pos = typeof closestSelector !== "string" ?
            leoDom.$(closestSelector, context || document) :
            0;

        for (; i < l; i++) {
            for (cur = selector[i]; cur && cur !== context; cur = cur.parentNode) {
                if (cur.nodeType < 11 && (pos ? pos.indexOf(cur) > -1 : cur.nodeType === 1 && leoDom.matchesSelector(cur, closestSelector))) {
                    matched.push(cur);
                    break;
                }
            }
        }

        return matched.length > 1 ? leoDom.uniqueSort(matched) : matched
    }
});

export {
    leoDom
};
