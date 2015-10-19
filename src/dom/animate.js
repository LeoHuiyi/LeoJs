/**
+-------------------------------------------------------------------
* LeoJs--dom--animate.js
+-------------------------------------------------------------------
* @version    1.0.0 beta
* @author     leo
+-------------------------------------------------------------------
*/

import {
    _leoDom, support
}
from "./private.js";
import "./data.js";
import "./event.js";
import {
    leoDom
}
from "./css.js";

_leoDom.setApi(leoDom, {
    animateSpeeds: {
        slow: 600,
        fast: 200,
        _default: 400
    },

    transit: {
        propertyMap: {
            marginLeft: 'margin',
            marginRight: 'margin',
            marginBottom: 'margin',
            marginTop: 'margin',
            paddingLeft: 'padding',
            paddingRight: 'padding',
            paddingBottom: 'padding',
            paddingTop: 'padding'
        },

        enabled: true,

        useTransitionEnd: true
    },

    cssEase: {
        '_default': 'ease',
        'in': 'ease-in',
        'out': 'ease-out',
        'in-out': 'ease-in-out',
        'snap': 'cubic-bezier(0,1,.5,1)',
        'easeInCubic': 'cubic-bezier(.550,.055,.675,.190)',
        'easeOutCubic': 'cubic-bezier(.215,.61,.355,1)',
        'easeInOutCubic': 'cubic-bezier(.645,.045,.355,1)',
        'easeInCirc': 'cubic-bezier(.6,.04,.98,.335)',
        'easeOutCirc': 'cubic-bezier(.075,.82,.165,1)',
        'easeInOutCirc': 'cubic-bezier(.785,.135,.15,.86)',
        'easeInExpo': 'cubic-bezier(.95,.05,.795,.035)',
        'easeOutExpo': 'cubic-bezier(.19,1,.22,1)',
        'easeInOutExpo': 'cubic-bezier(1,0,0,1)',
        'easeInQuad': 'cubic-bezier(.55,.085,.68,.53)',
        'easeOutQuad': 'cubic-bezier(.25,.46,.45,.94)',
        'easeInOutQuad': 'cubic-bezier(.455,.03,.515,.955)',
        'easeInQuart': 'cubic-bezier(.895,.03,.685,.22)',
        'easeOutQuart': 'cubic-bezier(.165,.84,.44,1)',
        'easeInOutQuart': 'cubic-bezier(.77,0,.175,1)',
        'easeInQuint': 'cubic-bezier(.755,.05,.855,.06)',
        'easeOutQuint': 'cubic-bezier(.23,1,.32,1)',
        'easeInOutQuint': 'cubic-bezier(.86,0,.07,1)',
        'easeInSine': 'cubic-bezier(.47,0,.745,.715)',
        'easeOutSine': 'cubic-bezier(.39,.575,.565,1)',
        'easeInOutSine': 'cubic-bezier(.445,.05,.55,.95)',
        'easeInBack': 'cubic-bezier(.6,-.28,.735,.045)',
        'easeOutBack': 'cubic-bezier(.175, .885,.32,1.275)',
        'easeInOutBack': 'cubic-bezier(.68,-.55,.265,1.55)'
    }
});

let div = document.createElement('div');

function getVendorPropertyName(prop) {
    if (prop in div.style) return prop;

    let prefixes = ['Moz', 'Webkit', 'O', 'ms'];
    let prop_ = prop.charAt(0).toUpperCase() + prop.substr(1);

    for (let i = 0; i < prefixes.length; ++i) {
        let vendorProp = prefixes[i] + prop_;
        if (vendorProp in div.style) {
            return vendorProp;
        }
    }
}

function checkTransform3dSupport() {
    div.style[support.transform] = '';
    div.style[support.transform] = 'rotateY(90deg)';
    return div.style[support.transform] !== '';
}

const isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

support.transition = getVendorPropertyName('transition');
support.transitionDelay = getVendorPropertyName('transitionDelay');
support.transform = getVendorPropertyName('transform');
support.transformOrigin = getVendorPropertyName('transformOrigin');
support.filter = getVendorPropertyName('Filter');
support.transform3d = checkTransform3dSupport();

const eventNames = {
    'transition': 'transitionend',
    'MozTransition': 'transitionend',
    'OTransition': 'oTransitionEnd',
    'WebkitTransition': 'webkitTransitionEnd',
    'msTransition': 'MSTransitionEnd'
};

let transitionEnd = support.transitionEnd = eventNames[support.transition] || null;

div = null;

leoDom.cssHooks['transit:transform'] = {
    get(elem) {
        return leoDom.$data(elem, 'transform') || new Transform();
    },

    set(elem, v) {
        let value = v;

        if (!(value instanceof Transform)) {
            value = new Transform(value);
        }

        if (support.transform === 'WebkitTransform' && !isChrome) {
            elem.style[support.transform] = value.toString(true);
        } else {
            elem.style[support.transform] = value.toString();
        }

        leoDom.$data(elem, 'transform', value);
    }
};

