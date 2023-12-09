class Utils {

    //#region Properties

    //#endregion

    //#region Constructor

    constructor(){

    }

    //#endregion

    //#region Public methods

    getRandomIndex(tab:any[]):number{
        return Math.floor(Math.random() * tab.length);
    }

    //#endregion

    //#region Private methods

    //#endregion

}

export default new Utils();