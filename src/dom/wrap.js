/**
+-------------------------------------------------------------------
* LeoJs--dom--wrap.js
+-------------------------------------------------------------------
* @version    1.0.0 beta
* @author     leo
+-------------------------------------------------------------------
*/

import {
    _leoDom
}
from "./private.js";
import "./traversing.js";
import {
    leoDom
}
from "./manipulation.js";

_leoDom.setApi(leoDom, {
    $wrapAll(selector, html) {
        selector = leoDom.$(selector);

        let elem = selector[0];

        if (elem) {
            if (leoDom.isFunction(html)) {
                html = html(elem);
            }

            let wrap = leoDom.$(html, elem.ownerDocument)[0];

            if (!wrap) {
                return;
            }

            wrap = leoDom.$clone(wrap, true)[0];

            if (elem.parentNode) {
                elem.parentNode.insertBefore(wrap, elem);
            }

            while (wrap.firstElementChild) {
                wrap = wrap.firstElementChild;
            }

            leoDom.$append(wrap, selector);
        }
    },

    $wrapInner(selector, html) {
        selector = leoDom.$(selector);

        if (leoDom.isFunction(html)) {
            return selector.forEach((node, i) => {
                leoDom.$wrapInner(node, html(node, i));
            });
        }

        selector.forEach((node) => {
            let contents = leoDom.$contents(node);

            if (contents.length) {
                leoDom.$wrapAll(contents, html);
            } else {
                leoDom.$append(node, html);
            }
        });
    },

    $wrap(selector, html) {
        selector = leoDom.$(selector);

        let isFunction = leoDom.isFunction(html);

        selector.forEach((node, i) => {
            leoDom.$wrapAll(node, isFunction ? html(node, i) : html);
        });
    },

    $unwrap(selector, unwrapSelector) {
        leoDom.$not(leoDom.$parent(selector, unwrapSelector), 'body').forEach((elem) => {
            leoDom.$replaceWith(elem, elem.childNodes);
        });
    }
});

export {
    leoDom
};
