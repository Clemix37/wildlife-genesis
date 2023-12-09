import IEcosystem from "../interfaces/IEcosystem";
import Animal from "./Animal";
import Life from "./Life";
import Plant from "./Plant";
import Utils from "./Utils";

export default class Ecosystem implements IEcosystem {
    
    //#region Properties

    population: (Animal|Plant)[];
    indexLife: number;

    //#endregion

    //#region Constructor

    constructor({population}:{population:(Animal|Plant)[]}){
        this.population = population;
        this.indexLife = -1;
    }

    //#endregion

    //#region Public methods

    addLives(...lives:(Animal|Plant)[]){
        this.population.push(...lives);
    }

    simulate(){
        setInterval(() => {
            const nextLife:Life = this.#getNextLife();
            if(nextLife instanceof Animal){
                // Only the eatable Plant
                const plants = this.population.filter(life => life instanceof Plant && life.eatable) as Plant[];
                const plantToEat = plants.length > 0 ? plants[Utils.getRandomIndex(plants)] : null;
                nextLife.live(plantToEat);
                // We remove the Plant from the population if the plant is still alive
                if(!!plantToEat?.alive) this.population = this.population.filter(lifeElement => lifeElement.id !== plantToEat.id);
            }
            else if(nextLife instanceof Plant) {
                nextLife.grow();
            }
        }, 2000);
    }

    //#endregion

    //#region Private methods

    #getNextLife():Life{
        this.indexLife = this.indexLife >= this.population.length - 1 ? 0 : this.indexLife + 1;
        return this.population[this.indexLife];
    }

    //#endregion

}