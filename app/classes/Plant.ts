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
		grow: 10,
		reproduce: 3,
		kill: 0.5,
	};

	//#endregion

	//#region Constructor

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

	live(population: Life[]): void {
		const fctName = this.#getRandomAction();
		if (fctName === "grow") this.grow();
		if (fctName === "kill") this.kill();
		if (fctName === "reproduce") this.reproduce();
		this.addDays(1);
	}

	grow(): void {
		Content.display(this.#getDisplayTemplate());
	}

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

	addEaten(nbTimes: number): void {
		this.numberOfTimesEaten += nbTimes;
	}

	//#endregion

	//#region Private methods

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

	#getRandomAction(): string {
		return this.actions[Utils.getRandomIndex(this.actions)];
	}

	//#endregion
}
