import { Fahrzeug } from "./fahrzeug";

export class Schaden{
    id!: number;
    schadenArt: string = '';  
    schadensstaerke: number = 0;
    stelle: string = '';
    reperaturNotwendig: boolean = false;
    vonMieterVerursacht: boolean = false;
    fahrzeug!: Fahrzeug;


}