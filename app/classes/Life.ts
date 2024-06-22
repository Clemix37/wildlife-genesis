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

	live(thing: any): void {}

	changeProbabilities(probas: IProbability[]): void {
		this.actionsProba = probas;
		this.actions = this.#generateActionsBasedOnProba();
	}

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
