(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
        const actionsProba = [
            {
                value: "eat",
                weight: 3,
            },
            {
                value: "reproduce",
                weight: 2,
            },
            {
                value: "kill",
                weight: 1,
            },
        ];
        super({ name, actionsProba, icon: "🐶" });
        _Animal_instances.add(this);
        this.race = race;
        this.daysWithoutFood = 0;
    }
    //#endregion
    //#region Public methods
    /**
     * Call a random action
     * @param population Life[]
     */
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
        // We get the plant to eat
        const plants = population.filter(theLife => theLife instanceof Plant_1.default && theLife.eatable);
        const lifeToEat = plants.length > 0 ? plants[Utils_1.default.getRandomIndex(plants)] : null;
        // We change the nb of days without eating 
        if (!lifeToEat)
            this.daysWithoutFood++;
        else
            this.daysWithoutFood = 0;
        // If it's been too long since eating, we let it die
        if (this.daysWithoutFood >= Utils_1.default.daysWithoutFoodBeforeDeath)
            return this.kill();
        // We specify that the actual item has eaten and if it's still alive
        Utils_1.default.itemHasEaten = true;
        if (!!lifeToEat)
            lifeToEat.alive = false;
        // We display the action on screen
        Content_1.default.display(__classPrivateFieldGet(this, _Animal_instances, "m", _Animal_getTmplEating).call(this, lifeToEat));
    }
    /**
     * Get an animal to reproduce with
     * Display the reproduction if possible
     * @param population ILife[]
     * @returns void
     */
    reproduce(population) {
        const animals = population.filter(theLife => theLife instanceof Animal && theLife.id !== this.id);
        const animalToReproduceWith = animals.length > 0 ? animals[Utils_1.default.getRandomIndex(animals)] : null;
        if (!animalToReproduceWith)
            return Content_1.default.display(Utils_1.default.getDisplayTemplate(`<span class="bad-event"> - Error - </span><span>No reproduction without other animal (${this.name})</span>`, true, "justify-content-space-around"));
        Utils_1.default.itemHasReproduced = true;
        Content_1.default.display(Utils_1.default.getDisplayTemplate(`<span class="good-event"> - Reproducing - </span><span>${this.name}</span>`, true, "justify-content-space-around"));
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
    return Utils_1.default.getDisplayTemplate(display, true, "justify-content-space-around");
}, _Animal_getRandomAction = function _Animal_getRandomAction() {
    return this.actions[Utils_1.default.getRandomIndex(this.actions)];
};
exports.default = Animal;

},{"./Content":2,"./Life":4,"./Plant":5,"./Utils":6}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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
var _Ecosystem_instances, _Ecosystem_isPaused, _Ecosystem_interval, _Ecosystem_attachKillAndRespawnEvents, _Ecosystem_cancelInterval, _Ecosystem_changeProbabilities, _Ecosystem_checkForActionsAfterSimulation, _Ecosystem_getNextLife, _Ecosystem_actionAfterEating, _Ecosystem_actionAfterKill, _Ecosystem_actionAfterReproduce;
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
    /**
     * Simulate or pause the simulation
     * Returns the current if it is paused or not
     * @returns {boolean}
     */
    playOrPause() {
        __classPrivateFieldSet(this, _Ecosystem_isPaused, !__classPrivateFieldGet(this, _Ecosystem_isPaused, "f"), "f");
        // If simulation is paused, we clear the interval
        if (__classPrivateFieldGet(this, _Ecosystem_isPaused, "f") && !!__classPrivateFieldGet(this, _Ecosystem_interval, "f"))
            __classPrivateFieldGet(this, _Ecosystem_instances, "m", _Ecosystem_cancelInterval).call(this);
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
        this.population.push(...lives.filter(theLife => !!theLife.alive));
        this.deads.push(...lives.filter(theLife => !theLife.alive));
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
                __classPrivateFieldGet(this, _Ecosystem_instances, "m", _Ecosystem_cancelInterval).call(this);
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
            display += Utils_1.default.getDisplayTemplate(theLife.alive ? `<span class="good-event"> - <span data-id="${theLife.id}" class="btn-kill-life">❤️</span> - </span><span>${theLife.icon} - ${theLife.name}</span>`
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
        const lifeToKill = this.population.find(theLife => theLife.id === id);
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
        const oldLife = this.deads.find(theLife => theLife.id === id);
        if (!oldLife)
            return;
        oldLife.resuscitate();
        this.addLives(oldLife);
        this.deads = this.deads.filter(theLife => theLife.id !== id);
        this.displayPopulationAndDeads();
    };
    for (let i = 0; i < btnsRespawn.length; i++) {
        const btnResp = btnsRespawn[i];
        if (!btnResp)
            continue;
        btnResp.removeEventListener("click", respawn);
        btnResp.addEventListener("click", respawn);
    }
}, _Ecosystem_cancelInterval = function _Ecosystem_cancelInterval() {
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

},{"./Animal":1,"./Content":2,"./Plant":5,"./Utils":6}],4:[function(require,module,exports){
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

},{"./Content":2,"./Utils":6,"uuid":8}],5:[function(require,module,exports){
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
        const actionsProba = [
            {
                value: "grow",
                weight: 10,
            },
            {
                value: "reproduce",
                weight: 3,
            },
            {
                value: "kill",
                weight: 1,
            }
        ];
        super({ name, actionsProba, icon: "🪴" });
        _Plant_instances.add(this);
        this.eatable = eatable;
    }
    //#endregion
    //#region Public methods
    live(population) {
        const fctName = __classPrivateFieldGet(this, _Plant_instances, "m", _Plant_getRandomAction).call(this);
        if (fctName === "grow")
            this.grow();
        if (fctName === "kill")
            this.kill();
        if (fctName === "reproduce")
            this.reproduce();
    }
    grow() {
        Content_1.default.display(__classPrivateFieldGet(this, _Plant_instances, "m", _Plant_getDisplayTemplate).call(this));
    }
    reproduce() {
        Utils_1.default.itemHasReproduced = true;
        Content_1.default.display(Utils_1.default.getDisplayTemplate(`
            <span class="good-event"> - Reproducing ${this.icon} - </span>
            <span>${this.name}</span>
        `, true, "justify-content-space-around"));
    }
}
_Plant_instances = new WeakSet(), _Plant_getDisplayTemplate = function _Plant_getDisplayTemplate() {
    return Utils_1.default.getDisplayTemplate(`
            <span class="good-event"> - Growing - </span>
            <span>${this.name}</span>
        `, true, "justify-content-space-around");
}, _Plant_getRandomAction = function _Plant_getRandomAction() {
    return this.actions[Utils_1.default.getRandomIndex(this.actions)];
};
exports.default = Plant;

},{"./Content":2,"./Life":4,"./Utils":6}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Utils {
    //#endregion
    //#region Constructor
    constructor() {
        this.itemHasReproduced = false;
        this.itemHasToBeDelete = false;
        this.itemHasBeenKilled = false;
        this.itemHasEaten = false;
        this.delayBetweenActions = 2000;
        this.daysWithoutFoodBeforeDeath = 5;
    }
    //#endregion
    //#region Public methods
    getRandomIndex(tab) {
        return Math.floor(Math.random() * tab.length);
    }
    getDisplayTemplate(content, isLine = true, additionnalClasses = "") {
        const classes = `flex width-100${isLine ? "" : " colonne"} ${additionnalClasses}`;
        return `
            <div class="${classes}">
                ${content}
            </div>
        `;
    }
}
exports.default = new Utils();

},{}],7:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Animal_1 = __importDefault(require("./classes/Animal"));
const Ecosystem_1 = __importDefault(require("./classes/Ecosystem"));
const Plant_1 = __importDefault(require("./classes/Plant"));
const LBL_NAME_ANIMAL = document.getElementById("txtNameAnimal");
const LBL_TYPE_ANIMAL = document.getElementById("txtTypeAnimal");
const LBL_NAME_PLANT = document.getElementById("txtNamePlant");
const CHECK_EATABLE_PLANT = document.getElementById("checkIsEatable");
const BTNS = {
    PLAY_PAUSE: document.getElementById("btn-play-pause"),
    ADD: {
        ANIMAL: document.getElementById("btn-add-animal"),
        PLANT: document.getElementById("btn-add-plant"),
    },
};
const ecosystem = new Ecosystem_1.default({ population: [], deads: [] });
//#region Events
function bindPageEvents() {
    // Play or pause the simulation
    BTNS.PLAY_PAUSE.addEventListener("click", () => {
        const isPaused = ecosystem.playOrPause();
        BTNS.PLAY_PAUSE.innerText = isPaused ? `Play` : "Pause";
    });
    // Add the animal
    BTNS.ADD.ANIMAL.addEventListener("click", () => {
        const name = !!LBL_NAME_ANIMAL.value ? LBL_NAME_ANIMAL.value : "Dog";
        const race = !!LBL_TYPE_ANIMAL.value ? LBL_TYPE_ANIMAL.value : "Labrador";
        const newAnimal = new Animal_1.default({ name, race });
        ecosystem.addLives(newAnimal);
        LBL_NAME_ANIMAL.value = "";
        LBL_TYPE_ANIMAL.value = "";
        ecosystem.displayPopulationAndDeads();
        ecosystem.simulate(); // We simulate only if simulation has ended
    });
    // Add the plant
    BTNS.ADD.PLANT.addEventListener("click", () => {
        const name = !!LBL_NAME_PLANT.value ? LBL_NAME_PLANT.value : "Flower";
        const eatable = CHECK_EATABLE_PLANT.checked;
        console.log(LBL_NAME_PLANT.value, name, eatable);
        const newPlant = new Plant_1.default({ name, eatable });
        ecosystem.addLives(newPlant);
        LBL_NAME_PLANT.value = "";
        CHECK_EATABLE_PLANT.checked = false;
        ecosystem.displayPopulationAndDeads();
        ecosystem.simulate(); // We simulate only if simulation has ended
    });
}
//#endregion
bindPageEvents();
// @todo delete
const p1 = new Plant_1.default({ name: "Flower" });
const p2 = new Plant_1.default({ name: "Arbre", eatable: false });
const p3 = new Plant_1.default({ name: "Trefle" });
const p4 = new Plant_1.default({ name: "Flower" });
const a1 = new Animal_1.default({ name: "Dog", race: "Labrador" });
const a2 = new Animal_1.default({ name: "Cerf", race: "Jsp" });
const a3 = new Animal_1.default({ name: "Racoon", race: "Marron" });
const a4 = new Animal_1.default({ name: "Cat", race: "Ragdoll" });
ecosystem.addLives(p1, p2, p3, p4, a1, a2, a3, a4);
ecosystem.displayPopulationAndDeads();

},{"./classes/Animal":1,"./classes/Ecosystem":3,"./classes/Plant":5}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "NIL", {
  enumerable: true,
  get: function () {
    return _nil.default;
  }
});
Object.defineProperty(exports, "parse", {
  enumerable: true,
  get: function () {
    return _parse.default;
  }
});
Object.defineProperty(exports, "stringify", {
  enumerable: true,
  get: function () {
    return _stringify.default;
  }
});
Object.defineProperty(exports, "v1", {
  enumerable: true,
  get: function () {
    return _v.default;
  }
});
Object.defineProperty(exports, "v3", {
  enumerable: true,
  get: function () {
    return _v2.default;
  }
});
Object.defineProperty(exports, "v4", {
  enumerable: true,
  get: function () {
    return _v3.default;
  }
});
Object.defineProperty(exports, "v5", {
  enumerable: true,
  get: function () {
    return _v4.default;
  }
});
Object.defineProperty(exports, "validate", {
  enumerable: true,
  get: function () {
    return _validate.default;
  }
});
Object.defineProperty(exports, "version", {
  enumerable: true,
  get: function () {
    return _version.default;
  }
});

