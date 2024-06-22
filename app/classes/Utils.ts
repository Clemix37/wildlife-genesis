import Content from "./Content";

class Utils {
	//#region Properties

	itemHasToBeDelete: boolean;
	itemHasReproduced: boolean;
	itemHasBeenKilled: boolean;
	itemHasEaten: boolean;
	delayBetweenActions: number;
	daysWithoutFoodBeforeDeath: number;
	numberOfTimesEatenBeforeDeath: number;

	//#endregion

	//#region Constructor

	constructor() {
		this.itemHasReproduced = false;
		this.itemHasToBeDelete = false;
		this.itemHasBeenKilled = false;
		this.itemHasEaten = false;
		this.delayBetweenActions = 1000;
		this.daysWithoutFoodBeforeDeath = 30;
		this.numberOfTimesEatenBeforeDeath = 5;
	}

	//#endregion

	//#region Public methods

	/**
	 * Gets a random index for the array given in parameters
	 * @param tab
	 * @returns random index
	 */
	getRandomIndex(tab: any[]): number {
		return Math.floor(Math.random() * tab.length);
	}

	getDisplayTemplate(
		content: string,
		isLine: boolean = true,
		additionnalClasses: string = "",
	): string {
		const classes = `flex width-100${isLine ? "" : " colonne"} ${additionnalClasses}`;
		return `
            <div class="${classes}">
                ${content}
            </div>
        `;
	}

	//#endregion

	//#region Private methods

	//#endregion
}

export default new Utils();
