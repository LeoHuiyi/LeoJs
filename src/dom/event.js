/**
+-------------------------------------------------------------------
* LeoJs--dom--event.js
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
    document, slice
}
from "./const.js";

let _zid = 1,
    isFunction = leoDom.isFunction,
    isString = function(obj) {
        return typeof obj == 'string';
    },
    handlers = {},
    specialEvents = {},
    focusinSupported = 'onfocusin' in window,
    focus = {
        focus: 'focusin',
        blur: 'focusout'
    },
    hover = {
        mouseenter: 'mouseover',
        mouseleave: 'mouseout'
    };

specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents';

function zid(element) {
    return element._zid || (element._zid = _zid++);
}

function findHandlers(element, event, fn, selector) {
    event = parse(event);

    let matcher;

    if (event.ns) {
        matcher = matcherFor(event.ns);
    }

    return (handlers[zid(element)] || []).filter(function(handler) {
        return handler && (!event.e || handler.e == event.e) && (!event.ns || matcher.test(handler.ns)) && (!fn || zid(handler.fn) === zid(fn)) && (!selector || handler.sel == selector);
    });
}

function parse(event) {
    let parts = ('' + event).split('.');

    return {
        e: parts[0],
        ns: parts.slice(1).sort().join(' ')
    };
}

function matcherFor(ns) {
    return new RegExp('(?:^| )' + ns.replace(' ', ' .* ?') + '(?: |$)');
}

function eventCapture(handler, captureSetting) {
    return handler.del && (!focusinSupported && (handler.e in focus)) || !!captureSetting;
}

function realEvent(type) {
    return hover[type] || (focusinSupported && focus[type]) || type;
}

function add(element, events, fn, data, selector, delegator, capture) {
    let id = zid(element),
        set = (handlers[id] || (handlers[id] = []));

    events.split(/\s/).forEach(function(event) {
        if (event == 'ready') {
            return leoDom.ready(fn);
        }

        let handler = parse(event);

        handler.fn = fn;
        handler.sel = selector;

        if (handler.e in hover) {
            fn = function(e) {
                let related = e.relatedTarget;

                if (!related || (related !== this && !leoDom.contains(this, related))) {
                    return handler.fn.apply(this, arguments);
                }
            };
        }

        handler.del = delegator;

        let callback = delegator || fn;

        handler.proxy = function(e) {
            e = compatible(e);

            if (e.isImmediatePropagationStopped()) {
                return;
            }

            e.data = data;

            let result = callback.apply(element, e._args == undefined ? [e] : [e].concat(e._args));

            if (result === false) {
                e.preventDefault();
                e.stopPropagation();
            }

            return result;
        };

        handler.i = set.length;
        set.push(handler);

        if ('addEventListener' in element) {
            element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture));
        }
    });
}

function remove(element, events, fn, selector, capture) {
    let id = zid(element);

    (events || '').split(/\s/).forEach(function(event) {
        findHandlers(element, event, fn, selector).forEach(function(handler) {
            delete handlers[id][handler.i];

            if ('removeEventListener' in element) {
                element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture));
            }
        });
    });
}

const returnTrue = function() {
        return true;
    },
    returnFalse = function() {
        return false;
    },
    ignoreProperties = /^([A-Z]|returnValue$|layer[XY]$)/,
    eventMethods = {
        preventDefault: 'isDefaultPrevented',
        stopImmediatePropagation: 'isImmediatePropagationStopped',
        stopPropagation: 'isPropagationStopped'
    };

function compatible(event, source) {
    if (source || !event.isDefaultPrevented) {
        source || (source = event);

        for (let name in eventMethods) {
            let sourceMethod = source[name];
            let predicate = eventMethods[name];

            event[name] = function() {
                this[predicate] = returnTrue;

                return sourceMethod && sourceMethod.apply(source, arguments);
            };

            event[predicate] = returnFalse;
        }

        if (source.defaultPrevented !== undefined ? source.defaultPrevented :
            'returnValue' in source ? source.returnValue === false :
            source.getPreventDefault && source.getPreventDefault()) {
            event.isDefaultPrevented = returnTrue;
        }
    }

    return event;
}

function createProxy(event) {
    let key, proxy = {
        originalEvent: event
    };

    for (key in event) {
        if (!ignoreProperties.test(key) && event[key] !== undefined) {
            proxy[key] = event[key];
        }
    }

    return compatible(proxy, event);
}

_leoDom.setApi(leoDom, {
    event: {
        add: add,
        remove: remove
    },

    proxy(fn, context) {
        let args = (2 in arguments) && slice.call(arguments, 2);

        if (isFunction(fn)) {
            let proxyFn = function() {
                return fn.apply(context, args ? args.concat(slice.call(arguments)) : arguments);
            };

            proxyFn._zid = zid(fn);

            return proxyFn;
        } else if (isString(context)) {
            if (args) {
                args.unshift(fn[context], fn);

                return leoDom.proxy.apply(null, args);
            } else {
                return leoDom.proxy(fn[context], fn);
            }
        } else {
            throw new TypeError("expected function");
        }
    },

    $on(elems, event, selector, data, callback, one) {
        let autoRemove, delegator;

        if (event && !isString(event)) {
            for (let type in event) {
                let fn = event[type];

                leoDom.$on(elems, type, selector, data, fn, one);
            }

            return;
        }

        if (!isString(selector) && !isFunction(callback) && callback !== false) {
            callback = data;
            data = selector;
            selector = undefined;
        }

        if (callback === undefined || data === false) {
            callback = data;
            data = undefined;
        }

        if (callback === false) {
            callback = returnFalse;
        }

        leoDom.$(elems).forEach((element) => {
            if (one) {
                autoRemove = function(e) {
                    remove(element, e.type, callback);
                    return callback.apply(this, arguments);
                };
            }

            if (selector) {
                delegator = function(e) {
                    let evt, match = leoDom.$closest(e.target, selector, element)[0];

                    if (match && match !== element) {
                        evt = leoDom.extend(createProxy(e), {
                            currentTarget: match,
                            liveFired: element
                        });

                        return (autoRemove || callback).apply(match, [evt].concat(slice.call(arguments, 1)));
                    }
                };
            }

            add(element, event, callback, data, selector, delegator || autoRemove);
        });
    },

    $one(elems, event, selector, data, callback) {
        return leoDom.$on(elems, event, selector, data, callback, 1);
    },

    $off(elems, event, selector, callback) {
        if (event && !isString(event)) {
            for (let type in event) {
                let fn = event[type];

                leoDom.$off(elems, type, selector, fn);
            }

            return;
        }

        if (!isString(selector) && !isFunction(callback) && callback !== false) {
            callback = selector;
            selector = undefined;
        }

        if (callback === false) {
            callback = returnFalse;
        }

        leoDom.$(elems).forEach((elem) => {
            remove(elem, event, callback, selector);
        });
    },

    $trigger(selector, event, args) {
        event = (isString(event) || leoDom.isPlainObject(event)) ? leoDom.Event(event) : compatible(event);
        event._args = args;

        leoDom.$(selector).forEach((elem) => {
            if (event.type in focus && typeof elem[event.type] == "function") {
                elem[event.type]();
            } else if ('dispatchEvent' in elem) {
                elem.dispatchEvent(event);
            } else {
                leoDom.$triggerHandler(elem, event, args);
            }
        });
    },

    $triggerHandler(selector, event, args) {
        let e, result;

        leoDom.$(selector).forEach((element, i) => {
            e = createProxy(isString(event) ? leoDom.Event(event) : event);
            e._args = args;
            e.target = element;
            findHandlers(element, event.type || event).some(function(handler, i) {
                result = handler.proxy(e);

                if (e.isImmediatePropagationStopped()) {
                    return true;
                }
            });
        });

        return result;
    },

    Event(type, props) {
        if (!isString(type)) {
            props = type;
            type = props.type;
        }

        let event = document.createEvent(specialEvents[type] || 'Events'),
            bubbles = true;

        if (props) {
            for (let name in props) {
                (name == 'bubbles') ? (bubbles = !!props[name]) : (event[name] = props[name]);
            }
        }

        event.initEvent(type, bubbles, true);

        return compatible(event);
    }
});

export {
    leoDom
};