var _v = _interopRequireDefault(require("./v1.js"));

var _v2 = _interopRequireDefault(require("./v3.js"));

var _v3 = _interopRequireDefault(require("./v4.js"));

var _v4 = _interopRequireDefault(require("./v5.js"));

var _nil = _interopRequireDefault(require("./nil.js"));

var _version = _interopRequireDefault(require("./version.js"));

var _validate = _interopRequireDefault(require("./validate.js"));

var _stringify = _interopRequireDefault(require("./stringify.js"));

var _parse = _interopRequireDefault(require("./parse.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./nil.js":11,"./parse.js":12,"./stringify.js":16,"./v1.js":17,"./v3.js":18,"./v4.js":20,"./v5.js":21,"./validate.js":22,"./version.js":23}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/*
 * Browser-compatible JavaScript MD5
 *
 * Modification of JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */
function md5(bytes) {
  if (typeof bytes === 'string') {
    const msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = new Uint8Array(msg.length);

    for (let i = 0; i < msg.length; ++i) {
      bytes[i] = msg.charCodeAt(i);
    }
  }

  return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
}
/*
 * Convert an array of little-endian words to an array of bytes
 */


function md5ToHexEncodedArray(input) {
  const output = [];
  const length32 = input.length * 32;
  const hexTab = '0123456789abcdef';

  for (let i = 0; i < length32; i += 8) {
    const x = input[i >> 5] >>> i % 32 & 0xff;
    const hex = parseInt(hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f), 16);
    output.push(hex);
  }

  return output;
}
/**
 * Calculate output length with padding and bit length
 */


