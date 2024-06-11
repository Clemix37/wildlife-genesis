import IAnimal from "../interfaces/IAnimal";
import IProbability from "../interfaces/IProbability";
import Content from "./Content";
import Life from "./Life";
import Plant from "./Plant";
import Utils from "./Utils";

export default class Animal extends Life implements IAnimal {
    
    //#region Properties

    race: string;
    daysWithoutFood: number;

    //#endregion

    //#region Constructor

    constructor({ name, race }: { name: string, race: string }){
        const actionsProba: IProbability[] = [
            {
                value: "eat",
                weight: 3,
            },  
            {
                value: "reproduce",
                weight: 2,
            },
            {
                value: "kill",
                weight: 1,
            },
        ];
        super({ name, actionsProba, icon: "🐶" });
        this.race = race;
        this.daysWithoutFood = 0;
    }

    //#endregion

    //#region Public methods

    /**
     * Call a random action
     * @param population Life[]
     */
    live(population: Life[]): void {
        const fctName: string = this.#getRandomAction();
        if(fctName === "eat") this.eat(population);
        else if(fctName === "kill") this.kill();
        else if(fctName === "reproduce") this.reproduce(population);
    }

    eat(population: Life[]): void {
        // We get the plant to eat
        const plants: Plant[] = population.filter(theLife => theLife instanceof Plant && theLife.eatable) as Plant[];
        const lifeToEat: (Plant|null) = plants.length > 0 ? plants[Utils.getRandomIndex(plants)] : null;
        // We change the nb of days without eating 
        if(!lifeToEat) this.daysWithoutFood++;
        else this.daysWithoutFood = 0;
        // If it's been too long since eating, we let it die
        if(this.daysWithoutFood >= Utils.daysWithoutFoodBeforeDeath) return this.kill();
        // We specify that the actual item has eaten and if it's still alive
        Utils.itemHasEaten = true;
        if(!!lifeToEat) lifeToEat.alive = false;
        // We display the action on screen
        Content.display(this.#getTmplEating(lifeToEat));
    }

    /**
     * We tell the item has been killed and is not alive anymore
     * And display the message
     */
    kill(): void {
        Utils.itemHasBeenKilled = true;
        this.alive = false;
        Content.display(Utils.getDisplayTemplate(`<span class="bad-event"> - Killed - </span><span>${this.name}</span>`, true, "justify-content-space-around"));
    }

    /**
     * Get an animal to reproduce with
     * Display the reproduction if possible
     * @param population ILife[]
     * @returns void
     */
    reproduce(population: Life[]): void {
        const animals: Animal[] = population.filter(theLife => theLife instanceof Animal && theLife.id !== this.id) as Animal[];
        const animalToReproduceWith = animals.length > 0 ? animals[Utils.getRandomIndex(animals)] : null;
        if(!animalToReproduceWith) 
            return Content.display(Utils.getDisplayTemplate(`<span class="bad-event"> - Error - </span><span>No reproduction without other animal (${this.name})</span>`, true, "justify-content-space-around"));
        Utils.itemHasReproduced = true;
        Content.display(Utils.getDisplayTemplate(`<span class="good-event"> - Reproducing - </span><span>${this.name}</span>`, true, "justify-content-space-around"));
    }

    //#endregion

    //#region Private methods

    #getTmplEating(lifeToEat: (Plant|null)): string {
        const display = !!lifeToEat ? `
            <span class="good-event"> - Eating - </span>
            <span>${this.name} => ${lifeToEat.name}</span>
        ` : `
            <span class="bad-event"> - Error - </span>
            <span>No plant to eat</span>
        `;
        return Utils.getDisplayTemplate(display, true, "justify-content-space-around");
    }

    #getRandomAction(): string {
        return this.actions[Utils.getRandomIndex(this.actions)];
    }

    //#endregion

}