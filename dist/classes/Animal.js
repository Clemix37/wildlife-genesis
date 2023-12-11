"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Animal_instances, _Animal_getTmplEating, _Animal_getRandomAction;
Object.defineProperty(exports, "__esModule", { value: true });
const Content_1 = __importDefault(require("./Content"));
const Life_1 = __importDefault(require("./Life"));
const Plant_1 = __importDefault(require("./Plant"));
const Utils_1 = __importDefault(require("./Utils"));
class Animal extends Life_1.default {
    //#endregion
    //#region Constructor
    constructor({ name, race }) {
        const actions = ["eat", "kill", "reproduce"];
        super({ name, actions, icon: "🐶" });
        _Animal_instances.add(this);
        this.race = race;
    }
    //#endregion
    //#region Public methods
    live(population) {
        const fctName = __classPrivateFieldGet(this, _Animal_instances, "m", _Animal_getRandomAction).call(this);
        if (fctName === "eat")
            this.eat(population);
        else if (fctName === "kill")
            this.kill();
        else if (fctName === "reproduce")
            this.reproduce(population);
    }
    eat(population) {
        const plants = population.filter(theLife => theLife instanceof Plant_1.default && theLife.eatable);
        const lifeToEat = plants.length > 0 ? plants[Utils_1.default.getRandomIndex(plants)] : null;
        const display = __classPrivateFieldGet(this, _Animal_instances, "m", _Animal_getTmplEating).call(this, lifeToEat);
        if (!!lifeToEat)
            lifeToEat.alive = false;
        Content_1.default.display(display);
    }
    kill() {
        Utils_1.default.itemHasBeenKilled = true;
        this.alive = false;
        Content_1.default.display(Utils_1.default.getDisplayTemplate(`<span class="bad-event"> - Killed - </span><span>${this.name}</span>`, true, "space-around"));
    }
    reproduce(population) {
        const animals = population.filter(theLife => theLife instanceof Animal && theLife.id !== this.id);
        const animalToReproduceWith = animals.length > 0 ? animals[Utils_1.default.getRandomIndex(animals)] : null;
        if (!animalToReproduceWith)
            return Content_1.default.display(Utils_1.default.getDisplayTemplate(`<span class="bad-event"> - Error - </span><span>No reproduction without other animal (${this.name})</span>`, true, "space-around"));
        Utils_1.default.itemHasReproduced = true;
        Content_1.default.display(Utils_1.default.getDisplayTemplate(`<span class="good-event"> - Reproducing - </span><span>${this.name}</span>`, true, "space-around"));
    }
}
_Animal_instances = new WeakSet(), _Animal_getTmplEating = function _Animal_getTmplEating(lifeToEat) {
    const display = !!lifeToEat ? `
            <span class="good-event"> - Eating - </span>
            <span>${this.name} => ${lifeToEat.name}</span>
        ` : `
            <span class="bad-event"> - Error - </span>
            <span>No plant to eat</span>
        `;
    return Utils_1.default.getDisplayTemplate(display, true, "space-around");
}, _Animal_getRandomAction = function _Animal_getRandomAction() {
    return this.actions[Utils_1.default.getRandomIndex(this.actions)];
};
exports.default = Animal;