function getOutputLength(inputLength8) {
  return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
}
/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */


function wordsToMd5(x, len) {
  /* append padding */
  x[len >> 5] |= 0x80 << len % 32;
  x[getOutputLength(len) - 1] = len;
  let a = 1732584193;
  let b = -271733879;
  let c = -1732584194;
  let d = 271733878;

  for (let i = 0; i < x.length; i += 16) {
    const olda = a;
    const oldb = b;
    const oldc = c;
    const oldd = d;
    a = md5ff(a, b, c, d, x[i], 7, -680876936);
    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5gg(b, c, d, a, x[i], 20, -373897302);
    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5hh(d, a, b, c, x[i], 11, -358537222);
    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = md5ii(a, b, c, d, x[i], 6, -198630844);
    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = safeAdd(a, olda);
    b = safeAdd(b, oldb);
    c = safeAdd(c, oldc);
    d = safeAdd(d, oldd);
  }

  return [a, b, c, d];
}
/*
 * Convert an array bytes to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */


function bytesToWords(input) {
  if (input.length === 0) {
    return [];
  }

  const length8 = input.length * 8;
  const output = new Uint32Array(getOutputLength(length8));

  for (let i = 0; i < length8; i += 8) {
    output[i >> 5] |= (input[i / 8] & 0xff) << i % 32;
  }

  return output;
}
/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */


