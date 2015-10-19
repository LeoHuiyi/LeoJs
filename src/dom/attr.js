/**
+-------------------------------------------------------------------
* LeoJs--dom--attr.js
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
    rnotwhite
}
from "./const.js";

const rclass = /[\t\r\n\f]/g;

function getClass(elem) {
    return elem.getAttribute && elem.getAttribute("class") || "";
}

_leoDom.setApi(leoDom, {
    prop(elem, name, value) {
        let nType = elem.nodeType;

        if (nType === 3 || nType === 8 || nType === 2) {
            return;
        }

        if (value !== undefined) {
            return (elem[name] = value);
        }

        return elem[name];
    },

    $prop(selector, name, value) {
        if (leoDom.isPlainObject(name)) {
            for (let n in name) {
                leoDom.$prop(selector, n, name[n]);
            }

            return;
        }

        selector = leoDom.$(selector);

        if (value === undefined) {
            return leoDom.prop(selector[0], name);
        }

        let callback = leoDom.isFunction(value) ? (node, i) => {
            leoDom.prop(node, name, value(node, i, leoDom.prop(node, name)));
        } : (node, i) => {
            leoDom.prop(node, name, value);
        };

        selector.forEach((node, i) => {
            callback(node, i);
        });
    },

    $removeProp(selector, name) {
        leoDom.$(selector).forEach((node) => {
            delete node[name];
        });
    },

    attr(elem, name, value) {
        let nType = elem.nodeType;

        if (nType === 3 || nType === 8 || nType === 2) {
            return;
        }

        if (typeof elem.getAttribute === "undefined") {
            return leoDom.prop(elem, name, value);
        }

        if (value !== undefined) {
            if (value === null) {
                leoDom.removeAttr(elem, name);
                return;
            }

            elem.setAttribute(name, value + "");

            return value;
        }

        let ret = elem.getAttribute(name);

        return ret == null ? undefined : ret;
    },

    removeAttr(elem, value) {
        let name,
            i = 0,
            attrNames = value && value.match(rnotwhite);

        if (attrNames && elem.nodeType === 1) {
            while ((name = attrNames[i++])) {
                elem.removeAttribute(name);
            }
        }
    },

    $attr(selector, name, value) {
        if (leoDom.isPlainObject(name)) {
            for (let n in name) {
                leoDom.$attr(selector, n, name[n]);
            }

            return;
        }

        selector = leoDom.$(selector);

        if (value === undefined) {
            return leoDom.attr(selector[0], name);
        }

        let callback = leoDom.isFunction(value) ? (node, i) => {
            leoDom.attr(node, name, value(node, i, leoDom.attr(node, name)));
        } : (node, i) => {
            leoDom.attr(node, name, value);
        };

        selector.forEach((node, i) => {
            callback(node, i);
        });
    },

    $removeAttr(selector, name) {
        leoDom.$(selector).forEach((node) => {
            leoDom.removeAttr(node, name);
        });
    },

    $addClass(selector, value) {
        selector = leoDom.$(selector);

        if (leoDom.isFunction(value)) {
            selector.forEach((node, i) => {
                leoDom.$addClass(node, value(node, i, getClass(node)));
            });

            return;
        }

        if (typeof value === "string" && value) {
            let classes = (value || "").match(rnotwhite) || [],
                cur, curValue, clazz, j, finalValue;

            selector.forEach((elem, i) => {
                curValue = getClass(elem);
                cur = elem.nodeType === 1 && (" " + curValue + " ").replace(rclass, " ");

                if (cur) {
                    j = 0;

                    while ((clazz = classes[j++])) {
                        if (cur.indexOf(" " + clazz + " ") < 0) {
                            cur += clazz + " ";
                        }
                    }

                    finalValue = leoDom.trim(cur);

                    if (curValue !== finalValue) {
                        elem.setAttribute("class", finalValue);
                    }
                }
            });
        }
    },

    $removeClass(selector, value) {
        selector = leoDom.$(selector);

        if (leoDom.isFunction(value)) {
            selector.forEach((node, i) => {
                leoDom.$removeClass(node, value(node, i, getClass(node)));
            });

            return;
        }

        if (arguments.length === 1 || typeof value === "string" && value) {
            let classes = (value || "").match(rnotwhite) || [],
                cur, curValue, clazz, j, finalValue;

            selector.forEach((elem, i) => {
                curValue = getClass(elem);
                cur = elem.nodeType === 1 && (" " + curValue + " ").replace(rclass, " ");

                if (cur) {
                    j = 0;

                    while ((clazz = classes[j++])) {
                        while (cur.indexOf(" " + clazz + " ") > -1) {
                            cur = cur.replace(" " + clazz + " ", " ");
                        }
                    }

                    finalValue = value ? leoDom.trim(cur) : "";

                    if (curValue !== finalValue) {
                        elem.setAttribute("class", finalValue);
                    }
                }
            });
        }
    },

    $toggleClass(selector, value, stateVal) {
        let type = typeof value;

        if (typeof stateVal === "boolean" && type === "string") {
            return stateVal ? leoDom.$addClass(selector, value) : leoDom.$removeClass(selector, value);
        }

        selector = leoDom.$(selector);

        if (leoDom.isFunction(value)) {
            selector.forEach((node, i) => {
                leoDom.$toggleClass(node, value(node, i, getClass(node)));
            });

            return;
        }

        selector.forEach((node, i) => {
            if (type === "string") {
                let i = 0,
                    className,
                    classNames = value.match(rnotwhite) || [];

                while ((className = classNames[i++])) {
                    if (leoDom.$hasClass(node, className)) {
                        leoDom.$removeClass(node, className);
                    } else {
                        leoDom.$addClass(node, className);
                    }
                }
            }
        });
    },

    $hasClass(selector, className) {
        selector = leoDom.$(selector);
        className = " " + className + " ";

        let i = 0,
            l = selector.length;

        for (; i < l; i++) {
            if (selector[i].nodeType === 1 && (" " + getClass(selector[i]) + " ").replace(rclass, " ").indexOf(className) > -1) {
                return true;
            }
        }

        return false;
    }
});

(function() {
    let input = document.createElement("input"),
        select = document.createElement("select"),
        opt = select.appendChild(document.createElement("option"));

    input.type = "checkbox";
    support.checkOn = input.value !== "";
    select.disabled = true;
    support.optDisabled = !opt.disabled;
})();

const rreturn = /\r/g;

_leoDom.setApi(leoDom, {
    valHooks: {
        option: {
            get(elem) {
                return leoDom.trim(elem.value);
            }
        },
        select: {
            get(elem) {
                let value, option,
                    options = elem.options,
                    index = elem.selectedIndex,
                    one = elem.type === "select-one" || index < 0,
                    values = one ? null : [],
                    max = one ? index + 1 : options.length,
                    i = index < 0 ? max : one ? index : 0;

                for (; i < max; i++) {
                    option = options[i];
                    if ((option.selected || i === index) && (support.optDisabled ?
                            !option.disabled : option.getAttribute("disabled") === null) &&
                        (!option.parentNode.disabled ||
                            !leoDom.nodeName(option.parentNode, "optgroup"))) {

                        value = leoDom.$val(option);

                        if (one) {
                            return value;
                        }

                        values.push(value);
                    }
                }

                return values;
            },

            set(elem, value) {
                let optionSet, option,
                    options = elem.options,
                    values = Array.isArray(value) ? value : [value],
                    i = options.length;

                while (i--) {
                    option = options[i];

                    if ((option.selected = values.indexOf(leoDom.valHooks.option.get(option)) > -1)) {
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

    $val(selector, value) {
        selector = leoDom.$(selector);

        let hooks, ret, isFunction;

        if (arguments.length === 1) {
            let elem = selector[0];

            if (elem) {
                hooks = leoDom.valHooks[elem.type] || leoDom.valHooks[elem.nodeName.toLowerCase()];

                if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
                    return ret;
                }

                ret = elem.value;

                return typeof ret === "string" ? ret.replace(rreturn, "") : ret == null ? "" : ret;
            }

            return;
        }

        isFunction = leoDom.isFunction(value);

        selector.forEach((node, i) => {
            if (node.nodeType !== 1) {
                return;
            }

            let val;

            if (isFunction) {
                val = value(node, i, leoDom.$val(node));
            } else {
                val = value;
            }

            if (val == null) {
                val = "";
            } else if (typeof val === "number") {
                val += "";
            } else if (Array.isArray(val)) {
                val = val.map((value) => {
                    return value == null ? "" : value + "";
                });
            }

            hooks = leoDom.valHooks[node.type] || leoDom.valHooks[node.nodeName.toLowerCase()];

            if (!hooks || !("set" in hooks) || hooks.set(node, val, "value") === undefined) {
                node.value = val;
            }
        });
    }
});

["radio", "checkbox"].forEach((name) => {
    leoDom.valHooks[name] = {
        set: function(elem, value) {
            if (Array.isArray(value)) {
                return (elem.checked = value.indexOf(leoDom.$val(elem)) > -1);
            }
        }
    };

    if (!support.checkOn) {
        leoDom.valHooks[name].get = function(elem) {
            return elem.getAttribute("value") === null ? "on" : elem.value;
        };
    }
});

export {
    leoDom
};
