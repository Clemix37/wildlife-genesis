"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Utils {
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
    getRandomIndex(tab) {
        return Math.floor(Math.random() * tab.length);
    }
    getDisplayTemplate(content, isLine = true, additionnalClasses = "") {
        const classes = `flex width-100${isLine ? "" : " colonne"} ${additionnalClasses}`;
        return `
            <div class="${classes}">
                ${content}
            </div>
        `;
    }
}
exports.default = new Utils();
