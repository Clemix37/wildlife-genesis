"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Life_instances, _Life_generateActionsBasedOnProba;
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const Utils_1 = __importDefault(require("./Utils"));
const Content_1 = __importDefault(require("./Content"));
class Life {
    //#endregion
    //#region Constructor
    constructor({ name, actionsProba, icon }) {
        _Life_instances.add(this);
        this.id = (0, uuid_1.v4)();
        this.name = name;
        this.actionsProba = actionsProba;
        this.actions = __classPrivateFieldGet(this, _Life_instances, "m", _Life_generateActionsBasedOnProba).call(this);
        this.alive = true;
        this.icon = icon;
    }
    //#endregion
    //#region Public methods
    live(thing) { }
    changeProbabilities(probas) {
        this.actionsProba = probas;
        this.actions = __classPrivateFieldGet(this, _Life_instances, "m", _Life_generateActionsBasedOnProba).call(this);
    }
    changeUniqueProba(proba) {
        const probaSaved = this.actionsProba.find(prob => prob.value === proba.value);
        if (!probaSaved)
            return;
        probaSaved.weight = proba.weight;
        __classPrivateFieldGet(this, _Life_instances, "m", _Life_generateActionsBasedOnProba).call(this);
    }
    /**
     * We tell the item has been killed and is not alive anymore
     * And display the message
     */
    kill() {
        Utils_1.default.itemHasBeenKilled = true;
        this.alive = false;
        Content_1.default.display(Utils_1.default.getDisplayTemplate(`<span class="bad-event"> - Killed - </span><span>${this.name}</span>`, true, "justify-content-space-around"));
    }
    /**
     * We tell the item has not been killed and is alive
     * And display the message
     */
    resuscitate() {
        Utils_1.default.itemHasBeenKilled = false;
        this.alive = true;
        Content_1.default.display(Utils_1.default.getDisplayTemplate(`<span class="good-event"> - Resuscitated - </span><span>${this.name}</span>`, true, "justify-content-space-around"));
    }
}
_Life_instances = new WeakSet(), _Life_generateActionsBasedOnProba = function _Life_generateActionsBasedOnProba() {
    const actions = [];
    for (let i = 0; i < this.actionsProba.length; i++) {
        const actionProba = this.actionsProba[i];
        const nb = actionProba.weight * 100;
        for (let j = 0; j < nb; j++) {
            actions.push(actionProba.value);
        }
    }
    return actions.sort((a, b) => 0.5 - Math.random());
};
exports.default = Life;
