import ILife from "../interfaces/ILife";
import { v4 as uuidv4 } from "uuid";
import IProbability from "../interfaces/IProbability";

export default class Life implements ILife {
    
    //#region Properties

    id: string;
    name: string;
    alive: boolean;
    icon: string;
    actions: string[];
    actionsProba: IProbability[];

    //#endregion
    
    //#region Constructor
    
    constructor({ name, actionsProba, icon }: { name: string, actionsProba: IProbability[], icon: string }){
        this.id = uuidv4();
        this.name = name;
        this.actionsProba = actionsProba;
        this.actions = this.#generateActionsBasedOnProba();
        this.alive = true;
        this.icon = icon;
    }

    //#endregion

    //#region Public methods

    live(thing: any): void {}

    changeProbabilities(probas: IProbability[]): void{
        this.actionsProba = probas;
        this.actions = this.#generateActionsBasedOnProba();
    }

    changeUniqueProba(proba: IProbability): void{
        const probaSaved = this.actionsProba.find(prob => prob.value === proba.value);
        if(!probaSaved) return;
        probaSaved.weight = proba.weight;
        this.#generateActionsBasedOnProba();
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
        return actions.sort((a, b) => 0.5 - Math.random());
    }

    //#endregion

}