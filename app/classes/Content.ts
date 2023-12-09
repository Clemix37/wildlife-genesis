
class Content {
    
    //#region properties

    #id:string;
    #element:HTMLElement;

    //#endregion

    //#region Constructor
    
    constructor(){
        this.#id = "content";
        this.#element = document.getElementById(this.#id) as HTMLElement;
    }

    //#endregion

    //#region Public methods

    display(dom:string){
        this.#element.innerHTML += dom;
    }

    //#endregion

}

export default new Content();