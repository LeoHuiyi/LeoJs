/**
+-------------------------------------------------------------------
* LeoJs--dom--css.js
+-------------------------------------------------------------------
* @version    1.0.0 beta
* @author     leo
+-------------------------------------------------------------------
*/

import {
    _leoDom, support
}
from "./private.js";
import {
    leoDom
}
from "./core.js";
import {
    document, documentElement
}
from "./const.js";

const pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;
const rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");
const rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");
const rmargin = (/^margin/);
const cssExpand = ["Top", "Right", "Bottom", "Left"];
const rdisplayswap = /^(none|table(?!-c[ea]).+)/;
const cssShow = {
    position: "absolute",
    visibility: "hidden",
    display: "block"
};
const cssNormalTransform = {
    letterSpacing: "0",
    fontWeight: "400"
};
const cssPrefixes = ["Webkit", "Moz", "ms"];
const emptyStyle = document.createElement("div").style;

(function() {
    let boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
        container = document.createElement("div"),
        div = document.createElement("div");

    if (!div.style) {
        return;
    }

    div.style.backgroundClip = "content-box";
    div.cloneNode(true).style.backgroundClip = "";
    support.clearCloneStyle = div.style.backgroundClip === "content-box";

    container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
        "padding:0;margin-top:1px;position:absolute";
    container.appendChild(div);

    function computeStyleTests() {
        div.style.cssText =
            "box-sizing:border-box;" +
            "position:relative;display:block;" +
            "margin:auto;border:1px;padding:1px;" +
            "top:1%;width:50%";
        div.innerHTML = "";
        documentElement.appendChild(container);

        let divStyle = window.getComputedStyle(div);
        reliableMarginLeftVal = divStyle.marginLeft === "2px";
        boxSizingReliableVal = divStyle.width === "4px";

        // Support: Android 4.0 - 4.3 only
        // Some styles come back with percentage values, even though they shouldn't
        div.style.marginRight = "50%";
        pixelMarginRightVal = divStyle.marginRight === "4px";

        documentElement.removeChild(container);
    }

    leoDom.extend(support, {
        boxSizingReliable: function() {
            if (boxSizingReliableVal == null) {
                computeStyleTests();
            }
            return boxSizingReliableVal;
        },
        pixelMarginRight: function() {
            if (boxSizingReliableVal == null) {
                computeStyleTests();
            }
            return pixelMarginRightVal;
        },
        reliableMarginLeft: function() {
            if (boxSizingReliableVal == null) {
                computeStyleTests();
            }
            return reliableMarginLeftVal;
        }
    });
})();

function swap(elem, options, callback, args) {
    let ret, name,
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
    let adjusted,
        scale = 1,
        maxIterations = 20,
        currentValue = function() {
            return leoDom.css(elem, prop, "");
        },
        initial = currentValue(),
        unit = valueParts && valueParts[3] || (leoDom.cssNumber[prop] ? "" : "px"),
        initialInUnit = (leoDom.cssNumber[prop] || unit !== "px" && +initial) && rcssNum.exec(leoDom.css(elem, prop));

    if (initialInUnit && initialInUnit[3] !== unit) {
        unit = unit || initialInUnit[3];
        valueParts = valueParts || [];
        initialInUnit = +initial || 1;

        do {
            scale = scale || ".5";
            initialInUnit = initialInUnit / scale;
            leoDom.style(elem, prop, initialInUnit + unit);
        } while (
            scale !== (scale = currentValue() / initial) && scale !== 1 && --maxIterations
        );
    }

    if (valueParts) {
        initialInUnit = +initialInUnit || +initial || 0;
        adjusted = valueParts[1] ?
            initialInUnit + (valueParts[1] + 1) * valueParts[2] :
            +valueParts[2];
    }

    return adjusted;
}

function getStyles(elem) {
    let view = elem.ownerDocument.defaultView;

    if (!view.opener) {
        view = window;
    }

    return view.getComputedStyle(elem);
}

