import IEcosystem from "../interfaces/IEcosystem";
import IProbability from "../interfaces/IProbability";
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
    #interval: NodeJS.Timeout|null;

    //#endregion

    //#region Constructor

    constructor({ population, deads }: { population: Life[], deads: Life[] }){
        this.population = population;
        this.deads = deads;
        this.indexLife = -1;
        this.#interval = null;
    }

    //#endregion

    //#region Public methods

    addLives(...lives: Life[]): void {
        this.population.push(...lives);
    }

    simulate(): void {
        // Only if simulation has been cleared
        if(!!this.#interval) return;
        this.displayPopulationAndDeads();
        this.#interval = setInterval(() => {
            const nextLife: Life = this.#getNextLife();
            nextLife.live(this.population);
            this.#checkForActionsAfterSimulation(nextLife);
            this.displayPopulationAndDeads();
            this.#changeProbabilities();
            if(this.population.length === 0 && !!this.#interval) {
                clearInterval(this.#interval);
                this.#interval = null;
            }
        }, Utils.delayBetweenActions);
    }

    displayPopulationAndDeads(): void {
        let display = "";
        const everyone: Life[] = [...this.population, ...this.deads];
        for (let i = 0; i < everyone.length; i++) {
            const theLife: Life = everyone[i];
            display += Utils.getDisplayTemplate(
                theLife.alive ? `<span class="good-event"> - ❤️ - </span><span>${theLife.icon} - ${theLife.name}</span>`
                    : `<span class="bad-event"> - 💀 - </span><span>${theLife.icon} - ${theLife.name}</span>`, true, "justify-content-space-around");
        }
        Content.displayPopulation(Utils.getDisplayTemplate(display, false));
    }

    //#endregion

    //#region Private methods

    #changeProbabilities(): void {
        const plants: Plant[] = this.population.filter(theLife => theLife instanceof Plant) as Plant[];
        const animals: Animal[] = this.population.filter(theLife => theLife instanceof Animal) as Animal[];
        // We change the probabilities of animals
        const animalProba: IProbability[] = [
            {
                value: "eat",
                weight: (plants.length * 2) - (animals.length -1),
            },
            {
                value: "reproduce",
                weight: plants.length - (animals.length -1),
            },
            {
                value: "kill",
                weight: plants.length <= 0 ? animals.length : (animals.length > 0 ? (1/animals.length) : 0),//(plants.length / 2) - (animals.length -1),
            },
        ];
        console.log(animalProba);
        for (let i = 0; i < animals.length; i++) {
            const animal = animals[i];
            animal.changeProbabilities(animalProba);
        }
        // We change the probabilities of plants
        const plantProba: IProbability[] = [
            {
                value: "grow",
                weight: plants.length * 2,
            },
            {
                value: "reproduce",
                weight: plants.length,
            },
            {
                value: "kill",
                weight: plants.length / 2,
            },
        ];
        for (let i = 0; i < plants.length; i++) {
            const plant = plants[i];
            plant.changeProbabilities(plantProba);
        }
    }

    #checkForActionsAfterSimulation(actualLife: Life): void {
        if(Utils.itemHasBeenKilled) this.#actionAfterKill(actualLife);
        else if(Utils.itemHasReproduced) this.#actionAfterReproduce(actualLife);
        else if(Utils.itemHasEaten) this.#actionAfterEating();
    }

    #getNextLife(): Life {
        this.indexLife = this.indexLife >= this.population.length - 1 ? 0 : this.indexLife + 1;
        return this.population[this.indexLife];
    }

    #actionAfterEating(): void {
        const idsDeads = [...this.deads.map(dead => dead.id)];
        this.deads = [...this.deads, ...this.population.filter(theLife => !theLife.alive && !idsDeads.includes(theLife.id))];
        this.population = [...this.population.filter(theLife => !!theLife.alive)];
    }

    #actionAfterKill(actualLife: Life): void {
        Utils.itemHasBeenKilled = false;
        const idsOfDeads = [...this.deads.map(dead => dead.id)];
        // We add the new dead if not already in here
        if(!idsOfDeads.includes(actualLife.id)) this.deads.push(actualLife);
        // We remove the killed one from population
        this.population = this.population.filter(aLife => aLife.id !== actualLife.id);
    }

    #actionAfterReproduce(actualLife: Life): void {
        Utils.itemHasReproduced = false;
        // Create the animal
        if(actualLife instanceof Animal){
            const newAnimal: Animal = new Animal({ name: `${actualLife.name} Jr.`, race: actualLife.race });
            this.addLives(newAnimal);
        }
        // Create the plant
        else if (actualLife instanceof Plant){
            const newPlant: Plant = new Plant({ name: actualLife.name, eatable: actualLife.eatable });
            this.addLives(newPlant);
        }
    }

    //#endregion

}