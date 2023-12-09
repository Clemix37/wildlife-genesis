import Animal from "./classes/Animal";
import Ecosystem from "./classes/Ecosystem";
import Plant from "./classes/Plant";

const DELAY_BETWEEN_SIMULATIONS = 5000;

const BTNS: {
    ADD: {
        ANIMAL: HTMLButtonElement,
        PLANT: HTMLButtonElement,
    }
} = {
    ADD: {
        ANIMAL: document.getElementById("btnAddAnimal") as HTMLButtonElement,
        PLANT: document.getElementById("btnAddPlant") as HTMLButtonElement,
    },
};
const ecosystem:Ecosystem = new Ecosystem({population: []});

//#region Events

function bindPageEvents(){
    // Add the animal
    BTNS.ADD.ANIMAL.addEventListener("click", () => {
        const a = new Animal({name:"Chien",race:"Labrador"});
        ecosystem.addLives(a);
    });
    // Add the plant
    BTNS.ADD.PLANT.addEventListener("click", () => {
        const p = new Plant({name:"Fleur"});
        ecosystem.addLives(p);
    });
}

//#endregion

bindPageEvents();


// @todo delete
const p1 = new Plant({name:"Fleur"});
const p2 = new Plant({name:"Arbre",eatable:false});
const p3 = new Plant({name:"Trefle"});
const p4 = new Plant({name:"Fleur"});
const a1 = new Animal({name:"Chien",race:"Labrador"});
const a2 = new Animal({name:"Cerf",race:"Jsp"});
const a3 = new Animal({name:"Racoon",race:"Marron"});
const a4 = new Animal({name:"Chat",race:"Ragdoll"});
ecosystem.addLives(p1, p2, p3, p4, a1, a2, a3, a4);

// Every XX seconds we simulate the ecosystem
ecosystem.simulate(); // We launch first simulation
// setInterval(() => {
//     ecosystem.simulate();
// }, DELAY_BETWEEN_SIMULATIONS);