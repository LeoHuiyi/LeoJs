/**
+-------------------------------------------------------------------
* LeoJs--dom--offset.js
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
from "./css.js";
import {
    documentElement
}
from "./const.js";

function getWindow(elem) {
    return leoDom.isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
}

const scrollObj = {
    scrollLeft: "pageXOffset",
    scrollTop: "pageYOffset"
};

for (let method in scrollObj) {
    let prop = scrollObj[method];
    let top = "pageYOffset" === prop;
    let $method = '$' + method;

    _leoDom.setApi(leoDom, {
        [$method](selector, val) {
            selector = leoDom.$(selector);

            if (val === undefined) {
                let elem = selector[0];
                let win = getWindow(elem);

                return win ? win[prop] : elem[method];
            }

            let callback = leoDom.isFunction(val) ? (node, i) => {
                leoDom[$method](node, val(node, i));
            } : (node, i) => {
                let win = getWindow(node);

                if (win) {
                    win.scrollTo(!top ? val : win.pageXOffset,
                        top ? val : win.pageYOffset
                    );

                } else {
                    node[method] = val;
                }
            };

            selector.forEach((node, i) => {
                callback(node, i);
            });
        }
    });
}

_leoDom.setApi(leoDom, {
    $offsetParent(selector) {
        return leoDom.$(selector).map((node) => {
            let offsetParent = node.offsetParent;

            while (offsetParent && leoDom.css(offsetParent, "position") === "static") {
                offsetParent = offsetParent.offsetParent;
            }

            return offsetParent || documentElement;
        });
    },

    $position(selector) {
        selector = leoDom.$(selector);

        if (!selector[0]) {
            return;
        }

        let offsetParent, offset,
            elem = selector[0],
            parentOffset = {
                top: 0,
                left: 0
            };

        if (leoDom.css(elem, "position") === "fixed") {
            offset = elem.getBoundingClientRect();
        } else {
            offsetParent = leoDom.$offsetParent(selector);
            offset = leoDom.$offset(selector);

            if (!leoDom.nodeName(offsetParent[0], "html")) {
                parentOffset = leoDom.$offset(offsetParent);
            }

            parentOffset.top += leoDom.css(offsetParent[0], "borderTopWidth", true) -
                leoDom.$scrollTop(offsetParent);
            parentOffset.left += leoDom.css(offsetParent[0], "borderLeftWidth", true) -
                leoDom.$scrollLeft(offsetParent);
        }

        return {
            top: offset.top - parentOffset.top - leoDom.css(elem, "marginTop", true),
            left: offset.left - parentOffset.left - leoDom.css(elem, "marginLeft", true)
        };
    },

    $offset(selector, options) {
        selector = leoDom.$(selector);

        if (options) {
            selector.forEach((node, i) => {
                leoDom.setOffset(node, options, i);
            });

            return;
        }

        let docElem, win, rect, doc,
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

    setOffset(elem, options, i) {
        let curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
            position = leoDom.css(elem, "position"),
            curElem = leoDom.$(elem),
            props = {};

        if (position === "static") {
            elem.style.position = "relative";
        }

        curOffset = leoDom.$offset(curElem);
        curCSSTop = leoDom.css(elem, "top");
        curCSSLeft = leoDom.css(elem, "left");
        calculatePosition = (position === "absolute" || position === "fixed") &&
            (curCSSTop + curCSSLeft).indexOf("auto") > -1;

        if (calculatePosition) {
            curPosition = leoDom.$position(curElem);
            curTop = curPosition.top;
            curLeft = curPosition.left;

        } else {
            curTop = parseFloat(curCSSTop) || 0;
            curLeft = parseFloat(curCSSLeft) || 0;
        }

        if (leoDom.isFunction(options)) {
            options = options(elem, i, leoDom.extend({}, curOffset));
        }

        if (options.top != null) {
            props.top = (options.top - curOffset.top) + curTop;
        }
        if (options.left != null) {
            props.left = (options.left - curOffset.left) + curLeft;
        }

        if ("using" in options) {
            options.using(elem, props);
        } else {
            leoDom.$css(curElem, props);
        }
    }
});

export {
    leoDom
};
