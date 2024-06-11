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
var _Content_id, _Content_idPopulation, _Content_element, _Content_populationElement;
Object.defineProperty(exports, "__esModule", { value: true });
class Content {
    //#endregion
    //#region Constructor
    constructor() {
        //#region properties
        _Content_id.set(this, void 0);
        _Content_idPopulation.set(this, void 0);
        _Content_element.set(this, void 0);
        _Content_populationElement.set(this, void 0);
        __classPrivateFieldSet(this, _Content_id, "content", "f");
        __classPrivateFieldSet(this, _Content_idPopulation, "population", "f");
        __classPrivateFieldSet(this, _Content_element, document.getElementById(__classPrivateFieldGet(this, _Content_id, "f")), "f");
        __classPrivateFieldSet(this, _Content_populationElement, document.getElementById(__classPrivateFieldGet(this, _Content_idPopulation, "f")), "f");
    }
    //#endregion
    //#region Public methods
    /**
     * We display the content given in first so that recent elements appears in first
     * @param newDomContent
     */
    display(newDomContent) {
        __classPrivateFieldGet(this, _Content_element, "f").innerHTML = newDomContent + __classPrivateFieldGet(this, _Content_element, "f").innerHTML;
    }
    /**
     * Display the content given in the population element
     * @param completeDomContent
     */
    displayPopulation(completeDomContent) {
        __classPrivateFieldGet(this, _Content_populationElement, "f").innerHTML = completeDomContent;
    }
}
_Content_id = new WeakMap(), _Content_idPopulation = new WeakMap(), _Content_element = new WeakMap(), _Content_populationElement = new WeakMap();
exports.default = new Content();
