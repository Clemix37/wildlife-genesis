"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Animal_1 = __importDefault(require("./classes/Animal"));
const Ecosystem_1 = __importDefault(require("./classes/Ecosystem"));
const Plant_1 = __importDefault(require("./classes/Plant"));
const DELAY_BETWEEN_SIMULATIONS = 5000;
const BTNS = {
    ADD: {
        ANIMAL: document.getElementById("btnAddAnimal"),
        PLANT: document.getElementById("btnAddPlant"),
    },
};
const ecosystem = new Ecosystem_1.default({ population: [] });
//#region Events
function bindPageEvents() {
    // Add the animal
    BTNS.ADD.ANIMAL.addEventListener("click", () => {
        const a = new Animal_1.default({ name: "Chien", race: "Labrador" });
        ecosystem.addLives(a);
    });
    // Add the plant
    BTNS.ADD.PLANT.addEventListener("click", () => {
        const p = new Plant_1.default({ name: "Fleur" });
        ecosystem.addLives(p);
    });
}
//#endregion
bindPageEvents();
// @todo delete
const p1 = new Plant_1.default({ name: "Fleur" });
const p2 = new Plant_1.default({ name: "Arbre", eatable: false });
const p3 = new Plant_1.default({ name: "Trefle" });
const p4 = new Plant_1.default({ name: "Fleur" });
const a1 = new Animal_1.default({ name: "Chien", race: "Labrador" });
const a2 = new Animal_1.default({ name: "Cerf", race: "Jsp" });
const a3 = new Animal_1.default({ name: "Racoon", race: "Marron" });
const a4 = new Animal_1.default({ name: "Chat", race: "Ragdoll" });
ecosystem.addLives(p1, p2, p3, p4, a1, a2, a3, a4);
// Every XX seconds we simulate the ecosystem
ecosystem.simulate(); // We launch first simulation
// setInterval(() => {
//     ecosystem.simulate();
// }, DELAY_BETWEEN_SIMULATIONS);