function safeAdd(x, y) {
  const lsw = (x & 0xffff) + (y & 0xffff);
  const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 0xffff;
}
/*
 * Bitwise rotate a 32-bit number to the left.
 */


function bitRotateLeft(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}
/*
 * These functions implement the four basic operations the algorithm uses.
 */


function md5cmn(q, a, b, x, s, t) {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}

function md5ff(a, b, c, d, x, s, t) {
  return md5cmn(b & c | ~b & d, a, b, x, s, t);
}

function md5gg(a, b, c, d, x, s, t) {
  return md5cmn(b & d | c & ~d, a, b, x, s, t);
}

function md5hh(a, b, c, d, x, s, t) {
  return md5cmn(b ^ c ^ d, a, b, x, s, t);
}

function md5ii(a, b, c, d, x, s, t) {
  return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}

var _default = md5;
exports.default = _default;
},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
var _default = {
  randomUUID
};
exports.default = _default;
},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = '00000000-0000-0000-0000-000000000000';
exports.default = _default;
},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _validate = _interopRequireDefault(require("./validate.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parse(uuid) {
  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Invalid UUID');
  }

  let v;
  const arr = new Uint8Array(16); // Parse ########-....-....-....-............

  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 0xff;
  arr[2] = v >>> 8 & 0xff;
  arr[3] = v & 0xff; // Parse ........-####-....-....-............

  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 0xff; // Parse ........-....-####-....-............

  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 0xff; // Parse ........-....-....-####-............

  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 0xff; // Parse ........-....-....-....-############
  // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)

  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;
  arr[11] = v / 0x100000000 & 0xff;
  arr[12] = v >>> 24 & 0xff;
  arr[13] = v >>> 16 & 0xff;
  arr[14] = v >>> 8 & 0xff;
  arr[15] = v & 0xff;
  return arr;
}

