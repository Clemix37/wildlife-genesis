import IAnimal from "../interfaces/IAnimal";
import IProbability from "../interfaces/IProbability";
import Content from "./Content";
import Life from "./Life";
import Plant from "./Plant";
import Utils from "./Utils";

export default class Animal extends Life implements IAnimal {
	//#region Properties

	race: string;
	daysWithoutFood: number;
	static DEFAULTS_PROBA_WEIGHT = {
		eat: 3,
		reproduce: 2,
		kill: 0.01,
	};

	//#endregion

	//#region Constructor

	constructor({ name, race }: { name: string; race: string }) {
		const actionsProba: IProbability[] = [
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
		this.race = race;
		this.daysWithoutFood = 0;
	}

	//#endregion

	//#region Public methods

	/**
	 * Call a random action
	 * @param population Life[]
	 */
	live(population: Life[]): void {
		const fctName: string = this.#getRandomAction();
		if (fctName === "eat") this.eat(population);
		else if (fctName === "kill") this.kill();
		else if (fctName === "reproduce") this.reproduce(population);
		this.addDays(1);
	}

	eat(population: Life[]): void {
		// We get the plant to eat
		const plants: Plant[] = population.filter(
			(theLife) => theLife instanceof Plant && theLife.eatable,
		) as Plant[];
		const lifeToEat: Plant | null =
			plants.length > 0 ? plants[Utils.getRandomIndex(plants)] : null;
		// We change the nb of days without eating
		if (!lifeToEat) this.daysWithoutFood++;
		else {
			this.daysWithoutFood = 0;
			lifeToEat.addEaten(1);
			if (
				lifeToEat.numberOfTimesEaten >
				Utils.numberOfTimesEatenBeforeDeath
			)
				lifeToEat.alive = false;
		}
		// If it's been too long since eating, we let it die
		if (this.daysWithoutFood >= Utils.daysWithoutFoodBeforeDeath)
			return this.kill();
		// We specify that the actual item has eaten and if it's still alive
		Utils.itemHasEaten = true;
		// We display the action on screen
		Content.display(this.#getTmplEating(lifeToEat));
	}

	/**
	 * Get an animal to reproduce with
	 * Display the reproduction if possible
	 * @param population ILife[]
	 * @returns void
	 */
	reproduce(population: Life[]): void {
		const animals: Animal[] = population.filter(
			(theLife) => theLife instanceof Animal && theLife.id !== this.id,
		) as Animal[];
		const animalToReproduceWith =
			animals.length > 0 ? animals[Utils.getRandomIndex(animals)] : null;
		Content.display(
			Utils.getDisplayTemplate(
				`
					<span class="${!animalToReproduceWith ? "bad" : "good"}-event"> - ${!animalToReproduceWith ? "Error " : ""}Reproducing - </span>
					<span>${!animalToReproduceWith ? `No reproduction without other animal (${this.name})` : this.name}</span>
				`,
				true,
				"justify-content-space-around",
			),
		);
		if (!animalToReproduceWith) return;
		Utils.itemHasReproduced = true;
	}

	//#endregion

	//#region Private methods

	#getTmplEating(lifeToEat: Plant | null): string {
		const display =
			!!lifeToEat ?
				`
            <span class="good-event"> - Eating - </span>
            <span>${this.name} => ${lifeToEat.name}</span>
        `
			:	`
            <span class="bad-event"> - Error - </span>
            <span>No plant to eat</span>
        `;
		return Utils.getDisplayTemplate(
			display,
			true,
			"justify-content-space-around",
		);
	}

	#getRandomAction(): string {
		return this.actions[Utils.getRandomIndex(this.actions)];
	}

	//#endregion
}
