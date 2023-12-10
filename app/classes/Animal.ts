import IAnimal from "../interfaces/IAnimal";
import Content from "./Content";
import Life from "./Life";
import Plant from "./Plant";
import Utils from "./Utils";

export default class Animal extends Life implements IAnimal {
    
    //#region Properties

    race:string;

    //#endregion

    //#region Constructor

    constructor({name,race}:{name:string,race:string}){
        const actions = ["eat", "kill", "reproduce"];
        super({name, actions, icon: "🐶"});
        this.race = race;
    }

    //#endregion

    //#region Public methods

    live(population:Life[]):void{
        const plants:Plant[] = population.filter(theLife => theLife instanceof Plant && theLife.eatable) as Plant[];
        const possiblePlantToEat:(Plant|null) = plants.length > 0 ? plants[Utils.getRandomIndex(plants)] : null;
        const fctName:string = this.#getRandomAction();
        if(fctName === "eat") this.eat(possiblePlantToEat);
        else if(fctName === "kill") this.kill();
        else if(fctName === "reproduce") this.reproduce();
    }

    eat(lifeToEat:(Plant|null)):void{
        const display = this.#getTmplEating(lifeToEat);
        if(!!lifeToEat) lifeToEat.alive = false;
        Content.display(display);
    }

    kill(){
        Utils.itemHasBeenKilled = true;
        this.alive = false;
        Content.display(Utils.getDisplayTemplate(`<span class="bad-event"> - Killed - </span><span>${this.name}</span>`, true, "space-around"));
    }

    reproduce(){
        Utils.itemHasReproduced = true;
        Content.display(Utils.getDisplayTemplate(`<span class="good-event"> - Reproducing - </span><span>${this.name}</span>`, true, "space-around"));
    }

    //#endregion

    //#region Private methods

    #getTmplEating(lifeToEat:(Plant|null)):string{
        const display = !!lifeToEat ? `
            <span class="good-event"> - Eating - </span>
            <span>${this.name} => ${lifeToEat.name}</span>
        ` : `
            <span class="bad-event"> - Error - </span>
            <span>No plant to eat</span>
        `;
        return Utils.getDisplayTemplate(display, true, "space-around");
    }

    #getRandomAction():string{
        return this.actions[Utils.getRandomIndex(this.actions)];
    }

    //#endregion

}