var _default = parse;
exports.default = _default;
},{"./validate.js":22}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
exports.default = _default;
},{}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rng;
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
let getRandomValues;
const rnds8 = new Uint8Array(16);

function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}
},{}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// Adapted from Chris Veness' SHA1 code at
// http://www.movable-type.co.uk/scripts/sha1.html
function f(s, x, y, z) {
  switch (s) {
    case 0:
      return x & y ^ ~x & z;

    case 1:
      return x ^ y ^ z;

    case 2:
      return x & y ^ x & z ^ y & z;

    case 3:
      return x ^ y ^ z;
  }
}

function ROTL(x, n) {
  return x << n | x >>> 32 - n;
}

function sha1(bytes) {
  const K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
  const H = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];

  if (typeof bytes === 'string') {
    const msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = [];

    for (let i = 0; i < msg.length; ++i) {
      bytes.push(msg.charCodeAt(i));
    }
  } else if (!Array.isArray(bytes)) {
    // Convert Array-like to Array
    bytes = Array.prototype.slice.call(bytes);
  }

  bytes.push(0x80);
  const l = bytes.length / 4 + 2;
  const N = Math.ceil(l / 16);
  const M = new Array(N);

  for (let i = 0; i < N; ++i) {
    const arr = new Uint32Array(16);

    for (let j = 0; j < 16; ++j) {
      arr[j] = bytes[i * 64 + j * 4] << 24 | bytes[i * 64 + j * 4 + 1] << 16 | bytes[i * 64 + j * 4 + 2] << 8 | bytes[i * 64 + j * 4 + 3];
    }

    M[i] = arr;
  }

  M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
  M[N - 1][14] = Math.floor(M[N - 1][14]);
  M[N - 1][15] = (bytes.length - 1) * 8 & 0xffffffff;

  for (let i = 0; i < N; ++i) {
    const W = new Uint32Array(80);

    for (let t = 0; t < 16; ++t) {
      W[t] = M[i][t];
    }

    for (let t = 16; t < 80; ++t) {
      W[t] = ROTL(W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16], 1);
    }

    let a = H[0];
    let b = H[1];
    let c = H[2];
    let d = H[3];
    let e = H[4];

    for (let t = 0; t < 80; ++t) {
      const s = Math.floor(t / 20);
      const T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[t] >>> 0;
      e = d;
      d = c;
      c = ROTL(b, 30) >>> 0;
      b = a;
      a = T;
    }

    H[0] = H[0] + a >>> 0;
    H[1] = H[1] + b >>> 0;
    H[2] = H[2] + c >>> 0;
    H[3] = H[3] + d >>> 0;
    H[4] = H[4] + e >>> 0;
  }

  return [H[0] >> 24 & 0xff, H[0] >> 16 & 0xff, H[0] >> 8 & 0xff, H[0] & 0xff, H[1] >> 24 & 0xff, H[1] >> 16 & 0xff, H[1] >> 8 & 0xff, H[1] & 0xff, H[2] >> 24 & 0xff, H[2] >> 16 & 0xff, H[2] >> 8 & 0xff, H[2] & 0xff, H[3] >> 24 & 0xff, H[3] >> 16 & 0xff, H[3] >> 8 & 0xff, H[3] & 0xff, H[4] >> 24 & 0xff, H[4] >> 16 & 0xff, H[4] >> 8 & 0xff, H[4] & 0xff];
}

var _default = sha1;
exports.default = _default;
},{}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.unsafeStringify = unsafeStringify;

