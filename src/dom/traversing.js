/**
+-------------------------------------------------------------------
* LeoJs--dom--traversing.js
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
    slice, concat
}
from "./const.js";

function sibling(cur, dir) {
    while ((cur = cur[dir]) && cur.nodeType !== 1) {}

    return cur;
}

_leoDom.setApi(leoDom, {
    dir(elem, dir, until) {
        var matched = [],
            truncate = until !== undefined;

        while ((elem = elem[dir]) && elem.nodeType !== 9) {
            if (elem.nodeType === 1) {
                if (truncate && leoDom.$is(elem, until)) {
                    break;
                }

                matched.push(elem);
            }
        }

        return matched;
    },

    sibling(n, elem) {
        var matched = [];

        for (; n; n = n.nextSibling) {
            if (n.nodeType === 1 && n !== elem) {
                matched.push(n);
            }
        }

        return matched;
    }
});

const rparentsprev = /^(?:parents|prev(?:Until|All))/;

const guaranteedUnique = {
    children: true,
    contents: true,
    next: true,
    prev: true
};

let treeObj = {
    parent(elem) {
        let parent = elem.parentNode;
        return parent && parent.nodeType !== 11 ? parent : null;
    },
    parents(elem) {
        return leoDom.dir(elem, "parentNode");
    },
    parentsUntil(elem, i, until) {
        return leoDom.dir(elem, "parentNode", until);
    },
    next(elem) {
        return sibling(elem, "nextSibling");
    },
    prev(elem) {
        return sibling(elem, "previousSibling");
    },
    nextAll(elem) {
        return leoDom.dir(elem, "nextSibling");
    },
    prevAll(elem) {
        return leoDom.dir(elem, "previousSibling");
    },
    nextUntil(elem, i, until) {
        return leoDom.dir(elem, "nextSibling", until);
    },
    prevUntil(elem, i, until) {
        return leoDom.dir(elem, "previousSibling", until);
    },
    siblings(elem) {
        return leoDom.sibling((elem.parentNode || {}).firstChild, elem);
    },
    children(elem) {
        return leoDom.sibling(elem.firstChild);
    },
    contents(elem) {
        return elem.contentDocument || slice.call(elem.childNodes);
    }
};

for (let name in treeObj) {
    let fn = treeObj[name];
    _leoDom.setApi(leoDom, {
        ['$' + name](selector, until, treeSelector) {
            selector = leoDom.$(selector);

            let matched = selector.map((elem, i) => {
                return fn(elem, i, until);
            });

            matched = concat.apply([], matched);

            if (name.slice(-5) !== "Until") {
                treeSelector = until;
            }

            if (treeSelector && typeof treeSelector === "string") {
                matched = leoDom.$filter(matched, treeSelector);
            }

            if (selector.length > 1) {
                if (!guaranteedUnique[name]) {
                    leoDom.uniqueSort(matched);
                }

                if (rparentsprev.test(name)) {
                    matched.reverse();
                }
            }

            return matched;
        }
    });
};

export {
    leoDom
};
