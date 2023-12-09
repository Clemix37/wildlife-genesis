import Animal from "../classes/Animal";
import Plant from "../classes/Plant";

export default interface IEcosystem {
    population: (Animal|Plant)[];
};