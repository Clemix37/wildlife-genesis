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
                weight: Animal.DEFAULTS_PROBA_WEIGHT.eat,
            },
            {
                value: "reproduce",
                weight: Animal.DEFAULTS_PROBA_WEIGHT.reproduce,
            },
            {
                value: "kill",
                weight: Animal.DEFAULTS_PROBA_WEIGHT.kill,
            },
        ];
        super({ name, actionsProba, icon: "🦄" });
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
        this.addDays(1);
    }
    eat(population) {
        // We get the plant to eat
        const plants = population.filter((theLife) => theLife instanceof Plant_1.default && theLife.eatable);
        const lifeToEat = plants.length > 0 ? plants[Utils_1.default.getRandomIndex(plants)] : null;
        // We change the nb of days without eating
        if (!lifeToEat)
            this.daysWithoutFood++;
        else {
            this.daysWithoutFood = 0;
            lifeToEat.addEaten(1);
            if (lifeToEat.numberOfTimesEaten >
                Utils_1.default.numberOfTimesEatenBeforeDeath)
                lifeToEat.alive = false;
        }
        // If it's been too long since eating, we let it die
        if (this.daysWithoutFood >= Utils_1.default.daysWithoutFoodBeforeDeath)
            return this.kill();
        // We specify that the actual item has eaten and if it's still alive
        Utils_1.default.itemHasEaten = true;
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
        const animals = population.filter((theLife) => theLife instanceof Animal && theLife.id !== this.id);
        const animalToReproduceWith = animals.length > 0 ? animals[Utils_1.default.getRandomIndex(animals)] : null;
        Content_1.default.display(Utils_1.default.getDisplayTemplate(`
					<span class="${!animalToReproduceWith ? "bad" : "good"}-event"> - ${!animalToReproduceWith ? "Error " : ""}Reproducing - </span>
					<span>${!animalToReproduceWith ? `No reproduction without other animal (${this.name})` : this.name}</span>
				`, true, "justify-content-space-around"));
        if (!animalToReproduceWith)
            return;
        Utils_1.default.itemHasReproduced = true;
    }
}
_Animal_instances = new WeakSet(), _Animal_getTmplEating = function _Animal_getTmplEating(lifeToEat) {
    const display = !!lifeToEat ?
        `
            <span class="good-event"> - Eating - </span>
            <span>${this.name} => ${lifeToEat.name}</span>
        `
        : `
            <span class="bad-event"> - Error - </span>
            <span>No plant to eat</span>
        `;
    return Utils_1.default.getDisplayTemplate(display, true, "justify-content-space-around");
}, _Animal_getRandomAction = function _Animal_getRandomAction() {
    return this.actions[Utils_1.default.getRandomIndex(this.actions)];
};
Animal.DEFAULTS_PROBA_WEIGHT = {
    eat: 3,
    reproduce: 2,
    kill: 0.01,
};
exports.default = Animal;
