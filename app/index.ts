import Animal from "./classes/Animal";
import Ecosystem from "./classes/Ecosystem";
import Plant from "./classes/Plant";

const LBL_NAME_ANIMAL: HTMLInputElement = document.getElementById(
	"txtNameAnimal",
) as HTMLInputElement;
const LBL_TYPE_ANIMAL: HTMLInputElement = document.getElementById(
	"txtTypeAnimal",
) as HTMLInputElement;
const LBL_NAME_PLANT: HTMLInputElement = document.getElementById(
	"txtNamePlant",
) as HTMLInputElement;
const CHECK_EATABLE_PLANT: HTMLInputElement = document.getElementById(
	"checkIsEatable",
) as HTMLInputElement;

const BTNS: {
	PLAY_PAUSE: HTMLButtonElement;
	ADD: {
		ANIMAL: HTMLButtonElement;
		PLANT: HTMLButtonElement;
	};
} = {
	PLAY_PAUSE: document.getElementById("btn-play-pause") as HTMLButtonElement,
	ADD: {
		ANIMAL: document.getElementById("btn-add-animal") as HTMLButtonElement,
		PLANT: document.getElementById("btn-add-plant") as HTMLButtonElement,
	},
};
const ecosystem: Ecosystem = new Ecosystem({ population: [], deads: [] });

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
		const race =
			!!LBL_TYPE_ANIMAL.value ? LBL_TYPE_ANIMAL.value : "Labrador";
		const newAnimal = new Animal({ name, race });
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
		const newPlant = new Plant({ name, eatable });
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
const p1 = new Plant({ name: "Flower" });
const p2 = new Plant({ name: "Arbre", eatable: false });
const p3 = new Plant({ name: "Trefle" });
const p4 = new Plant({ name: "Flower" });
const a1 = new Animal({ name: "Dog", race: "Labrador" });
const a2 = new Animal({ name: "Cerf", race: "Jsp" });
const a3 = new Animal({ name: "Racoon", race: "Marron" });
const a4 = new Animal({ name: "Cat", race: "Ragdoll" });
ecosystem.addLives(p1, p2, p3, p4, a1, a2, a3, a4);

ecosystem.displayPopulationAndDeads();
