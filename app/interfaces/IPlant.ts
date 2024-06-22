export default interface IPlant {
	numberOfTimesEaten: number;
	addEaten(nbTimes: number): void;
	grow(): void;
	reproduce(): void;
}
