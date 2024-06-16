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
var _Ecosystem_instances, _Ecosystem_isPaused, _Ecosystem_interval, _Ecosystem_cancelInterval, _Ecosystem_changeProbabilities, _Ecosystem_checkForActionsAfterSimulation, _Ecosystem_getNextLife, _Ecosystem_actionAfterEating, _Ecosystem_actionAfterKill, _Ecosystem_actionAfterReproduce;
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
        _Ecosystem_isPaused.set(this, void 0);
        _Ecosystem_interval.set(this, void 0);
        this.population = population;
        this.deads = deads;
        this.indexLife = -1;
        __classPrivateFieldSet(this, _Ecosystem_isPaused, true, "f");
        __classPrivateFieldSet(this, _Ecosystem_interval, null, "f");
    }
    //#endregion
    //#region Public methods
    playOrPause() {
        console.log(`Before: ${__classPrivateFieldGet(this, _Ecosystem_isPaused, "f")}`);
        __classPrivateFieldSet(this, _Ecosystem_isPaused, !__classPrivateFieldGet(this, _Ecosystem_isPaused, "f"), "f");
        console.log(`After: ${__classPrivateFieldGet(this, _Ecosystem_isPaused, "f")}`);
        // If simulation is paused, we clear the interval
        if (__classPrivateFieldGet(this, _Ecosystem_isPaused, "f") && !!__classPrivateFieldGet(this, _Ecosystem_interval, "f"))
            __classPrivateFieldGet(this, _Ecosystem_instances, "m", _Ecosystem_cancelInterval).call(this);
        // if not, we simulate
        else if (!__classPrivateFieldGet(this, _Ecosystem_isPaused, "f"))
            this.simulate();
        return __classPrivateFieldGet(this, _Ecosystem_isPaused, "f");
    }
    addLives(...lives) {
        this.population.push(...lives);
    }
    simulate() {
        // Only if simulation has been cleared
        if (!!__classPrivateFieldGet(this, _Ecosystem_interval, "f"))
            return;
        console.log("simulation");
        this.displayPopulationAndDeads();
        __classPrivateFieldSet(this, _Ecosystem_interval, setInterval(() => {
            const nextLife = __classPrivateFieldGet(this, _Ecosystem_instances, "m", _Ecosystem_getNextLife).call(this);
            nextLife.live(this.population);
            __classPrivateFieldGet(this, _Ecosystem_instances, "m", _Ecosystem_checkForActionsAfterSimulation).call(this, nextLife);
            this.displayPopulationAndDeads();
            __classPrivateFieldGet(this, _Ecosystem_instances, "m", _Ecosystem_changeProbabilities).call(this);
            if (this.population.length === 0 && !!__classPrivateFieldGet(this, _Ecosystem_interval, "f"))
                __classPrivateFieldGet(this, _Ecosystem_instances, "m", _Ecosystem_cancelInterval).call(this);
        }, Utils_1.default.delayBetweenActions), "f");
    }
    displayPopulationAndDeads() {
        let display = "";
        const everyone = [...this.population, ...this.deads];
        for (let i = 0; i < everyone.length; i++) {
            const theLife = everyone[i];
            display += Utils_1.default.getDisplayTemplate(theLife.alive ? `<span class="good-event"> - ❤️ - </span><span>${theLife.icon} - ${theLife.name}</span>`
                : `<span class="bad-event"> - 💀 - </span><span>${theLife.icon} - ${theLife.name}</span>`, true, "justify-content-space-around");
        }
        Content_1.default.displayPopulation(Utils_1.default.getDisplayTemplate(display, false));
    }
}
_Ecosystem_isPaused = new WeakMap(), _Ecosystem_interval = new WeakMap(), _Ecosystem_instances = new WeakSet(), _Ecosystem_cancelInterval = function _Ecosystem_cancelInterval() {
    if (!__classPrivateFieldGet(this, _Ecosystem_interval, "f"))
        return;
    clearInterval(__classPrivateFieldGet(this, _Ecosystem_interval, "f"));
    __classPrivateFieldSet(this, _Ecosystem_interval, null, "f");
}, _Ecosystem_changeProbabilities = function _Ecosystem_changeProbabilities() {
    const plants = this.population.filter(theLife => theLife instanceof Plant_1.default);
    const animals = this.population.filter(theLife => theLife instanceof Animal_1.default);
    // We change the probabilities of animals
    const animalProba = [
        {
            value: "eat",
            weight: (plants.length * 2) - (animals.length - 1),
        },
        {
            value: "reproduce",
            weight: plants.length - (animals.length - 1),
        },
        {
            value: "kill",
            weight: plants.length <= 0 ? animals.length : (animals.length > 0 ? (1 / animals.length) : 0), //(plants.length / 2) - (animals.length -1),
        },
    ];
    console.log(animalProba);
    for (let i = 0; i < animals.length; i++) {
        const animal = animals[i];
        animal.changeProbabilities(animalProba);
    }
    // We change the probabilities of plants
    const plantProba = [
        {
            value: "grow",
            weight: plants.length * 2,
        },
        {
            value: "reproduce",
            weight: plants.length,
        },
        {
            value: "kill",
            weight: plants.length / 2,
        },
    ];
    for (let i = 0; i < plants.length; i++) {
        const plant = plants[i];
        plant.changeProbabilities(plantProba);
    }
}, _Ecosystem_checkForActionsAfterSimulation = function _Ecosystem_checkForActionsAfterSimulation(actualLife) {
    if (Utils_1.default.itemHasBeenKilled)
        __classPrivateFieldGet(this, _Ecosystem_instances, "m", _Ecosystem_actionAfterKill).call(this, actualLife);
    else if (Utils_1.default.itemHasReproduced)
        __classPrivateFieldGet(this, _Ecosystem_instances, "m", _Ecosystem_actionAfterReproduce).call(this, actualLife);
    else if (Utils_1.default.itemHasEaten)
        __classPrivateFieldGet(this, _Ecosystem_instances, "m", _Ecosystem_actionAfterEating).call(this);
}, _Ecosystem_getNextLife = function _Ecosystem_getNextLife() {
    this.indexLife = this.indexLife >= this.population.length - 1 ? 0 : this.indexLife + 1;
    return this.population[this.indexLife];
}, _Ecosystem_actionAfterEating = function _Ecosystem_actionAfterEating() {
    const idsDeads = [...this.deads.map(dead => dead.id)];
    this.deads = [...this.deads, ...this.population.filter(theLife => !theLife.alive && !idsDeads.includes(theLife.id))];
    this.population = [...this.population.filter(theLife => !!theLife.alive)];
}, _Ecosystem_actionAfterKill = function _Ecosystem_actionAfterKill(actualLife) {
    Utils_1.default.itemHasBeenKilled = false;
    const idsOfDeads = [...this.deads.map(dead => dead.id)];
    // We add the new dead if not already in here
    if (!idsOfDeads.includes(actualLife.id))
        this.deads.push(actualLife);
    // We remove the killed one from population
    this.population = this.population.filter(aLife => aLife.id !== actualLife.id);
}, _Ecosystem_actionAfterReproduce = function _Ecosystem_actionAfterReproduce(actualLife) {
    Utils_1.default.itemHasReproduced = false;
    // Create the animal
    if (actualLife instanceof Animal_1.default) {
        const newAnimal = new Animal_1.default({ name: `${actualLife.name} Jr.`, race: actualLife.race });
        this.addLives(newAnimal);
    }
    // Create the plant
    else if (actualLife instanceof Plant_1.default) {
        const newPlant = new Plant_1.default({ name: actualLife.name, eatable: actualLife.eatable });
        this.addLives(newPlant);
    }
};
exports.default = Ecosystem;
