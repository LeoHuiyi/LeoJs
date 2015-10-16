/**
+-------------------------------------------------------------------
* LeoJs--dom--index.js
+-------------------------------------------------------------------
* @version    1.0.0 beta
* @author     leo
+-------------------------------------------------------------------
*/

import "./core.js";
import "./traversing.js";
import "./manipulation.js";
import "./attr.js";
import "./css.js";
import "./data.js";
import "./offset.js";
import "./animate.js";
import {leoDom} from "./event.js";

Object.defineProperty(leoDom, "version", {
    get() {
        return 'leoDom-1.0';
    },
    enumerable: false,
    configurable: false
});

export default leoDom;
