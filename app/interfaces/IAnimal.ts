import Life from "../classes/Life";

export default interface IAnimal {
	race: string; // Race of the animal
	daysWithoutFood: number; // Days without food of the animal
	eat(population: Life[]): void; // Function to eat randomly a life
	reproduce(population: Life[]): void; // Function to reproduce randomly with a life
}