function curCSS(elem, name, computed) {
    let width, minWidth, maxWidth, ret,
        style = elem.style;

    computed = computed || getStyles(elem);

    if (computed) {
        ret = computed.getPropertyValue(name) || computed[name];

        if (ret === "" && !leoDom.contains(elem.ownerDocument, elem)) {
            ret = leoDom.style(elem, name);
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
        get: function() {
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

    let capName = name[0].toUpperCase() + name.slice(1),
        i = cssPrefixes.length;

    while (i--) {
        name = cssPrefixes[i] + capName;
        if (name in emptyStyle) {
            return name;
        }
    }
}

function setPositiveNumber(elem, value, subtract) {
    let matches = rcssNum.exec(value);

    return matches ? Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px") : value;
}

function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
    let i = extra === (isBorderBox ? "border" : "content") ? 4 : name === "width" ? 1 : 0,
        val = 0;

    for (; i < 4; i += 2) {
        if (extra === "margin") {
            val += leoDom.css(elem, extra + cssExpand[i], true, styles);
        }

        if (isBorderBox) {
            if (extra === "content") {
                val -= leoDom.css(elem, "padding" + cssExpand[i], true, styles);
            }

            if (extra !== "margin") {
                val -= leoDom.css(elem, "border" + cssExpand[i] + "Width", true, styles);
            }
        } else {
            val += leoDom.css(elem, "padding" + cssExpand[i], true, styles);

            if (extra !== "padding") {
                val += leoDom.css(elem, "border" + cssExpand[i] + "Width", true, styles);
            }
        }
    }

    return val;
}

function getWidthOrHeight(elem, name, extra) {
    let val,
        valueIsBorderBox = true,
        styles = getStyles(elem),
        isBorderBox = leoDom.css(elem, "boxSizing", false, styles) === "border-box";

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

    return (val +
        augmentWidthOrHeight(
            elem,
            name,
            extra || (isBorderBox ? "border" : "content"),
            valueIsBorderBox,
            styles
        )
    ) + "px";
}

_leoDom.setApi(leoDom, {
    cssHooks: {
        opacity: {
            get: function(elem, computed) {
                if (computed) {
                    let ret = curCSS(elem, "opacity");

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

    style(elem, name, value, extra) {
        if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
            return;
        }

        let ret, type, hooks,
            origName = leoDom.camelCase(name),
            style = elem.style;

        name = leoDom.cssProps[origName] ||
            (leoDom.cssProps[origName] = vendorPropName(origName) || origName);
        hooks = leoDom.cssHooks[name] || leoDom.cssHooks[origName];

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
                value += ret && ret[3] || (leoDom.cssNumber[origName] ? "" : "px");
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

    css(elem, name, extra, styles) {
        let val, num, hooks,
            origName = leoDom.camelCase(name);

        name = leoDom.cssProps[origName] || (leoDom.cssProps[origName] = vendorPropName(origName) || origName);
        hooks = leoDom.cssHooks[name] || leoDom.cssHooks[origName];

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

            return extra === true || leoDom.isNumeric(num) ? num || 0 : val;
        }

        return val;
    },

    $css(selector, name, value) {
        if (leoDom.isPlainObject(name)) {
            for (let n in name) {
                leoDom.$css(selector, n, name[n]);
            }

            return;
        }

        selector = leoDom.$(selector);

        if (Array.isArray(name)) {
            let i = 0,
                elem = selector[0],
                map = {},
                styles = getStyles(elem),
                len = name.length;

            for (; i < len; i++) {
                map[name[i]] = leoDom.css(elem, name[i], false, styles);
            }

            return map;
        }

        if (value === undefined) {
            return leoDom.css(selector[0], name);
        }

        let callback = leoDom.isFunction(value) ? (node, i) => {
            leoDom.style(node, name, value(node, i, leoDom.css(node, name)));
        } : (node, i) => {
            leoDom.style(node, name, value);
        };

        selector.forEach((node, i) => {
            callback(node, i);
        });
    }
});

["height", "width"].forEach((name) => {
    leoDom.cssHooks[name] = {
        get(elem, computed, extra) {
            if (computed) {
                return rdisplayswap.test(leoDom.css(elem, "display")) && (!elem.getClientRects().length || !elem.getBoundingClientRect().width) ?
                    swap(elem, cssShow, function() {
                        return getWidthOrHeight(elem, name, extra);
                    }) :
                    getWidthOrHeight(elem, name, extra);
            }
        },

        set(elem, value, extra) {
            let matches, styles = extra && getStyles(elem),
                subtract = extra && augmentWidthOrHeight(
                    elem,
                    name,
                    extra,
                    leoDom.css(elem, "boxSizing", false, styles) === "border-box",
                    styles
                );

            if (subtract && (matches = rcssNum.exec(value)) &&
                (matches[3] || "px") !== "px") {

                elem.style[name] = value;
                value = leoDom.css(elem, name);
            }

            return setPositiveNumber(elem, value, subtract);
        }
    };
});

leoDom.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft,
    function(elem, computed) {
        if (computed) {
            return (parseFloat(curCSS(elem, "marginLeft")) ||
                elem.getBoundingClientRect().left -
                swap(elem, {
                    marginLeft: 0
                }, function() {
                    return elem.getBoundingClientRect().left;
                })
            ) + "px";
        }
    }
);

const sizeObj = {
    Height: "height",
    Width: "width"
};

for (let name in sizeObj) {
    let type = sizeObj[name];
    let boxObj = {
        padding: "inner" + name,
        content: type,
        "": "outer" + name
    };

    for (let defaultExtra in boxObj) {
        let funcName = '$' + boxObj[defaultExtra];

        _leoDom.setApi(leoDom, {
            [funcName](selector, value) {
                selector = leoDom.$(selector);

                let elem = selector[0];

                if (leoDom.isWindow(elem)) {
                    return elem.document.documentElement["client" + name];
                }

                if (elem.nodeType === 9) {
                    let doc = elem.documentElement;

                    return Math.max(
                        elem.body["scroll" + name], doc["scroll" + name],
                        elem.body["offset" + name], doc["offset" + name],
                        doc["client" + name]
                    );
                }

                let extra = defaultExtra || (value === true ? "margin" : "border");

                if (value === undefined || typeof value === 'boolean') {
                    return leoDom.css(elem, type, extra);
                }

                let callback = leoDom.isFunction(value) ? (node, i) => {
                    leoDom.style(node, type, value(node, i, leoDom[funcName](node)), extra);
                } : (node, i) => {
                    leoDom.style(node, type, value, extra);
                };

                selector.forEach((node, i) => {
                    callback(node, i);
                });
            }
        });
    }
}

export {
    leoDom
};
