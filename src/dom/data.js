/**
+-------------------------------------------------------------------
* LeoJs--dom--data.js
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
    rnotwhite
}
from "./const.js";

class Data {
    static accepts(owner) {
        return owner.nodeType === 1 || owner.nodeType === 9 || !(+owner.nodeType);
    }

    constructor() {
        this.expando = Data.expando + Data.uid++;
    }

    cache(owner) {
        let value = owner[this.expando];

        if (!value) {
            value = {};

            if (Data.accepts(owner)) {
                if (owner.nodeType) {
                    owner[this.expando] = value;
                } else {
                    Object.defineProperty(owner, this.expando, {
                        value: value,
                        configurable: true
                    });
                }
            }
        }

        return value;
    }

    set(owner, data, value) {
        let prop,
            cache = this.cache(owner);

        if (typeof data === "string") {
            cache[leoDom.camelCase(data)] = value;
        } else {
            for (prop in data) {
                cache[leoDom.camelCase(prop)] = data[prop];
            }
        }

        return cache;
    }

    get(owner, key) {
        let cache = this.cache(owner);

        return key === undefined ? cache : cache[leoDom.camelCase(key)];
    }

    access(owner, key, value) {
        if (key === undefined || ((key && typeof key === "string") && value === undefined)) {
            return this.get(owner, key);
        }

        this.set(owner, key, value);

        return value !== undefined ? value : key;
    }

    remove(owner, key) {
        let i,
            cache = owner[this.expando];

        if (cache === undefined) {
            return;
        }

        if (key !== undefined) {
            if (Array.isArray(key)) {
                key = key.map(leoDom.camelCase);
            } else {
                key = leoDom.camelCase(key);
                key = key in cache ? [key] : (key.match(rnotwhite) || []);
            }

            i = key.length;

            while (i--) {
                delete cache[key[i]];
            }
        }

        if (key === undefined || leoDom.isEmptyObject(cache)) {
            delete owner[this.expando];
        }
    }

    hasData(owner) {
        let cache = owner[this.expando];

        return cache !== undefined && !leoDom.isEmptyObject(cache);
    }
}

Data.expando = leoDom.generateId('leoDomData');
Data.uid = 1;

let dataPriv = new Data();
let dataUser = new Data();

const rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
    rmultiDash = /[A-Z]/g;

function dataAttr(elem, key, data) {
    if (data === undefined && elem.nodeType === 1) {
        let name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
        data = elem.getAttribute(name);

        if (typeof data === "string") {
            try {
                data = data === "true" ? true :
                    data === "false" ? false :
                    data === "null" ? null :
                    +data + "" === data ? +data :
                    rbrace.test(data) ? JSON.parse(data) :
                    data;
            } catch (e) {}
            dataUser.set(elem, key, data);
        } else {
            data = undefined;
        }
    }

    return data;
}

_leoDom.setApi(leoDom, {
    hasData(elem) {
        return dataUser.hasData(elem) || dataPriv.hasData(elem);
    },

    data(elem, name, data) {
        return dataUser.access(elem, name, data);
    },

    removeData(elem, name) {
        dataUser.remove(elem, name);
    },

    _data(elem, name, data) {
        return dataPriv.access(elem, name, data);
    },

    _removeData(elem, name) {
        dataPriv.remove(elem, name);
    },

    $data(selector, key, value) {
        selector = leoDom.$(selector);

        let i, name, data,
            elem = selector[0],
            attrs = elem && elem.attributes;

        if (key === undefined) {
            if (selector.length) {
                data = dataUser.get(elem);

                if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
                    i = attrs.length;

                    while (i--) {
                        if (attrs[i]) {
                            name = attrs[i].name;

                            if (name.indexOf("data-") === 0) {
                                name = leoDom.camelCase(name.slice(5));
                                dataAttr(elem, name, data[name]);
                            }
                        }
                    }

                    dataPriv.set(elem, "hasDataAttrs", true);
                }
            }

            return data;
        }

        if (typeof key === "object") {
            selector.forEach((node) => {
                dataUser.set(node, key);
            });

            return;
        }

        if (elem && value === undefined) {
            data = dataUser.get(elem, key);

            if (data !== undefined) {
                return data;
            }

            data = dataAttr(elem, key);

            if (data !== undefined) {
                return data;
            }

            return;
        }

        selector.forEach((node) => {
            dataUser.set(node, key, value);
        });
    },

    $removeData(selector, key) {
        leoDom.$(selector).forEach((node) => {
            dataUser.remove(node, key);
        });
    },

    cloneCopyEvent(src, dest) {
        if (dest.nodeType !== 1) {
            return;
        }

        if (dataPriv.hasData(src)) {
            dataPriv.set(dest, leoDom.extend({}, dataPriv.access(src)));
        }

        if (dataUser.hasData(src)) {
            dataUser.set(dest, leoDom.extend({}, dataUser.access(src)));
        }
    },

    cleanData(elems) {
        let elem, i = 0;

        for (;
            (elem = elems[i]) !== undefined; i++) {
            if (Data.accepts(elem)) {
                if (elem[dataPriv.expando]) {
                    delete elem[dataPriv.expando];
                }
                if (elem[dataUser.expando]) {
                    delete elem[dataUser.expando];
                }
            }
        }
    },

    queue(elem, type, data) {
        let queue;

        if (elem) {
            type = (type || "fx") + "queue";
            queue = dataPriv.get(elem, type);

            if (data) {
                if (!queue || leoDom.isArray(data)) {
                    queue = dataPriv.access(elem, type, leoDom.makeArray(data));
                } else {
                    queue.push(data);
                }
            }

            return queue || [];
        }
    },

    dequeue(elem, type) {
        type = type || "fx";

        let queue = leoDom.queue(elem, type),
            startLength = queue.length,
            fn = queue.shift(),
            next = function() {
                leoDom.dequeue(elem, type);
            };

        if (fn === "inprogress") {
            fn = queue.shift();
            startLength--;
        }

        if (fn) {
            if (type === "fx") {
                queue.unshift("inprogress");
            }

            fn(elem, next);
        }

        if (!startLength) {
            dataPriv.remove(elem, type + "queue");
        }
    },

    $queue(selector, type, data) {
        selector = leoDom.$(selector);

        let setter = 3;

        if (typeof type !== "string") {
            data = type;
            type = "fx";
            setter--;
        }

        if (arguments.length < setter) {
            return leoDom.queue(selector[0], type);
        }

        selector.forEach((elem) => {
            let queue = leoDom.queue(elem, type, data);

            if (type === "fx" && queue[0] !== "inprogress") {
                leoDom.dequeue(elem, type);
            }
        });
    },

    $dequeue: function(selector, type) {
        leoDom.$(selector).forEach((elem) => {
            leoDom.dequeue(elem, type);
        });
    },

    $clearQueue: function(selector, type) {
        leoDom.$queue(selector, type || "fx", []);
    }
});

export {
    leoDom
};
