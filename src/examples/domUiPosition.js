import "../dom/event.js";
import "../dom/attr.js";
import {
    leoDom
}
from "../dom/uiPosition.js";

let positionable = leoDom.$('.positionable');

function position() {
    leoDom.uiPosition(positionable, {
        of: leoDom.$("#parent"),
        my: leoDom.$val("#my_horizontal") + " " + leoDom.$val("#my_vertical"),
        at: leoDom.$val("#at_horizontal") + " " + leoDom.$val("#at_vertical"),
        collision: leoDom.$val("#collision_horizontal") + " " + leoDom.$val("#collision_vertical"),
        within: window
    });
}

const defaultOption = {
    elem: '',
    drag: leoDom.noop,
    eventName: 'leoDrag'
}

class Drag {
    constructor(option = {}) {
        this.option = leoDom.extend({}, defaultOption, option);
        this.elem = leoDom.$(this.option.elem);

        this.init();
    }

    init() {
        let isDrag = false;
        let elem = this.elem;
        let drag = this.option.drag;
        let eventName = this.option.eventName;

        leoDom.$on(elem, "mousedown." + eventName, function(event) {
            event.preventDefault();

            let offset = leoDom.$offset(this);
            let cLeft = event.pageX - offset.left;
            let cTop = event.pageY - offset.top;

            isDrag = true;

            leoDom.$on(document, 'mousemove.' + eventName, function(event) {
                event.preventDefault();

                if (isDrag) {
                    let left = event.pageX - cLeft;
                    let top = event.pageY - cTop;

                    leoDom.$offset(elem, {
                        left: left,
                        top: top
                    });

                    drag();
                }
            });
            leoDom.$on(document, 'mouseup.' + eventName, function(event) {
                event.preventDefault();

                if (isDrag) {
                    leoDom.$off(document, '.' + eventName);

                    isDrag = false;
                }
            });
        });
    }

    destroy(){
        leoDom.$off(this.elem, '.' + this.option.eventName);
    }
}

let darg = new Drag({
    elem: '#parent',
    drag: position
});

// darg.destroy();

leoDom.$css(positionable, "opacity", 0.5);
leoDom.$on("select, input", "click keyup change", position);

position();
