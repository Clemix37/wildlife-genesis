export default interface ILife {
    id:string; // Id of the life
    name:string; // Name of life
    actions:string[]; // List of actions of the life
    alive:boolean;
    live: Function; // Function called
}