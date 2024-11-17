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
var _Ecosystem_instances, _Ecosystem_isPaused, _Ecosystem_interval, _Ecosystem_attachKillAndRespawnEvents, _Ecosystem_stopSimulation, _Ecosystem_changeProbabilities, _Ecosystem_checkForActionsAfterSimulation, _Ecosystem_getNextLife, _Ecosystem_actionAfterEating, _Ecosystem_actionAfterKill, _Ecosystem_actionAfterReproduce;
Object.defineProperty(exports, "__esModule", { value: true });
const Animal_1 = __importDefault(require("./Animal"));
const Content_1 = __importDefault(require("./Content"));
const Plant_1 = __importDefault(require("./Plant"));
const Utils_1 = __importDefault(require("./Utils"));
class Ecosystem {
    //#endregion
    //#region Constructor
    /**
     * Constructor of the class Ecosystem
     * @constructor
     * @param obj
     * @param obj.population
     * @param obj.deads
     */
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
    /**
     * Simulate or pause the simulation
     * Returns the current if it is paused or not
     * @returns {boolean}
     */
    playOrPause() {
        __classPrivateFieldSet(this, _Ecosystem_isPaused, !__classPrivateFieldGet(this, _Ecosystem_isPaused, "f"), "f");
        // If simulation is paused, we clear the interval
        if (__classPrivateFieldGet(this, _Ecosystem_isPaused, "f") && !!__classPrivateFieldGet(this, _Ecosystem_interval, "f"))
            __classPrivateFieldGet(this, _Ecosystem_instances, "m", _Ecosystem_stopSimulation).call(this);
        // if not, we simulate
        else if (!__classPrivateFieldGet(this, _Ecosystem_isPaused, "f"))
            this.simulate();
        return __classPrivateFieldGet(this, _Ecosystem_isPaused, "f");
    }
    /**
     * Add lives given as parameters to the population or to the deads
     * @param lives lives to add
     */
    addLives(...lives) {
        this.population.push(...lives.filter((theLife) => !!theLife.alive));
        this.deads.push(...lives.filter((theLife) => !theLife.alive));
    }
    /**
     * Sets the interval for the simulation
     */
    simulate() {
        // Only if simulation has been cleared
        if (!!__classPrivateFieldGet(this, _Ecosystem_interval, "f"))
            return;
        __classPrivateFieldSet(this, _Ecosystem_interval, setInterval(() => {
            const nextLife = __classPrivateFieldGet(this, _Ecosystem_instances, "m", _Ecosystem_getNextLife).call(this);
            nextLife.live(this.population);
            __classPrivateFieldGet(this, _Ecosystem_instances, "m", _Ecosystem_checkForActionsAfterSimulation).call(this, nextLife);
            this.displayPopulationAndDeads();
            __classPrivateFieldGet(this, _Ecosystem_instances, "m", _Ecosystem_changeProbabilities).call(this);
            if (this.population.length === 0 && !!__classPrivateFieldGet(this, _Ecosystem_interval, "f"))
                __classPrivateFieldGet(this, _Ecosystem_instances, "m", _Ecosystem_stopSimulation).call(this);
        }, Utils_1.default.delayBetweenActions), "f");
    }
    /**
     * Display every life dead or alive with the correct template
     * Attach the kill and respawn events
     */
    displayPopulationAndDeads() {
        let display = "";
        const everyone = [...this.population, ...this.deads];
        for (let i = 0; i < everyone.length; i++) {
            const theLife = everyone[i];
            display += Utils_1.default.getDisplayTemplate(theLife.alive ?
                `<span class="good-event"> - <span data-id="${theLife.id}" class="btn-kill-life">❤️</span> - </span><span>${theLife.icon} - ${theLife.name}</span>`
                : `<span class="bad-event"> - <span data-id="${theLife.id}" class="btn-respawn-life">💀</span> - </span><span>${theLife.icon} - ${theLife.name}</span>`, true, "justify-content-space-around");
        }
        Content_1.default.displayPopulation(Utils_1.default.getDisplayTemplate(display, false));
        // So that we can kill and respawn plants or animals
        __classPrivateFieldGet(this, _Ecosystem_instances, "m", _Ecosystem_attachKillAndRespawnEvents).call(this);
    }
}
_Ecosystem_isPaused = new WeakMap(), _Ecosystem_interval = new WeakMap(), _Ecosystem_instances = new WeakSet(), _Ecosystem_attachKillAndRespawnEvents = function _Ecosystem_attachKillAndRespawnEvents() {
    const btnsKills = document.querySelectorAll(".btn-kill-life");
    const kill = (e) => {
        const { id } = e.target.dataset;
        if (!id)
            return;
        const lifeToKill = this.population.find((theLife) => theLife.id === id);
        if (!lifeToKill)
            return;
        lifeToKill.kill();
        __classPrivateFieldGet(this, _Ecosystem_instances, "m", _Ecosystem_actionAfterKill).call(this, lifeToKill);
        this.displayPopulationAndDeads();
    };
    for (let i = 0; i < btnsKills.length; i++) {
        const btnKill = btnsKills[i];
        if (!btnKill)
            continue;
        btnKill.removeEventListener("click", kill);
        btnKill.addEventListener("click", kill);
    }
    const btnsRespawn = document.querySelectorAll(".btn-respawn-life");
    const respawn = (e) => {
        const { id } = e.target.dataset;
        if (!id)
            return;
        const oldLife = this.deads.find((theLife) => theLife.id === id);
        if (!oldLife)
            return;
        oldLife.resuscitate();
        this.addLives(oldLife);
        this.deads = this.deads.filter((theLife) => theLife.id !== id);
        this.displayPopulationAndDeads();
    };
    for (let i = 0; i < btnsRespawn.length; i++) {
        const btnResp = btnsRespawn[i];
        if (!btnResp)
            continue;
        btnResp.removeEventListener("click", respawn);
        btnResp.addEventListener("click", respawn);
    }
}, _Ecosystem_stopSimulation = function _Ecosystem_stopSimulation() {
    if (!__classPrivateFieldGet(this, _Ecosystem_interval, "f"))
        return;
    clearInterval(__classPrivateFieldGet(this, _Ecosystem_interval, "f"));
    __classPrivateFieldSet(this, _Ecosystem_interval, null, "f");
}, _Ecosystem_changeProbabilities = function _Ecosystem_changeProbabilities() {
    const plants = this.population.filter((theLife) => theLife instanceof Plant_1.default);
    const animals = this.population.filter((theLife) => theLife instanceof Animal_1.default);
    // We change the probabilities of animals
    const animalProba = [
        {
            value: "eat",
            weight: 0,
        },
        {
            value: "reproduce",
            weight: 0,
        },
        {
            value: "kill",
            weight: 0, // Will be assigned in the loop
        },
    ];
    for (let i = 0; i < animals.length; i++) {
        const animal = animals[i];
        animal.changeProbabilities(animalProba.map((proba) => {
            const statToBeKilledByTimeOrAnimals = animal.days * Animal_1.default.DEFAULTS_PROBA_WEIGHT.kill +
                animals.length * Animal_1.default.DEFAULTS_PROBA_WEIGHT.kill;
            // With time (days) and number of animals the stat is increasing
            // But with many plants the stat decrease
            if (proba.value === "kill")
                proba.weight =
                    statToBeKilledByTimeOrAnimals -
                        plants.length * Animal_1.default.DEFAULTS_PROBA_WEIGHT.kill;
            // More plants = more stat to eat
            // Minus stat to be killed
            if (proba.value === "eat")
                proba.weight =
                    plants.length * Animal_1.default.DEFAULTS_PROBA_WEIGHT.eat -
                        statToBeKilledByTimeOrAnimals;
            // More animals = more stat to reproduce
            // Minus stat to be killed
            if (proba.value === "reproduce")
                proba.weight =
                    animals.length *
                        Animal_1.default.DEFAULTS_PROBA_WEIGHT.reproduce -
                        statToBeKilledByTimeOrAnimals;
            if (proba.weight < 0)
                proba.weight = 0;
            return proba;
        }));
    }
    // We change the probabilities of plants
    const plantProba = [
        {
            value: "grow",
            weight: 0,
        },
        {
            value: "reproduce",
            weight: 0,
        },
        {
            value: "kill",
            weight: 0,
        },
    ];
    for (let i = 0; i < plants.length; i++) {
        const plant = plants[i];
        plant.changeProbabilities(plantProba.map((proba) => {
            const statToBeKilledByTime = plant.days * Plant_1.default.DEFAULTS_PROBA_WEIGHT.kill +
                plant.days * plant.numberOfTimesEaten;
            if (proba.value === "kill")
                proba.weight =
                    statToBeKilledByTime -
                        animals.length * Plant_1.default.DEFAULTS_PROBA_WEIGHT.kill;
            if (proba.value === "grow")
                proba.weight =
                    (plant.days + 1) *
                        Plant_1.default.DEFAULTS_PROBA_WEIGHT.grow -
                        statToBeKilledByTime;
            if (proba.value === "reproduce")
                proba.weight =
                    (plant.days + 1) *
                        Plant_1.default.DEFAULTS_PROBA_WEIGHT.reproduce -
                        statToBeKilledByTime;
            if (proba.weight < 0)
                proba.weight = 0;
            return proba;
        }));
    }
}, _Ecosystem_checkForActionsAfterSimulation = function _Ecosystem_checkForActionsAfterSimulation(actualLife) {
    if (Utils_1.default.itemHasBeenKilled)
        __classPrivateFieldGet(this, _Ecosystem_instances, "m", _Ecosystem_actionAfterKill).call(this, actualLife);
    else if (Utils_1.default.itemHasReproduced)
        __classPrivateFieldGet(this, _Ecosystem_instances, "m", _Ecosystem_actionAfterReproduce).call(this, actualLife);
    else if (Utils_1.default.itemHasEaten)
        __classPrivateFieldGet(this, _Ecosystem_instances, "m", _Ecosystem_actionAfterEating).call(this);
}, _Ecosystem_getNextLife = function _Ecosystem_getNextLife() {
    this.indexLife =
        this.indexLife >= this.population.length - 1 ?
            0
            : this.indexLife + 1;
    return this.population[this.indexLife];
}, _Ecosystem_actionAfterEating = function _Ecosystem_actionAfterEating() {
    const idsDeads = [...this.deads.map((dead) => dead.id)];
    this.deads = [
        ...this.deads,
        ...this.population.filter((theLife) => !theLife.alive && !idsDeads.includes(theLife.id)),
    ];
    this.population = [
        ...this.population.filter((theLife) => !!theLife.alive),
    ];
}, _Ecosystem_actionAfterKill = function _Ecosystem_actionAfterKill(actualLife) {
    Utils_1.default.itemHasBeenKilled = false;
    const idsOfDeads = [...this.deads.map((dead) => dead.id)];
    // We add the new dead if not already in here
    if (!idsOfDeads.includes(actualLife.id))
        this.deads.push(actualLife);
    // We remove the killed one from population
    this.population = this.population.filter((aLife) => aLife.id !== actualLife.id);
}, _Ecosystem_actionAfterReproduce = function _Ecosystem_actionAfterReproduce(actualLife) {
    Utils_1.default.itemHasReproduced = false;
    // Create the animal
    if (actualLife instanceof Animal_1.default) {
        const newAnimal = new Animal_1.default({
            name: `${actualLife.name} Jr.`,
            race: actualLife.race,
        });
        this.addLives(newAnimal);
    }
    // Create the plant
    else if (actualLife instanceof Plant_1.default) {
        const newPlant = new Plant_1.default({
            name: actualLife.name,
            eatable: actualLife.eatable,
        });
        this.addLives(newPlant);
    }
};
exports.default = Ecosystem;
