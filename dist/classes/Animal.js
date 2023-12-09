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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Animal_instances, _Animal_functions, _Animal_getDisplayTemplate, _Animal_getTmplEating, _Animal_getRandomAction;
Object.defineProperty(exports, "__esModule", { value: true });
const Content_1 = __importDefault(require("./Content"));
const Life_1 = __importDefault(require("./Life"));
const Utils_1 = __importDefault(require("./Utils"));
class Animal extends Life_1.default {
    //#endregion
    //#region Constructor
    constructor({ name, race }) {
        const actions = ["eat", "kill", "reproduce"];
        super(name, actions);
        _Animal_instances.add(this);
        _Animal_functions.set(this, void 0);
        __classPrivateFieldSet(this, _Animal_functions, {
            "eat": this.eat,
            "kill": this.kill,
            "reproduce": this.reproduce,
        }, "f");
        this.race = race;
    }
    //#endregion
    //#region Public methods
    live(possiblePlantToEat) {
        var _a, _b;
        const fctName = __classPrivateFieldGet(this, _Animal_instances, "m", _Animal_getRandomAction).call(this);
        (_b = (_a = __classPrivateFieldGet(this, _Animal_functions, "f"))[fctName]) === null || _b === void 0 ? void 0 : _b.call(_a, possiblePlantToEat);
    }
    eat(lifeToEat) {
        const display = __classPrivateFieldGet(this, _Animal_instances, "m", _Animal_getTmplEating).call(this, lifeToEat);
        if (!!lifeToEat)
            lifeToEat.alive = false;
        Content_1.default.display(display);
    }
    kill() {
    }
    reproduce() {
    }
}
_Animal_functions = new WeakMap(), _Animal_instances = new WeakSet(), _Animal_getDisplayTemplate = function _Animal_getDisplayTemplate(content) {
    return `
            <div class="ligne">
                ${content}
            </div>
        `;
}, _Animal_getTmplEating = function _Animal_getTmplEating(lifeToEat) {
    const display = !!lifeToEat ? `
            <span class="good-event">✅ - Eating - </span>
            <span>${this.name} => ${lifeToEat.name}</span>
        ` : `
            <span class="bad-event">❌ - Error - </span>
            <span>No plant to eat</span>
        `;
    return __classPrivateFieldGet(this, _Animal_instances, "m", _Animal_getDisplayTemplate).call(this, display);
}, _Animal_getRandomAction = function _Animal_getRandomAction() {
    return this.actions[Utils_1.default.getRandomIndex(this.actions)];
};
exports.default = Animal;
