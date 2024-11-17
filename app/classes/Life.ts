import ILife from "../interfaces/ILife";
import { v4 as uuidv4 } from "uuid";
import IProbability from "../interfaces/IProbability";
import Utils from "./Utils";
import Content from "./Content";

export default class Life implements ILife {
	//#region Properties

	id: string;
	name: string;
	alive: boolean;
	icon: string;
	actions: string[];
	actionsProba: IProbability[];
	days: number;

	//#endregion

	//#region Constructor

	/**
	 * Constructor of the Life class
	 * @constructor
	 * @param obj
	 * @param obj.name
	 * @param obj.actionsProba
	 * @param obj.icon
	 */
	constructor({
		name,
		actionsProba,
		icon,
	}: {
		name: string;
		actionsProba: IProbability[];
		icon: string;
	}) {
		this.id = uuidv4();
		this.name = name;
		this.actionsProba = actionsProba;
		this.actions = this.#generateActionsBasedOnProba();
		this.alive = true;
		this.icon = icon;
		this.days = 0;
	}

	//#endregion

	//#region Public methods

	/** Function overrided */
	live(thing: any): void {}

	/**
	 * Changes probabilities based on actions and items
	 * @param probas
	 */
	changeProbabilities(probas: IProbability[]): void {
		this.actionsProba = probas;
		this.actions = this.#generateActionsBasedOnProba();
	}

	/**
	 * Change a unique probability based on weight and value
	 * @param proba
	 * @returns {void}
	 */
	changeUniqueProba(proba: IProbability): void {
		const probaSaved: IProbability | undefined = this.actionsProba.find(
			(prob) => prob.value === proba.value,
		);
		if (!probaSaved) return;
		probaSaved.weight = proba.weight;
		this.#generateActionsBasedOnProba();
	}

	/**
	 * We tell the item has been killed and is not alive anymore
	 * And display the message
	 */
	kill(): void {
		Utils.itemHasBeenKilled = true;
		this.alive = false;
		Content.display(
			Utils.getDisplayTemplate(
				`<span class="bad-event"> - Killed - </span><span>${this.name}</span>`,
				true,
				"justify-content-space-around",
			),
		);
	}

	/**
	 * We tell the item has not been killed and is alive
	 * And display the message
	 */
	resuscitate(): void {
		Utils.itemHasBeenKilled = false;
		this.alive = true;
		Content.display(
			Utils.getDisplayTemplate(
				`<span class="good-event"> - Resuscitated - </span><span>${this.name}</span>`,
				true,
				"justify-content-space-around",
			),
		);
	}

	/**
	 * Add the number of days given in parameters
	 * @param nbDays
	 */
	addDays(nbDays: number): void {
		this.days += nbDays;
	}

	//#endregion

	//#region Private methods

	/**
	 * Generate actions based on probabilities of the life instance
	 * So that we can use this actions array randomly
	 * @returns {string[]}
	 */
	#generateActionsBasedOnProba(): string[] {
		const actions: string[] = [];
		for (let i = 0; i < this.actionsProba.length; i++) {
			const actionProba: IProbability = this.actionsProba[i];
			const nb = actionProba.weight * 100;
			for (let j = 0; j < nb; j++) {
				actions.push(actionProba.value);
			}
		}
		// We shuffle the array created
		return actions.sort((a, b) => 0.5 - Math.random());
	}

	//#endregion
}
