import IEcosystem from "../interfaces/IEcosystem";
import Animal from "./Animal";
import Content from "./Content";
import Life from "./Life";
import Plant from "./Plant";
import Utils from "./Utils";

export default class Ecosystem implements IEcosystem {
    
    //#region Properties

    population: Life[];
    deads: Life[];
    indexLife: number;

    //#endregion

    //#region Constructor

    constructor({population,deads}:{population:Life[],deads:Life[]}){
        this.population = population;
        this.deads = deads;
        this.indexLife = -1;
    }

    //#endregion

    //#region Public methods

    addLives(...lives:Life[]){
        this.population.push(...lives);
    }

    simulate(){
        this.#displayPopulationAndDeads();
        setInterval(() => {
            const nextLife:Life = this.#getNextLife();
            if(nextLife instanceof Animal){
                nextLife.live(this.population);
                this.deads = [...this.deads, ...this.population.filter(theLife => !theLife.alive)];
                this.population = this.population.filter(theLife => theLife.alive);
            }
            else if(nextLife instanceof Plant) nextLife.live();
            this.#checkForActionsAfterSimulation(nextLife);
            this.#displayPopulationAndDeads();
        }, Utils.delayBetweenActions);
    }

    //#endregion

    //#region Private methods

    #checkForActionsAfterSimulation(actualLife:Life):void{
        if(Utils.itemHasBeenKilled) this.#actionAfterKill(actualLife);
        else if(Utils.itemHasReproduced) this.#actionAfterReproduce(actualLife);
    }

    #getNextLife():Life{
        this.indexLife = this.indexLife >= this.population.length - 1 ? 0 : this.indexLife + 1;
        return this.population[this.indexLife];
    }

    #actionAfterKill(actualLife:Life):void{
        Utils.itemHasBeenKilled = false;
        // We add the new dead
        this.deads.push(actualLife);
        // We remove the killed one from population
        this.population = this.population.filter(aLife => aLife.id !== actualLife.id);
    }

    #actionAfterReproduce(actualLife:Life):void{
        Utils.itemHasReproduced = false;
        // Create the animal
        if(actualLife instanceof Animal){
            const newAnimal:Animal = new Animal({name:`${actualLife.name} Jr`, race: actualLife.race});
            this.addLives(newAnimal);
        }
        // Create the plant
        else if (actualLife instanceof Plant){
            const newPlant:Plant = new Plant({name:actualLife.name, eatable: actualLife.eatable});
            this.addLives(newPlant);
        }
    }

    #displayPopulationAndDeads(){
        let display = "";
        const everyone = [...this.population, ...this.deads];
        for (let i = 0; i < everyone.length; i++) {
            const theLife = everyone[i];
            display += Utils.getDisplayTemplate(
                theLife.alive ? `<span class="good-event">❤️ - ${theLife.icon} - ${theLife.name}</span>`
                    : `<span class="bad-event">💀 - ${theLife.icon} - ${theLife.name}</span>`, true, "space-around");
        }
        Content.displayPopulation(Utils.getDisplayTemplate(display, false));
    }

    //#endregion

}