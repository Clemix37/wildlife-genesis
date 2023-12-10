import Content from "./Content";

class Utils {

    //#region Properties

    itemHasToBeDelete:boolean;
    itemHasReproduced:boolean;
    itemHasBeenKilled:boolean;
    delayBetweenActions:number;

    //#endregion

    //#region Constructor

    constructor(){
        this.itemHasReproduced = false;
        this.itemHasToBeDelete = false;
        this.itemHasBeenKilled = false;
        this.delayBetweenActions = 2000;
    }

    //#endregion

    //#region Public methods

    getRandomIndex(tab:any[]):number{
        return Math.floor(Math.random() * tab.length);
    }

    getDisplayTemplate(content:string, isLine:boolean = true, additionnalClasses:string = ""):string{
        const classes = `${isLine ? "ligne" : "colonne"} ${additionnalClasses}`;
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