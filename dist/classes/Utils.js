"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Utils {
    //#endregion
    //#region Constructor
    constructor() {
        this.itemHasReproduced = false;
        this.itemHasToBeDelete = false;
        this.itemHasBeenKilled = false;
        this.delayBetweenActions = 2000;
    }
    //#endregion
    //#region Public methods
    getRandomIndex(tab) {
        return Math.floor(Math.random() * tab.length);
    }
    getDisplayTemplate(content, isLine = true, additionnalClasses = "") {
        const classes = `${isLine ? "ligne" : "colonne"} ${additionnalClasses}`;
        return `
            <div class="${classes}">
                ${content}
            </div>
        `;
    }
}
exports.default = new Utils();
