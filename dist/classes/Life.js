"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class Life {
    //#endregion
    //#region Constructor
    constructor(name, actions) {
        this.id = (0, uuid_1.v4)();
        this.name = name;
        this.actions = actions;
        this.alive = true;
    }
    //#endregion
    //#region Public methods
    live(thing) { }
}
exports.default = Life;
