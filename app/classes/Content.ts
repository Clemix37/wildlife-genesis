
class Content {
    
    //#region properties

    #id: string;
    #idPopulation: string;
    #element: HTMLElement;
    #populationElement: HTMLElement;

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

    /**
     * We display the content given in first so that recent elements appears in first
     * @param newDomContent 
     */
    display(newDomContent: string): void {
        this.#element.innerHTML = newDomContent + this.#element.innerHTML;
    }

    /**
     * Display the content given in the population element
     * @param completeDomContent 
     */
    displayPopulation(completeDomContent: string): void {
        this.#populationElement.innerHTML = completeDomContent;
    }

    //#endregion

}

export default new Content();