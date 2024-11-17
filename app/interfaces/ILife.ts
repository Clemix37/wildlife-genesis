import IProbability from "./IProbability";

export default interface ILife {
	id: string; // Id of the life
	name: string; // Name of life
	actions: string[]; // List of actions of the life
	actionsProba: IProbability[]; // List of actions and their probability of the life
	alive: boolean; // Is the life alive or not
	icon: string; // Icon for the display of instance
	days: number; // Number of days since alive
	addDays(nbDays: number): void; // Function to addDays to the life
	live(thing: any): void; // Function that randomly acts or live
	kill(): void; // Kills the life
	resuscitate(): void; // Relives th life
	changeUniqueProba(proba: IProbability): void; // Change its probabilities
}
