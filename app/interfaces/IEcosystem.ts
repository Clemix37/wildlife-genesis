import Animal from "../classes/Animal";
import Life from "../classes/Life";
import Plant from "../classes/Plant";

export default interface IEcosystem {
    population: Life[];
    deads: Life[];
};