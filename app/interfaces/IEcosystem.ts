import Life from "../classes/Life";

export default interface IEcosystem {
	population: Life[];
	deads: Life[];
	playOrPause(): boolean;
	addLives(...lives: Life[]): void;
	simulate(): void;
}
