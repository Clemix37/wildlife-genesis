import Content from "./Content";

class Utils {

    //#region Properties

    itemHasToBeDelete: boolean;
    itemHasReproduced: boolean;
    itemHasBeenKilled: boolean;
    itemHasEaten: boolean;
    delayBetweenActions: number;
    daysWithoutFoodBeforeDeath: number;

    //#endregion

    //#region Constructor

    constructor(){
        this.itemHasReproduced = false;
        this.itemHasToBeDelete = false;
        this.itemHasBeenKilled = false;
        this.itemHasEaten = false;
        this.delayBetweenActions = 2000;
        this.daysWithoutFoodBeforeDeath = 5;
    }

    //#endregion

    //#region Public methods

    getRandomIndex(tab: any[]): number {
        return Math.floor(Math.random() * tab.length);
    }

    getDisplayTemplate(content: string, isLine: boolean = true, additionnalClasses: string = ""): string {
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