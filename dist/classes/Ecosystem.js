"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Ecosystem_instances, _Ecosystem_getNextLife;
Object.defineProperty(exports, "__esModule", { value: true });
const Animal_1 = __importDefault(require("./Animal"));
const Plant_1 = __importDefault(require("./Plant"));
const Utils_1 = __importDefault(require("./Utils"));
class Ecosystem {
    //#endregion
    //#region Constructor
    constructor({ population }) {
        _Ecosystem_instances.add(this);
        this.population = population;
        this.indexLife = -1;
    }
    //#endregion
    //#region Public methods
    addLives(...lives) {
        this.population.push(...lives);
    }
    simulate() {
        setInterval(() => {
            const nextLife = __classPrivateFieldGet(this, _Ecosystem_instances, "m", _Ecosystem_getNextLife).call(this);
            if (nextLife instanceof Animal_1.default) {
                // Only the eatable Plant
                const plants = this.population.filter(life => life instanceof Plant_1.default && life.eatable);
                const plantToEat = plants.length > 0 ? plants[Utils_1.default.getRandomIndex(plants)] : null;
                nextLife.live(plantToEat);
                // We remove the Plant from the population if the plant is still alive
                if (!!(plantToEat === null || plantToEat === void 0 ? void 0 : plantToEat.alive))
                    this.population = this.population.filter(lifeElement => lifeElement.id !== plantToEat.id);
            }
            else if (nextLife instanceof Plant_1.default) {
                nextLife.grow();
            }
        }, 2000);
    }
}
_Ecosystem_instances = new WeakSet(), _Ecosystem_getNextLife = function _Ecosystem_getNextLife() {
    this.indexLife = this.indexLife >= this.population.length - 1 ? 0 : this.indexLife + 1;
    return this.population[this.indexLife];
};
exports.default = Ecosystem;
