import { Fahrzeug } from "./fahrzeug";
import { Kunde } from "./kunde";

export class Reservation{
    id!: number;
    bisDatum: Date = new Date();
    vonDatum: Date = new Date();
    fahrzeug: Fahrzeug = new Fahrzeug();
    kunde: Kunde = new Kunde();
}