import Life from "../classes/Life";

export default interface IEcosystem {
	population: Life[]; // Population of the ecosystem
	deads: Life[]; // Deads of the ecosystem
	playOrPause(): boolean; // Function playing ou pausing the game
	addLives(...lives: Life[]): void; // Function adding lives to the ecosystem
	simulate(): void; // Function to simulate the ecosystem
}
