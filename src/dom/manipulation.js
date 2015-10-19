/**
+-------------------------------------------------------------------
* LeoJs--dom--manipulation.js
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
from "./core.js";
import {
    concat
}
from "./const.js";

const rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi;
const rhtml = /<|&#?\w+;/;

function domManip(targets, arg, callback) {
    let l = targets.length;

    if (l && arg.length) {
        let value = arg[0];
        if (leoDom.type(value) === 'function') {
            targets.forEach((target, i) => {
                arg[0] = value(target, i, target.innerHTML);
                domManip([target], arg, callback, targets);
            });

            return;
        }

        let context = targets[0].ownerDocument,
            nodes = concat.apply([], concat.apply([], arg).map((node) => {
                let value = leoDom.$(node);

                if (value.length) {
                    return value;
                }

                if (leoDom.type(node) === 'string' && !rhtml.test(node)) {
                    return context.createTextNode(node);
                }
            })),
            fragment, node, first;

        if (!nodes.length) {
            return;
        }

        fragment = context.createDocumentFragment();

        nodes.forEach((elem) => {
            if (elem && targets.indexOf(elem) === -1) {
                fragment.appendChild(elem);
            }
        });

        first = fragment.firstChild;

        if (fragment.childNodes.length === 1) {
            fragment = first;
        }

        let iNoClone = l - 1;

        if (first) {
            targets.forEach((target, index) => {
                node = fragment;

                if (index !== iNoClone) {
                    node = node.cloneNode(true);
                }

                callback(target, node, index);
            });
        }
    }
}

function getAll(context, tag) {
    let ret = typeof context.getElementsByTagName !== "undefined" ?
        context.getElementsByTagName(tag || "*") :
        typeof context.querySelectorAll !== "undefined" ?
        context.querySelectorAll(tag || "*") :
        [];

    return tag === undefined || tag && leoDom.nodeName(context, tag) ?
        _leoDom.merge([context], ret) :
        ret;
}

_leoDom.setApi(leoDom, {
    $remove(selector, removeSelector) {
        let node,
            nodes = removeSelector ? leoDom.$filter(selector, removeSelector) : leoDom.$(selector),
            i = 0;

        for (;
            (node = nodes[i]) != null; i++) {
            leoDom.cleanData && leoDom.cleanData(getAll(node));

            if (node.parentNode) {
                node.parentNode.removeChild(node);
            }
        }
    },

    $empty(selector) {
        selector = leoDom.$(selector);

        var elem, i = 0;

        for (;
            (elem = selector[i]) != null; i++) {
            if (elem.nodeType === 1) {
                leoDom.cleanData && leoDom.cleanData(getAll(elem, false));
                elem.textContent = "";
            }
        }
    },

    text(elem) {
        let node,
            ret = "",
            i = 0,
            nodeType = elem.nodeType;

        if (!nodeType) {
            while ((node = elem[i++])) {
                ret += leoDom.text(node);
            }
        } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
            return elem.textContent;
        } else if (nodeType === 3 || nodeType === 4) {
            return elem.nodeValue;
        }

        return ret;
    },

    $text(selector, value) {
        selector = leoDom.$(selector);

        if (value === undefined) {
            return leoDom.text(selector);
        }

        selector.forEach((node, i) => {
            let val = leoDom.isFunction(value) ? value(node, i, selector) : value;

            if (val !== undefined && (node.nodeType === 1 || node.nodeType === 11 || node.nodeType === 9)) {
                leoDom.$empty(node);
                node.textContent = val;
            }
        });
    },

    clone(elem, data, deepData) {
        let i, l, srcElements, destElements,
            clone = elem.cloneNode(true),
            cloneCopyEvent = leoDom.cloneCopyEvent;

        if (cloneCopyEvent && data) {
            if (deepData) {
                srcElements = srcElements || getAll(elem);
                destElements = destElements || getAll(clone);

                for (i = 0, l = srcElements.length; i < l; i++) {
                    cloneCopyEvent(srcElements[i], destElements[i]);
                }
            } else {
                cloneCopyEvent(elem, clone);
            }
        }

        return clone;
    },

    $clone(selector, data, deepData) {
        data = data == null ? false : data;
        deepData = deepData == null ? data : deepData;

        return leoDom.$(selector).map((node) => {
            return leoDom.clone(node, data, deepData);
        });
    },

    $append(selector, ...arg) {
        domManip(leoDom.$(selector), arg, function(target, node, index) {
            if (target.nodeType === 1 || target.nodeType === 11 || target.nodeType === 9) {
                target.appendChild(node);
            }
        });
    },

    $prepend(selector, ...arg) {
        domManip(leoDom.$(selector), arg, function(target, node, index) {
            if (target.nodeType === 1 || target.nodeType === 11 || target.nodeType === 9) {
                target.insertBefore(node, target.firstChild);
            }
        });
    },

    $before(selector, ...arg) {
        domManip(leoDom.$(selector), arg, function(target, node, index) {
            if (target.parentNode) {
                target.parentNode.insertBefore(node, target);
            }
        });
    },

    $after(selector, ...arg) {
        domManip(leoDom.$(selector), arg, function(target, node, index) {
            if (target.parentNode) {
                target.parentNode.insertBefore(node, target.nextSibling);
            }
        });
    },

    $replaceWith(selector, ...arg) {
        domManip(leoDom.$(selector), arg, function(target, node, index) {
            leoDom.cleanData && leoDom.cleanData(getAll(target));
            let parent = target.parentNode;
            if (parent) {
                parent.replaceChild(node, target);
            }
        });
    },

    htmlPrefilter(html) {
        return html.replace(rxhtmlTag, "<$1></$2>");
    },

    $html(selector, value) {
        selector = leoDom.$(selector);

        if (value === undefined) {
            let elem;
            if ((elem = selector[0]) && elem.nodeType === 1) {
                return elem.innerHTML;
            }
        }

        let type = leoDom.type(value);

        if (type === 'function') {
            selector.forEach((elem, i) => {
                let val = value(elem, i, elem.innerHTML);

                if (leoDom.type(val) === 'string') {
                    leoDom.cleanData && leoDom.cleanData(getAll(elem, false));
                    elem.innerHTML = leoDom.htmlPrefilter(val);
                }
            });
        } else if (type === 'string') {
            value = leoDom.htmlPrefilter(value);

            selector.forEach((elem) => {
                leoDom.cleanData && leoDom.cleanData(getAll(elem, false));
                elem.innerHTML = value;
            });
        }
    }
});

export {
    leoDom
};