leoDom.cssHooks.transform = {
    set: leoDom.cssHooks['transit:transform'].set
};

leoDom.cssHooks.filter = {
    get: function(elem) {
        return elem.style[support.filter];
    },

    set: function(elem, value) {
        elem.style[support.filter] = value;
    }
};

registerCssHook('scale');
registerCssHook('scaleX');
registerCssHook('scaleY');
registerCssHook('translate');
registerCssHook('rotate');
registerCssHook('rotateX');
registerCssHook('rotateY');
registerCssHook('rotate3d');
registerCssHook('perspective');
registerCssHook('skewX');
registerCssHook('skewY');
registerCssHook('x', true);
registerCssHook('y', true);

function registerCssHook(prop, isPixels) {
    if (!isPixels) {
        leoDom.cssNumber[prop] = true;
    }

    leoDom.transit.propertyMap[prop] = support.transform;

    leoDom.cssHooks[prop] = {
        get(elem) {
            return leoDom.$css(elem, 'transit:transform').get(prop);
        },

        set(elem, value) {
            let t = leoDom.$css(elem, 'transit:transform');
            t.setFromString(prop, value);

            leoDom.$css(elem, {
                'transit:transform': t
            });
        }
    };
}

function Transform(str) {
    if (typeof str === 'string') {
        this.parse(str);
    }
    return this;
}

const reparse = /([a-zA-Z0-9]+)\((.*?)\)/g;

leoDom.extend(Transform.prototype, {
    setFromString(prop, val) {
        let args =
            (typeof val === 'string') ? val.split(',') :
            (val.constructor === Array) ? val :
            [val];

        args.unshift(prop);
        Transform.prototype.set.apply(this, args);
    },

    set(prop) {
        let args = Array.prototype.slice.apply(arguments, [1]);

        if (this.setter[prop]) {
            this.setter[prop].apply(this, args);
        } else {
            this[prop] = args.join(',');
        }
    },

    get(prop) {
        if (this.getter[prop]) {
            return this.getter[prop].apply(this);
        } else {
            return this[prop] || 0;
        }
    },

    setter: {
        rotate(theta) {
            this.rotate = unit(theta, 'deg');
        },

        rotateX(theta) {
            this.rotateX = unit(theta, 'deg');
        },

        rotateY(theta) {
            this.rotateY = unit(theta, 'deg');
        },

        scale(x, y) {
            if (y === undefined) {
                y = x;
            }

            this.scale = x + "," + y;
        },

        skewX(x) {
            this.skewX = unit(x, 'deg');
        },

        skewY(y) {
            this.skewY = unit(y, 'deg');
        },

        perspective(dist) {
            this.perspective = unit(dist, 'px');
        },

        x(x) {
            this.set('translate', x, null);
        },

        y(y) {
            this.set('translate', null, y);
        },

        translate(x, y) {
            if (this._translateX === undefined) {
                this._translateX = 0;
            }
            if (this._translateY === undefined) {
                this._translateY = 0;
            }

            if (x !== null && x !== undefined) {
                this._translateX = unit(x, 'px');
            }
            if (y !== null && y !== undefined) {
                this._translateY = unit(y, 'px');
            }

            this.translate = this._translateX + "," + this._translateY;
        }
    },

    getter: {
        x() {
            return this._translateX || 0;
        },

        y() {
            return this._translateY || 0;
        },

        scale() {
            let s = (this.scale || "1,1").split(',');

            if (s[0]) {
                s[0] = parseFloat(s[0]);
            }
            if (s[1]) {
                s[1] = parseFloat(s[1]);
            }

            return (s[0] === s[1]) ? s[0] : s;
        },

        rotate3d() {
            let s = (this.rotate3d || "0,0,0,0deg").split(',');

            for (let i = 0; i <= 3; ++i) {
                if (s[i]) {
                    s[i] = parseFloat(s[i]);
                }
            }
            if (s[3]) {
                s[3] = unit(s[3], 'deg');
            }

            return s;
        }
    },

    parse(str) {
        str.replace(reparse, function(x, prop, val) {
            this.setFromString(prop, val);
        }.bind(this));
    },

    toString(use3d) {
        let re = [];

        for (var i in this) {
            if (this.hasOwnProperty(i)) {
                if ((!support.transform3d) && (
                    (i === 'rotateX') ||
                    (i === 'rotateY') ||
                    (i === 'perspective') ||
                    (i === 'transformOrigin'))) {
                    continue;
                }

                if (i[0] !== '_') {
                    if (use3d && (i === 'scale')) {
                        re.push(i + "3d(" + this[i] + ",1)");
                    } else if (use3d && (i === 'translate')) {
                        re.push(i + "3d(" + this[i] + ",0)");
                    } else {
                        re.push(i + "(" + this[i] + ")");
                    }
                }
            }
        }

        return re.join(" ");
    }
});

