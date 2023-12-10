"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Plant_instances, _Plant_getDisplayTemplate, _Plant_getRandomAction;
Object.defineProperty(exports, "__esModule", { value: true });
const Content_1 = __importDefault(require("./Content"));
const Life_1 = __importDefault(require("./Life"));
const Utils_1 = __importDefault(require("./Utils"));
class Plant extends Life_1.default {
    //#endregion
    //#region Constructor
    constructor({ name, eatable = true }) {
        const actions = ["grow"];
        super({ name, actions, icon: "🪴" });
        _Plant_instances.add(this);
        this.eatable = eatable;
    }
    //#endregion
    //#region Public methods
    live() {
        const fctName = __classPrivateFieldGet(this, _Plant_instances, "m", _Plant_getRandomAction).call(this);
        if (fctName === "grow")
            this.grow();
    }
    grow() {
        Content_1.default.display(__classPrivateFieldGet(this, _Plant_instances, "m", _Plant_getDisplayTemplate).call(this));
    }
}
_Plant_instances = new WeakSet(), _Plant_getDisplayTemplate = function _Plant_getDisplayTemplate() {
    return Utils_1.default.getDisplayTemplate(`
            <span class="good-event"> - Growing - </span>
            <span>${this.name}</span>
        `, true, "space-around");
}, _Plant_getRandomAction = function _Plant_getRandomAction() {
    return this.actions[Utils_1.default.getRandomIndex(this.actions)];
};
exports.default = Plant;
