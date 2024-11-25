import IEcosystem from "../interfaces/IEcosystem";
import IProbability from "../interfaces/IProbability";
import Animal from "./Animal";
import Content from "./Content";
import Life from "./Life";
import Plant from "./Plant";
import Utils from "./Utils";

export default class Ecosystem implements IEcosystem {
	//#region Properties

	population: Life[];
	deads: Life[];
	indexLife: number;
	#isPaused: boolean;
	#interval: NodeJS.Timeout | null;

	//#endregion

	//#region Constructor

	/**
	 * Constructor of the class Ecosystem
	 * @constructor
	 * @param obj
	 * @param obj.population
	 * @param obj.deads
	 */
	constructor({ population, deads }: { population: Life[]; deads: Life[] }) {
		this.population = population;
		this.deads = deads;
		this.indexLife = -1;
		this.#isPaused = true;
		this.#interval = null;
	}

	//#endregion

	//#region Public methods

	/**
	 * Simulate or pause the simulation
	 * Returns the current if it is paused or not
	 * @returns {boolean}
	 */
	playOrPause(): boolean {
		this.#isPaused = !this.#isPaused;
		// If simulation is paused, we clear the interval
		if (this.#isPaused && !!this.#interval) this.#stopSimulation();
		// if not, we simulate
		else if (!this.#isPaused) this.simulate();
		return this.#isPaused;
	}

	/**
	 * Add lives given as parameters to the population or to the deads
	 * @param lives lives to add
	 */
	addLives(...lives: Life[]): void {
		this.population.push(...lives.filter((theLife) => !!theLife.alive));
		this.deads.push(...lives.filter((theLife) => !theLife.alive));
	}

	/**
	 * Sets the interval for the simulation
	 */
	simulate(): void {
		// Only if simulation has been cleared
		if (!!this.#interval) return;
		this.#interval = setInterval(() => {
			const nextLife: Life = this.#getNextLife();
			nextLife.live(this.population);
			this.#checkForActionsAfterSimulation(nextLife);
			this.displayPopulationAndDeads();
			this.#changeProbabilities();
			if (this.population.length === 0 && !!this.#interval)
				this.#stopSimulation();
		}, Utils.delayBetweenActions);
	}

	/**
	 * Display every life dead or alive with the correct template
	 * Attach the kill and respawn events
	 */
	displayPopulationAndDeads(): void {
		let display = "";
		const everyone: Life[] = [...this.population, ...this.deads];
		for (let i = 0; i < everyone.length; i++) {
			const theLife: Life = everyone[i];
			display += Utils.getDisplayTemplate(
				theLife.alive ?
					`<span class="good-event"> - <span data-id="${theLife.id}" class="btn-kill-life">❤️</span> - </span><span>${theLife.icon} - ${theLife.name}</span>`
				:	`<span class="bad-event"> - <span data-id="${theLife.id}" class="btn-respawn-life">💀</span> - </span><span>${theLife.icon} - ${theLife.name}</span>`,
				true,
				"justify-content-space-around",
			);
		}
		Content.displayPopulation(Utils.getDisplayTemplate(display, false));
		// So that we can kill and respawn plants or animals
		this.#attachKillAndRespawnEvents();
	}

	//#endregion

	//#region Private methods

	/**
	 * Attach the kill life buttons and respawn life buttons to the actions
	 */
	#attachKillAndRespawnEvents(): void {
		const btnsKills = document.querySelectorAll(".btn-kill-life");
		const kill = (e: any) => {
			const { id } = e.target.dataset;
			if (!id) return;
			const lifeToKill = this.population.find(
				(theLife) => theLife.id === id,
			);
			if (!lifeToKill) return;
			lifeToKill.kill();
			this.#actionAfterKill(lifeToKill);
			this.displayPopulationAndDeads();
		};
		for (let i = 0; i < btnsKills.length; i++) {
			const btnKill = btnsKills[i];
			if (!btnKill) continue;
			btnKill.removeEventListener("click", kill);
			btnKill.addEventListener("click", kill);
		}
		const btnsRespawn = document.querySelectorAll(".btn-respawn-life");
		const respawn = (e: any) => {
			const { id } = e.target.dataset;
			if (!id) return;
			const oldLife = this.deads.find((theLife) => theLife.id === id);
			if (!oldLife) return;
			oldLife.resuscitate();
			this.addLives(oldLife);
			this.deads = this.deads.filter((theLife) => theLife.id !== id);
			this.displayPopulationAndDeads();
		};
		for (let i = 0; i < btnsRespawn.length; i++) {
			const btnResp = btnsRespawn[i];
			if (!btnResp) continue;
			btnResp.removeEventListener("click", respawn);
			btnResp.addEventListener("click", respawn);
		}
	}

	/**
	 * Stop the simulation by canceling the interval
	 */
	#stopSimulation(): void {
		if (!this.#interval) return;
		clearInterval(this.#interval);
		this.#interval = null;
	}

	#changeProbabilities(): void {
		const plants: Plant[] = this.population.filter(
			(theLife) => theLife instanceof Plant,
		) as Plant[];
		const animals: Animal[] = this.population.filter(
			(theLife) => theLife instanceof Animal,
		) as Animal[];
		// We change the probabilities of animals
		const animalProba: IProbability[] = [
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
			animal.changeProbabilities(
				animalProba.map((proba) => {
					const statToBeKilledByTimeOrAnimals =
						animal.days * Animal.DEFAULTS_PROBA_WEIGHT.kill +
						animals.length * Animal.DEFAULTS_PROBA_WEIGHT.kill;
					// With time (days) and number of animals the stat is increasing
					// But with many plants the stat decrease
					if (proba.value === "kill")
						proba.weight =
							statToBeKilledByTimeOrAnimals -
							plants.length * Animal.DEFAULTS_PROBA_WEIGHT.kill;
					// More plants = more stat to eat
					// Minus stat to be killed
					if (proba.value === "eat")
						proba.weight =
							plants.length * Animal.DEFAULTS_PROBA_WEIGHT.eat -
							statToBeKilledByTimeOrAnimals;
					// More animals = more stat to reproduce
					// Minus stat to be killed
					if (proba.value === "reproduce")
						proba.weight =
							animals.length *
								Animal.DEFAULTS_PROBA_WEIGHT.reproduce -
							statToBeKilledByTimeOrAnimals;
					if (proba.weight < 0) proba.weight = 0;
					return proba;
				}),
			);
		}
		// We change the probabilities of plants
		const plantProba: IProbability[] = [
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
			plant.changeProbabilities(
				plantProba.map((proba) => {
					const statToBeKilledByTime =
						plant.days * Plant.DEFAULTS_PROBA_WEIGHT.kill +
						plant.days * plant.numberOfTimesEaten;
					if (proba.value === "kill")
						proba.weight =
							statToBeKilledByTime -
							animals.length * Plant.DEFAULTS_PROBA_WEIGHT.kill;
					if (proba.value === "grow")
						proba.weight =
							(plant.days + 1) *
								Plant.DEFAULTS_PROBA_WEIGHT.grow -
							statToBeKilledByTime;
					if (proba.value === "reproduce")
						proba.weight =
							(plant.days + 1) *
								Plant.DEFAULTS_PROBA_WEIGHT.reproduce -
							statToBeKilledByTime;
					if (proba.weight < 0) proba.weight = 0;
					return proba;
				}),
			);
		}
	}

	/**
	 * After an action, we must call the right function
	 * @param actualLife
	 */
	#checkForActionsAfterSimulation(actualLife: Life): void {
		if (Utils.itemHasBeenKilled) this.#actionAfterKill(actualLife);
		else if (Utils.itemHasReproduced)
			this.#actionAfterReproduce(actualLife);
		else if (Utils.itemHasEaten) this.#actionAfterEating();
	}

