import IPlant from "../interfaces/IPlant";
import IProbability from "../interfaces/IProbability";
import Content from "./Content";
import Life from "./Life";
import Utils from "./Utils";

export default class Plant extends Life implements IPlant {
	//#region Properties

	eatable: boolean;
	numberOfTimesEaten: number;
	static DEFAULTS_PROBA_WEIGHT = {
		grow: 10, // ~ (10 * 100) / 1350 = 74%
		reproduce: 3, // ~ (3 * 100) / 1350 = 22%
		kill: 0.5, // ~ (0.5 * 100) / 1350 = 4%
	};

	//#endregion

	//#region Constructor

	/**
	 * Constructor of the class Plant
	 * @constructor
	 * @param obj
	 * @param obj.name
	 * @param obj.eatable
	 */
	constructor({ name, eatable = true }: { name: string; eatable?: boolean }) {
		const actionsProba: IProbability[] = [
			{
				value: "grow",
				weight: Plant.DEFAULTS_PROBA_WEIGHT.grow,
			},
			{
				value: "reproduce",
				weight: Plant.DEFAULTS_PROBA_WEIGHT.reproduce,
			},
			{
				value: "kill",
				weight: Plant.DEFAULTS_PROBA_WEIGHT.kill,
			},
		];
		super({ name, actionsProba, icon: "🪴" });
		this.numberOfTimesEaten = 0;
		this.eatable = eatable;
	}

	//#endregion

	//#region Public methods

	/**
	 * Choose randomly the action to do for the plant
	 * Add a day of life
	 * @param population
	 */
	live(population: Life[]): void {
		const fctName = this.#getRandomAction();
		if (fctName === "grow") this.grow();
		if (fctName === "kill") this.kill();
		if (fctName === "reproduce") this.reproduce();
		this.addDays(1);
	}

	/**
	 * Displays that the plant grows
	 */
	grow(): void {
		Content.display(this.#getDisplayTemplate());
	}

	/**
	 * Display the reproduction
	 */
	reproduce(): void {
		Utils.itemHasReproduced = true;
		Content.display(
			Utils.getDisplayTemplate(
				`
            <span class="good-event"> - Reproducing ${this.icon} - </span>
            <span>${this.name}</span>
        `,
				true,
				"justify-content-space-around",
			),
		);
	}

	/**
	 * Add number of times eaten
	 * @param nbTimes
	 */
	addEaten(nbTimes: number): void {
		this.numberOfTimesEaten += nbTimes;
	}

	//#endregion

	//#region Private methods

	/**
	 * Returns the template for displaying it
	 * @returns {string}
	 */
	#getDisplayTemplate(): string {
		return Utils.getDisplayTemplate(
			`
            <span class="good-event"> - Growing - </span>
            <span>${this.name}</span>
        `,
			true,
			"justify-content-space-around",
		);
	}

	/**
	 * Returns a random action
	 * @returns {string}
	 */
	#getRandomAction(): string {
		return this.actions[Utils.getRandomIndex(this.actions)];
	}

	//#endregion
}