var _validate = _interopRequireDefault(require("./validate.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}

function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
}

function stringify(arr, offset = 0) {
  const uuid = unsafeStringify(arr, offset); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

var _default = stringify;
exports.default = _default;
},{"./validate.js":22}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rng = _interopRequireDefault(require("./rng.js"));

var _stringify = require("./stringify.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html
let _nodeId;

let _clockseq; // Previous uuid creation time


let _lastMSecs = 0;
let _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details

function v1(options, buf, offset) {
  let i = buf && offset || 0;
  const b = buf || new Array(16);
  options = options || {};
  let node = options.node || _nodeId;
  let clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189

  if (node == null || clockseq == null) {
    const seedBytes = options.random || (options.rng || _rng.default)();

    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }

    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.


  let msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock

  let nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)

  const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression

  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval


  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  } // Per 4.2.1.2 Throw error if too many uuids are requested


  if (nsecs >= 10000) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch

  msecs += 12219292800000; // `time_low`

  const tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff; // `time_mid`

  const tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff; // `time_high_and_version`

  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version

  b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)

  b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`

  b[i++] = clockseq & 0xff; // `node`

  for (let n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf || (0, _stringify.unsafeStringify)(b);
}

var _default = v1;
exports.default = _default;
},{"./rng.js":14,"./stringify.js":16}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _v = _interopRequireDefault(require("./v35.js"));

var _md = _interopRequireDefault(require("./md5.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const v3 = (0, _v.default)('v3', 0x30, _md.default);
var _default = v3;
exports.default = _default;
},{"./md5.js":9,"./v35.js":19}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.URL = exports.DNS = void 0;
exports.default = v35;

var _stringify = require("./stringify.js");

var _parse = _interopRequireDefault(require("./parse.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function stringToBytes(str) {
  str = unescape(encodeURIComponent(str)); // UTF8 escape

  const bytes = [];

  for (let i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }

  return bytes;
}

const DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
exports.DNS = DNS;
const URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
exports.URL = URL;

function v35(name, version, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    var _namespace;

    if (typeof value === 'string') {
      value = stringToBytes(value);
    }

    if (typeof namespace === 'string') {
      namespace = (0, _parse.default)(namespace);
    }

    if (((_namespace = namespace) === null || _namespace === void 0 ? void 0 : _namespace.length) !== 16) {
      throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
    } // Compute hash of namespace and value, Per 4.3
    // Future: Use spread syntax when supported on all platforms, e.g. `bytes =
    // hashfunc([...namespace, ... value])`


    let bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = bytes[6] & 0x0f | version;
    bytes[8] = bytes[8] & 0x3f | 0x80;

    if (buf) {
      offset = offset || 0;

      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }

      return buf;
    }

    return (0, _stringify.unsafeStringify)(bytes);
  } // Function#name is not settable on some platforms (#270)


  try {
    generateUUID.name = name; // eslint-disable-next-line no-empty
  } catch (err) {} // For CommonJS default export support


  generateUUID.DNS = DNS;
  generateUUID.URL = URL;
  return generateUUID;
}
},{"./parse.js":12,"./stringify.js":16}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _native = _interopRequireDefault(require("./native.js"));

var _rng = _interopRequireDefault(require("./rng.js"));

var _stringify = require("./stringify.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function v4(options, buf, offset) {
  if (_native.default.randomUUID && !buf && !options) {
    return _native.default.randomUUID();
  }

  options = options || {};

  const rnds = options.random || (options.rng || _rng.default)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`


  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0, _stringify.unsafeStringify)(rnds);
}

var _default = v4;
exports.default = _default;
},{"./native.js":10,"./rng.js":14,"./stringify.js":16}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _v = _interopRequireDefault(require("./v35.js"));

var _sha = _interopRequireDefault(require("./sha1.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const v5 = (0, _v.default)('v5', 0x50, _sha.default);
var _default = v5;
exports.default = _default;
},{"./sha1.js":15,"./v35.js":19}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regex = _interopRequireDefault(require("./regex.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validate(uuid) {
  return typeof uuid === 'string' && _regex.default.test(uuid);
}

var _default = validate;
exports.default = _default;
},{"./regex.js":13}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _validate = _interopRequireDefault(require("./validate.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function version(uuid) {
  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Invalid UUID');
  }

  return parseInt(uuid.slice(14, 15), 16);
}

var _default = version;
exports.default = _default;
},{"./validate.js":22}]},{},[7]);
