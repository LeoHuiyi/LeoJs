/**
+-------------------------------------------------------------------
* LeoJs--index.js
+-------------------------------------------------------------------
* @version    1.0.0 beta
* @author     leo
+-------------------------------------------------------------------
*/

import utilApi from "./util/index.js";
import leoDom from "./dom/index.js";
import {_leoDom} from "./dom/private.js";

const leoJs = {},
    leoJsId = leoDom.generateId();

Object.defineProperty(leoJs, "version", {
    get() {
        return 'leoJs-1.0';
    },
    enumerable: false,
    configurable: false
});

Object.defineProperty(leoJs, "id", {
    get() {
        return leoJsId;
    },
    enumerable: false,
    configurable: false
});

_leoDom.setApi(leoJs, {
    dom: leoDom
});

export default leoJs;