function getProperties(props) {
    let re = [];

    leoDom.each(props, function(key) {
        key = leoDom.camelCase(key);
        key = leoDom.transit.propertyMap[key] || leoDom.cssProps[key] || key;
        key = uncamel(key);

        if (support[key])
            key = uncamel(support[key]);

        if (leoDom.inArray(key, re) === -1) {
            re.push(key);
        }
    });

    return re;
}

function getTransition(properties, duration, easing, delay) {
    let props = getProperties(properties);

    if (leoDom.cssEase[easing]) {
        easing = leoDom.cssEase[easing];
    }

    let attribs = '' + toMS(duration) + ' ' + easing;

    if (parseInt(delay, 10) > 0) {
        attribs += ' ' + toMS(delay);
    }

    let transitions = [];

    leoDom.each(props, function(i, name) {
        transitions.push(name + ' ' + attribs);
    });

    return transitions.join(', ');
}

const reuncamel = /([A-Z])/g;

function uncamel(str) {
    return str.replace(reuncamel, function(letter) {
        return '-' + letter.toLowerCase();
    });
}

const reunit = /^[\-0-9\.]+$/;

function unit(i, units) {
    if ((typeof i === "string") && (!i.match(reunit))) {
        return i;
    } else {
        return "" + i + units;
    }
}

const retoMS = /^[\-0-9\.]+/;

function toMS(duration) {
    let i = duration;

    if (typeof i === 'string' && (!i.match(retoMS))) {
        i = leoDom.animateSpeeds[i] || leoDom.animateSpeeds._default;
    }

    return unit(i, 'ms');
}

function callOrQueue(selector, queue, fn) {
    if (queue === true) {
        leoDom.$queue(selector, fn);
    } else if (queue) {
        leoDom.$queue(selector, queue, fn);
    } else {
        selector.forEach((elem) => {
            fn.call(elem);
        });
    }
}

leoDom.$transition = leoDom.$transit = function(selector, properties, duration, easing, callback) {
    selector = leoDom.$(selector);

    let delay = 0;
    let queue = true;

    let theseProperties = leoDom.extend(true, {}, properties);

    if (typeof duration === 'function') {
        callback = duration;
        duration = undefined;
    }

    if (typeof duration === 'object') {
        easing = duration.easing;
        delay = duration.delay || 0;
        queue = typeof duration.queue === "undefined" ? true : duration.queue;
        callback = duration.complete;
        duration = duration.duration;
    }

    if (typeof easing === 'function') {
        callback = easing;
        easing = undefined;
    }

    if (typeof theseProperties.easing !== 'undefined') {
        easing = theseProperties.easing;
        delete theseProperties.easing;
    }

    if (typeof theseProperties.duration !== 'undefined') {
        duration = theseProperties.duration;
        delete theseProperties.duration;
    }

    if (typeof theseProperties.complete !== 'undefined') {
        callback = theseProperties.complete;
        delete theseProperties.complete;
    }

    if (typeof theseProperties.queue !== 'undefined') {
        queue = theseProperties.queue;
        delete theseProperties.queue;
    }

    if (typeof theseProperties.delay !== 'undefined') {
        delay = theseProperties.delay;
        delete theseProperties.delay;
    }

    if (typeof duration === 'undefined') {
        duration = leoDom.animateSpeeds._default;
    }

    if (typeof easing === 'undefined') {
        easing = leoDom.cssEase._default;
    }

    duration = toMS(duration);

    let transitionValue = getTransition(theseProperties, duration, easing, delay);
    let work = leoDom.transit.enabled && support.transition;
    let i = work ? (parseInt(duration, 10) + parseInt(delay, 10)) : 0;

    if (i === 0) {
        let fn = function(elem, next) {
            leoDom.$css(selector, theseProperties);

            if (callback) {
                callback.apply(selector);
            }

            if (next) {
                next();
            }
        };

        callOrQueue(selector, queue, fn);

        return;
    }

    let oldTransitions = {};

    let run = function(nextCall) {
        let bound = false;
        let cb = function() {
            if (bound) {
                leoDom.$off(selector, transitionEnd, cb);
            }

            if (i > 0) {
                selector.forEach((elem) => {
                    elem.style[support.transition] = (oldTransitions[this] || null);
                });
            }

            if (typeof callback === 'function') {
                callback.apply(selector);
            }

            if (typeof nextCall === 'function') {
                nextCall();
            }
        };

        if ((i > 0) && (transitionEnd) && (leoDom.transit.useTransitionEnd)) {
            bound = true;
            leoDom.$on(selector, transitionEnd, cb);
        } else {
            window.setTimeout(cb, i);
        }

        selector.forEach((elem) => {
            if (i > 0) {
                elem.style[support.transition] = transitionValue;
            }

            leoDom.$css(elem, theseProperties);
        });
    };

    let deferredRun = function(elem, next) {
        elem.offsetHeight;
        run(next);
    };

    callOrQueue(selector, queue, deferredRun);
};

leoDom.transit.getTransitionValue = getTransition;

export {
    leoDom
};
