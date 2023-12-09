"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Utils {
    //#region Properties
    //#endregion
    //#region Constructor
    constructor() {
    }
    //#endregion
    //#region Public methods
    getRandomIndex(tab) {
        return Math.floor(Math.random() * tab.length);
    }
}
exports.default = new Utils();
