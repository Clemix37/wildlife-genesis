
class Content {
    
    //#region properties

    #id:string;
    #idPopulation:string;
    #element:HTMLElement;
    #populationElement:HTMLElement;

    //#endregion

    //#region Constructor
    
    constructor(){
        this.#id = "content";
        this.#idPopulation = "population";
        this.#element = document.getElementById(this.#id) as HTMLElement;
        this.#populationElement = document.getElementById(this.#idPopulation) as HTMLElement;
    }

    //#endregion

    //#region Public methods

    display(dom:string):void{
        this.#element.innerHTML += dom;
    }

    displayPopulation(dom:string):void{
        this.#populationElement.innerHTML = dom;
    }

    //#endregion

}

export default new Content();