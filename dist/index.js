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