	/**
	 * Gets the next life based on the index and the population
	 * @returns {Life}
	 */
	#getNextLife(): Life {
		this.indexLife =
			this.indexLife >= this.population.length - 1 ?
				0
			:	this.indexLife + 1;
		return this.population[this.indexLife];
	}

	/**
	 * We store the deads and filter the deads from the population
	 */
	#actionAfterEating(): void {
		const idsDeads = [...this.deads.map((dead) => dead.id)];
		this.deads = [
			...this.deads,
			...this.population.filter(
				(theLife) => !theLife.alive && !idsDeads.includes(theLife.id),
			),
		];
		this.population = [
			...this.population.filter((theLife) => !!theLife.alive),
		];
	}

	/**
	 * We add the life killed in the deads
	 * And filter from the population
	 * @param actualLife
	 */
	#actionAfterKill(actualLife: Life): void {
		Utils.itemHasBeenKilled = false;
		const idsOfDeads = [...this.deads.map((dead) => dead.id)];
		// We add the new dead if not already in here
		if (!idsOfDeads.includes(actualLife.id)) this.deads.push(actualLife);
		// We remove the killed one from population
		this.population = this.population.filter(
			(aLife) => aLife.id !== actualLife.id,
		);
	}

	/**
	 * Copy data from the actual life as parameter
	 * And add the new life
	 * @param actualLife
	 */
	#actionAfterReproduce(actualLife: Life): void {
		Utils.itemHasReproduced = false;
		// Create the animal
		if (actualLife instanceof Animal) {
			const newAnimal: Animal = new Animal({
				name: `${actualLife.name} Jr.`,
				race: actualLife.race,
			});
			this.addLives(newAnimal);
		}
		// Create the plant
		else if (actualLife instanceof Plant) {
			const newPlant: Plant = new Plant({
				name: actualLife.name,
				eatable: actualLife.eatable,
			});
			this.addLives(newPlant);
		}
	}

	//#endregion
}
