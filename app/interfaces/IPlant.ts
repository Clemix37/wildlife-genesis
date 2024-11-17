export default interface IPlant {
	numberOfTimesEaten: number; // Number of times plant has been eaten
	addEaten(nbTimes: number): void; // Add a number of times being eaten
	grow(): void; // Grow the plant
	reproduce(): void; // Reproduce the plant
}
