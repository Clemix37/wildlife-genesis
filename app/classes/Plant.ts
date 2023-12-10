import IPlant from "../interfaces/IPlant";
import Content from "./Content";
import Life from "./Life";
import Utils from "./Utils";

export default class Plant extends Life implements IPlant {
    
    //#region Properties

    eatable:boolean;

    //#endregion

    //#region Constructor

    constructor({name,eatable=true}:{name:string,eatable?:boolean}){
        const actions = ["grow"];
        super({name, actions, icon: "🪴"});
        this.eatable = eatable;
    }

    //#endregion

    //#region Public methods

    live():void{
        const fctName = this.#getRandomAction();
        if(fctName === "grow") this.grow();
    }

    grow():void{
        Content.display(this.#getDisplayTemplate());
    }

    //#endregion

    //#region Private methods

    #getDisplayTemplate():string{
        return Utils.getDisplayTemplate(`
            <span class="good-event"> - Growing - </span>
            <span>${this.name}</span>
        `, true, "space-around");
    }

    #getRandomAction():string{
        return this.actions[Utils.getRandomIndex(this.actions)];
    }

    //#endregion

}