"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Content_id, _Content_element;
Object.defineProperty(exports, "__esModule", { value: true });
class Content {
    //#endregion
    //#region Constructor
    constructor() {
        //#region properties
        _Content_id.set(this, void 0);
        _Content_element.set(this, void 0);
        __classPrivateFieldSet(this, _Content_id, "content", "f");
        __classPrivateFieldSet(this, _Content_element, document.getElementById(__classPrivateFieldGet(this, _Content_id, "f")), "f");
    }
    //#endregion
    //#region Public methods
    display(dom) {
        __classPrivateFieldGet(this, _Content_element, "f").innerHTML += dom;
    }
}
_Content_id = new WeakMap(), _Content_element = new WeakMap();
exports.default = new Content();
