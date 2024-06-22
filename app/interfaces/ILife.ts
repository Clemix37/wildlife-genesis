import IProbability from "./IProbability";

export default interface ILife {
	id: string; // Id of the life
	name: string; // Name of life
	actions: string[]; // List of actions of the life
	actionsProba: IProbability[]; // List of actions and their probability of the life
	alive: boolean;
	icon: string; // Icon for the display of instance
	days: number; // Number of days since alive
	addDays(nbDays: number): void;
	live(thing: any): void;
	kill(): void;
	resuscitate(): void;
	changeUniqueProba(proba: IProbability): void;
}
