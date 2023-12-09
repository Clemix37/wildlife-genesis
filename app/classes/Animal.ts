import IAnimal from "../interfaces/IAnimal";
import Content from "./Content";
import Life from "./Life";
import Plant from "./Plant";
import Utils from "./Utils";

export default class Animal extends Life implements IAnimal {
    
    //#region Properties

    race:string;
    #functions:{[K:string]:Function};

    //#endregion

    //#region Constructor

    constructor({name,race}:{name:string,race:string}){
        const actions = ["eat", "kill", "reproduce"];
        super(name, actions);
        this.#functions = {
            "eat": this.eat,
            "kill": this.kill,
            "reproduce": this.reproduce,
        };
        this.race = race;
    }

    //#endregion

    //#region Public methods

    live(possiblePlantToEat:(Plant|null)):void{
        const fctName = this.#getRandomAction();
        this.#functions[fctName]?.(possiblePlantToEat);
    }

    eat(lifeToEat:(Plant|null)):void{
        const display = this.#getTmplEating(lifeToEat);
        if(!!lifeToEat) lifeToEat.alive = false;
        Content.display(display);
    }

    kill(){

    }

    reproduce(){

    }

    //#endregion

    //#region Private methods

    #getDisplayTemplate(content:string):string{
        return `
            <div class="ligne">
                ${content}
            </div>
        `;
    }

    #getTmplEating(lifeToEat:(Plant|null)):string{
        const display = !!lifeToEat ? `
            <span class="good-event">✅ - Eating - </span>
            <span>${this.name} => ${lifeToEat.name}</span>
        ` : `
            <span class="bad-event">❌ - Error - </span>
            <span>No plant to eat</span>
        `;
        return this.#getDisplayTemplate(display);
    }

    #getRandomAction():string{
        return this.actions[Utils.getRandomIndex(this.actions)];
    }

    //#endregion

}