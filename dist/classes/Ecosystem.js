"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Ecosystem_instances, _Ecosystem_checkForActionsAfterSimulation, _Ecosystem_getNextLife, _Ecosystem_actionAfterKill, _Ecosystem_actionAfterReproduce, _Ecosystem_displayPopulationAndDeads;
Object.defineProperty(exports, "__esModule", { value: true });
const Animal_1 = __importDefault(require("./Animal"));
const Content_1 = __importDefault(require("./Content"));
const Plant_1 = __importDefault(require("./Plant"));
const Utils_1 = __importDefault(require("./Utils"));
class Ecosystem {
    //#endregion
    //#region Constructor
    constructor({ population, deads }) {
        _Ecosystem_instances.add(this);
        this.population = population;
        this.deads = deads;
        this.indexLife = -1;
    }
    //#endregion
    //#region Public methods
    addLives(...lives) {
        this.population.push(...lives);
    }
    simulate() {
        __classPrivateFieldGet(this, _Ecosystem_instances, "m", _Ecosystem_displayPopulationAndDeads).call(this);
        setInterval(() => {
            const nextLife = __classPrivateFieldGet(this, _Ecosystem_instances, "m", _Ecosystem_getNextLife).call(this);
            if (nextLife instanceof Animal_1.default) {
                nextLife.live(this.population);
                this.deads = [...this.deads, ...this.population.filter(theLife => !theLife.alive)];
                this.population = this.population.filter(theLife => theLife.alive);
            }
            else if (nextLife instanceof Plant_1.default)
                nextLife.live();
            __classPrivateFieldGet(this, _Ecosystem_instances, "m", _Ecosystem_checkForActionsAfterSimulation).call(this, nextLife);
            __classPrivateFieldGet(this, _Ecosystem_instances, "m", _Ecosystem_displayPopulationAndDeads).call(this);
        }, Utils_1.default.delayBetweenActions);
    }
}
_Ecosystem_instances = new WeakSet(), _Ecosystem_checkForActionsAfterSimulation = function _Ecosystem_checkForActionsAfterSimulation(actualLife) {
    if (Utils_1.default.itemHasBeenKilled)
        __classPrivateFieldGet(this, _Ecosystem_instances, "m", _Ecosystem_actionAfterKill).call(this, actualLife);
    else if (Utils_1.default.itemHasReproduced)
        __classPrivateFieldGet(this, _Ecosystem_instances, "m", _Ecosystem_actionAfterReproduce).call(this, actualLife);
}, _Ecosystem_getNextLife = function _Ecosystem_getNextLife() {
    this.indexLife = this.indexLife >= this.population.length - 1 ? 0 : this.indexLife + 1;
    return this.population[this.indexLife];
}, _Ecosystem_actionAfterKill = function _Ecosystem_actionAfterKill(actualLife) {
    Utils_1.default.itemHasBeenKilled = false;
    // We add the new dead
    this.deads.push(actualLife);
    // We remove the killed one from population
    this.population = this.population.filter(aLife => aLife.id !== actualLife.id);
}, _Ecosystem_actionAfterReproduce = function _Ecosystem_actionAfterReproduce(actualLife) {
    Utils_1.default.itemHasReproduced = false;
    // Create the animal
    if (actualLife instanceof Animal_1.default) {
        const newAnimal = new Animal_1.default({ name: `${actualLife.name} Jr`, race: actualLife.race });
        this.addLives(newAnimal);
    }
    // Create the plant
    else if (actualLife instanceof Plant_1.default) {
        const newPlant = new Plant_1.default({ name: actualLife.name, eatable: actualLife.eatable });
        this.addLives(newPlant);
    }
}, _Ecosystem_displayPopulationAndDeads = function _Ecosystem_displayPopulationAndDeads() {
    let display = "";
    const everyone = [...this.population, ...this.deads];
    for (let i = 0; i < everyone.length; i++) {
        const theLife = everyone[i];
        display += Utils_1.default.getDisplayTemplate(theLife.alive ? `<span class="good-event">❤️ - ${theLife.icon} - ${theLife.name}</span>`
            : `<span class="bad-event">💀 - ${theLife.icon} - ${theLife.name}</span>`, true, "space-around");
    }
    Content_1.default.displayPopulation(Utils_1.default.getDisplayTemplate(display, false));
};
exports.default = Ecosystem;
