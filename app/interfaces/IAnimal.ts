import Life from "../classes/Life";

export default interface IAnimal {
	race: string;
	daysWithoutFood: number;
	eat(population: Life[]): void;
	reproduce(population: Life[]): void;
}
