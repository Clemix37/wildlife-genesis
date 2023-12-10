import ILife from "../interfaces/ILife";
import {v4 as uuidv4} from "uuid";

export default class Life implements ILife {
    
    //#region Properties

    id:string;
    name:string;
    alive:boolean;
    icon: string;
    actions:string[];

    //#endregion
    
    //#region Constructor
    
    constructor({name,actions,icon}:{name:string,actions:string[],icon:string}){
        this.id = uuidv4();
        this.name = name;
        this.actions = actions;
        this.alive = true;
        this.icon = icon;
    }

    //#endregion

    //#region Public methods

    live(thing:any):void{}

    //#endregion

    //#region Private methods

    //#endregion

}