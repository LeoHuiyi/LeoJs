/**
+-------------------------------------------------------------------
* LeoJs--dom--uiPosition.js
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
from "./offset.js";
import {
    document
}
from "./const.js";

const max = Math.max,
    abs = Math.abs,
    round = Math.round,
    rhorizontal = /left|center|right/,
    rvertical = /top|center|bottom/,
    roffset = /[\+\-]\d+(\.[\d]+)?%?/,
    rposition = /^\w+/,
    rpercent = /%$/;

let cachedScrollbarWidth, supportsOffsetFractions;

supportsOffsetFractions = function() {
    let elem = leoDom.$('<div>'),
        support;

    leoDom.$css(elem, "position", "absolute");
    leoDom.$offset(elem, {
        top: 1.5,
        left: 1.5
    });

    document.body.appendChild(elem[0]);
    support = leoDom.$offset(elem).top === 1.5;
    elem[0].parentNode.removeChild(elem[0]);

    supportsOffsetFractions = function() {
        return support;
    };

    return support;
};

function getOffsets(offsets, width, height) {
    return [
        parseFloat(offsets[0]) * (rpercent.test(offsets[0]) ? width / 100 : 1),
        parseFloat(offsets[1]) * (rpercent.test(offsets[1]) ? height / 100 : 1)
    ];
}

function parseCss(element, property) {
    return parseInt(leoDom.css(element, property), 10) || 0;
}

function getDimensions(elem) {
    let raw = elem[0];

    if (raw.nodeType === 9) {
        return {
            width: leoDom.$width(elem),
            height: leoDom.$height(elem),
            offset: {
                top: 0,
                left: 0
            }
        };
    }

    if (leoDom.isWindow(raw)) {
        return {
            width: leoDom.$width(elem),
            height: leoDom.$height(elem),
            offset: {
                top: leoDom.$scrollTop(elem),
                left: leoDom.$scrollLeft(elem)
            }
        };
    }

    if (raw.preventDefault) {
        return {
            width: 0,
            height: 0,
            offset: {
                top: raw.pageY,
                left: raw.pageX
            }
        };
    }

    return {
        width: leoDom.$outerWidth(elem),
        height: leoDom.$outerHeight(elem),
        offset: leoDom.$offset(elem)
    };
}

_leoDom.setApi(leoDom, {
    scrollbarWidth() {
        if (cachedScrollbarWidth !== undefined) {
            return cachedScrollbarWidth;
        }

        let w1, w2,
            div = leoDom.$("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
            innerDiv = leoDom.$children(div)[0];

        leoDom.$append("body", div);
        w1 = innerDiv.offsetWidth;
        leoDom.$css(div, "overflow", "scroll");

        w2 = innerDiv.offsetWidth;

        if (w1 === w2) {
            w2 = div[0].clientWidth;
        }

        leoDom.$remove(div);

        return (cachedScrollbarWidth = w1 - w2);
    },

    getScrollInfo(within) {
        let overflowX = within.isWindow || within.isDocument ? "" :
            leoDom.$css(within.element, "overflow-x"),
            overflowY = within.isWindow || within.isDocument ? "" :
            leoDom.$css(within.element, "overflow-y"),
            hasOverflowX = overflowX === "scroll" ||
            (overflowX === "auto" && within.width < within.element[0].scrollWidth),
            hasOverflowY = overflowY === "scroll" ||
            (overflowY === "auto" && within.height < within.element[0].scrollHeight);

        return {
            width: hasOverflowY ? leoDom.scrollbarWidth() : 0,
            height: hasOverflowX ? leoDom.scrollbarWidth() : 0
        };
    },

    getWithinInfo(element) {
        let withinElement = leoDom.$(element || window),
            isWindow = leoDom.isWindow(withinElement[0]),
            isDocument = !!withinElement[0] && withinElement[0].nodeType === 9,
            hasOffset = !isWindow && !isDocument;

        return {
            element: withinElement,
            isWindow: isWindow,
            isDocument: isDocument,
            offset: hasOffset ? leoDom.$offset(element) : {
                left: 0,
                top: 0
            },
            scrollLeft: leoDom.$scrollLeft(withinElement),
            scrollTop: leoDom.$scrollTop(withinElement),
            width: leoDom.$outerWidth(withinElement),
            height: leoDom.$outerHeight(withinElement)
        };
    },

    positionCollision: {
        fit: {
            left: function(position, data) {
                let within = data.within,
                    withinOffset = within.isWindow ? within.scrollLeft : within.offset.left,
                    outerWidth = within.width,
                    collisionPosLeft = position.left - data.collisionPosition.marginLeft,
                    overLeft = withinOffset - collisionPosLeft,
                    overRight = collisionPosLeft + data.collisionWidth - outerWidth - withinOffset,
                    newOverRight;

                if (data.collisionWidth > outerWidth) {
                    if (overLeft > 0 && overRight <= 0) {
                        newOverRight = position.left + overLeft + data.collisionWidth - outerWidth - withinOffset;
                        position.left += overLeft - newOverRight;
                    } else if (overRight > 0 && overLeft <= 0) {
                        position.left = withinOffset;
                    } else {
                        if (overLeft > overRight) {
                            position.left = withinOffset + outerWidth - data.collisionWidth;
                        } else {
                            position.left = withinOffset;
                        }
                    }

                } else if (overLeft > 0) {
                    position.left += overLeft;
                } else if (overRight > 0) {
                    position.left -= overRight;
                } else {
                    position.left = max(position.left - collisionPosLeft, position.left);
                }
            },
            top: function(position, data) {
                var within = data.within,
                    withinOffset = within.isWindow ? within.scrollTop : within.offset.top,
                    outerHeight = data.within.height,
                    collisionPosTop = position.top - data.collisionPosition.marginTop,
                    overTop = withinOffset - collisionPosTop,
                    overBottom = collisionPosTop + data.collisionHeight - outerHeight - withinOffset,
                    newOverBottom;

                if (data.collisionHeight > outerHeight) {
                    if (overTop > 0 && overBottom <= 0) {
                        newOverBottom = position.top + overTop + data.collisionHeight - outerHeight - withinOffset;
                        position.top += overTop - newOverBottom;
                    } else if (overBottom > 0 && overTop <= 0) {
                        position.top = withinOffset;
                    } else {
                        if (overTop > overBottom) {
                            position.top = withinOffset + outerHeight - data.collisionHeight;
                        } else {
                            position.top = withinOffset;
                        }
                    }
                } else if (overTop > 0) {
                    position.top += overTop;
                } else if (overBottom > 0) {
                    position.top -= overBottom;
                } else {
                    position.top = max(position.top - collisionPosTop, position.top);
                }
            }
        },

        flip: {
            left: function(position, data) {
                let within = data.within,
                    withinOffset = within.offset.left + within.scrollLeft,
                    outerWidth = within.width,
                    offsetLeft = within.isWindow ? within.scrollLeft : within.offset.left,
                    collisionPosLeft = position.left - data.collisionPosition.marginLeft,
                    overLeft = collisionPosLeft - offsetLeft,
                    overRight = collisionPosLeft + data.collisionWidth - outerWidth - offsetLeft,
                    myOffset = data.my[0] === "left" ?
                    -data.elemWidth :
                    data.my[0] === "right" ?
                    data.elemWidth :
                    0,
                    atOffset = data.at[0] === "left" ?
                    data.targetWidth :
                    data.at[0] === "right" ?
                    -data.targetWidth :
                    0,
                    offset = -2 * data.offset[0],
                    newOverRight,
                    newOverLeft;

                if (overLeft < 0) {
                    newOverRight = position.left + myOffset + atOffset + offset + data.collisionWidth - outerWidth - withinOffset;
                    if (newOverRight < 0 || newOverRight < abs(overLeft)) {
                        position.left += myOffset + atOffset + offset;
                    }
                } else if (overRight > 0) {
                    newOverLeft = position.left - data.collisionPosition.marginLeft + myOffset + atOffset + offset - offsetLeft;
                    if (newOverLeft > 0 || abs(newOverLeft) < overRight) {
                        position.left += myOffset + atOffset + offset;
                    }
                }
            },
            top: function(position, data) {
                let within = data.within,
                    withinOffset = within.offset.top + within.scrollTop,
                    outerHeight = within.height,
                    offsetTop = within.isWindow ? within.scrollTop : within.offset.top,
                    collisionPosTop = position.top - data.collisionPosition.marginTop,
                    overTop = collisionPosTop - offsetTop,
                    overBottom = collisionPosTop + data.collisionHeight - outerHeight - offsetTop,
                    top = data.my[1] === "top",
                    myOffset = top ?
                    -data.elemHeight :
                    data.my[1] === "bottom" ?
                    data.elemHeight :
                    0,
                    atOffset = data.at[1] === "top" ?
                    data.targetHeight :
                    data.at[1] === "bottom" ?
                    -data.targetHeight :
                    0,
                    offset = -2 * data.offset[1],
                    newOverTop,
                    newOverBottom;

                if (overTop < 0) {
                    newOverBottom = position.top + myOffset + atOffset + offset + data.collisionHeight - outerHeight - withinOffset;
                    if (newOverBottom < 0 || newOverBottom < abs(overTop)) {
                        position.top += myOffset + atOffset + offset;
                    }
                } else if (overBottom > 0) {
                    newOverTop = position.top - data.collisionPosition.marginTop + myOffset + atOffset + offset - offsetTop;
                    if (newOverTop > 0 || abs(newOverTop) < overBottom) {
                        position.top += myOffset + atOffset + offset;
                    }
                }
            }
        },

        flipfit: {
            left() {
                leoDom.positionCollision.flip.left.apply(this, arguments);
                leoDom.positionCollision.fit.left.apply(this, arguments);
            },
            top() {
                leoDom.positionCollision.flip.top.apply(this, arguments);
                leoDom.positionCollision.fit.top.apply(this, arguments);
            }
        }
    },

    uiPosition(selector, options) {
        if (!options || !options.of) {
            return;
        }

        options = leoDom.extend({}, options);

        let atOffset, targetWidth, targetHeight, targetOffset, basePosition, dimensions,
            target = leoDom.$(options.of),
            within = leoDom.getWithinInfo(options.within),
            scrollInfo = leoDom.getScrollInfo(within),
            collision = (options.collision || "flip").split(" "),
            offsets = {};

        dimensions = getDimensions(target);

        if (target[0].preventDefault) {
            options.at = "left top";
        }

        targetWidth = dimensions.width;
        targetHeight = dimensions.height;
        targetOffset = dimensions.offset;

        basePosition = leoDom.extend({}, targetOffset);

        ;["my", "at"].forEach((name) => {
            let pos = (options[name] || "").split(" "),
                horizontalOffset,
                verticalOffset;

            if (pos.length === 1) {
                pos = rhorizontal.test(pos[0]) ?
                    pos.concat(["center"]) :
                    rvertical.test(pos[0]) ?
                    ["center"].concat(pos) :
                    ["center", "center"];
            }

            pos[0] = rhorizontal.test(pos[0]) ? pos[0] : "center";
            pos[1] = rvertical.test(pos[1]) ? pos[1] : "center";

            horizontalOffset = roffset.exec(pos[0]);
            verticalOffset = roffset.exec(pos[1]);
            offsets[name] = [
                horizontalOffset ? horizontalOffset[0] : 0,
                verticalOffset ? verticalOffset[0] : 0
            ];
            options[name] = [
                rposition.exec(pos[0])[0],
                rposition.exec(pos[1])[0]
            ];
        });

        if (collision.length === 1) {
            collision[1] = collision[0];
        }

        if (options.at[0] === "right") {
            basePosition.left += targetWidth;
        } else if (options.at[0] === "center") {
            basePosition.left += targetWidth / 2;
        }

        if (options.at[1] === "bottom") {
            basePosition.top += targetHeight;
        } else if (options.at[1] === "center") {
            basePosition.top += targetHeight / 2;
        }

        atOffset = getOffsets(offsets.at, targetWidth, targetHeight);
        basePosition.left += atOffset[0];
        basePosition.top += atOffset[1];

        leoDom.$(selector).forEach((elem) => {
            let collisionPosition, using,
                elemWidth = leoDom.$outerWidth(elem),
                elemHeight = leoDom.$outerHeight(elem),
                marginLeft = parseCss(elem, "marginLeft"),
                marginTop = parseCss(elem, "marginTop"),
                collisionWidth = elemWidth + marginLeft + parseCss(elem, "marginRight") + scrollInfo.width,
                collisionHeight = elemHeight + marginTop + parseCss(elem, "marginBottom") + scrollInfo.height,
                position = leoDom.extend({}, basePosition),
                myOffset = getOffsets(offsets.my, leoDom.$outerWidth(elem), leoDom.$outerHeight(elem));

            if (options.my[0] === "right") {
                position.left -= elemWidth;
            } else if (options.my[0] === "center") {
                position.left -= elemWidth / 2;
            }

            if (options.my[1] === "bottom") {
                position.top -= elemHeight;
            } else if (options.my[1] === "center") {
                position.top -= elemHeight / 2;
            }

            position.left += myOffset[0];
            position.top += myOffset[1];

            if (!supportsOffsetFractions()) {
                position.left = round(position.left);
                position.top = round(position.top);
            }

            collisionPosition = {
                marginLeft: marginLeft,
                marginTop: marginTop
            };

            ;["left", "top"].forEach((dir, i) => {
                if (leoDom.positionCollision[collision[i]]) {
                    leoDom.positionCollision[collision[i]][dir](position, {
                        targetWidth: targetWidth,
                        targetHeight: targetHeight,
                        elemWidth: elemWidth,
                        elemHeight: elemHeight,
                        collisionPosition: collisionPosition,
                        collisionWidth: collisionWidth,
                        collisionHeight: collisionHeight,
                        offset: [atOffset[0] + myOffset[0], atOffset[1] + myOffset[1]],
                        my: options.my,
                        at: options.at,
                        within: within,
                        elem: elem
                    });
                }
            });

            if (options.using) {
                using = function(node, props) {
                    let left = targetOffset.left - position.left,
                        right = left + targetWidth - elemWidth,
                        top = targetOffset.top - position.top,
                        bottom = top + targetHeight - elemHeight,
                        feedback = {
                            target: {
                                element: target,
                                left: targetOffset.left,
                                top: targetOffset.top,
                                width: targetWidth,
                                height: targetHeight
                            },
                            element: {
                                element: elem,
                                left: position.left,
                                top: position.top,
                                width: elemWidth,
                                height: elemHeight
                            },
                            horizontal: right < 0 ? "left" : left > 0 ? "right" : "center",
                            vertical: bottom < 0 ? "top" : top > 0 ? "bottom" : "middle"
                        };

                    if (targetWidth < elemWidth && abs(left + right) < targetWidth) {
                        feedback.horizontal = "center";
                    }

                    if (targetHeight < elemHeight && abs(top + bottom) < targetHeight) {
                        feedback.vertical = "middle";
                    }

                    if (max(abs(left), abs(right)) > max(abs(top), abs(bottom))) {
                        feedback.important = "horizontal";
                    } else {
                        feedback.important = "vertical";
                    }

                    options.using(node, props, feedback);
                };
            }

            leoDom.$offset(elem, leoDom.extend(position, {
                using: using
            }));
        });
    }
});

export {
    leoDom
};
