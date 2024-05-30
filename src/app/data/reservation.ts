import { Fahrzeug } from "./fahrzeug";
import { Kunde } from "./kunde";

export class Reservation{
    id!: number;
    bisDatum: string = '';
    vonDatum: string = '';
    fahrzeug: Fahrzeug = new Fahrzeug();
    kunde: Kunde = new Kunde();
}