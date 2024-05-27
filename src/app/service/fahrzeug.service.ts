import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fahrzeug } from '../data/fahrzeug';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FahrzeugService {


  constructor(private httpClient: HttpClient) { }

  public getList(): Observable<Fahrzeug[]> {
    return this.httpClient.get<Fahrzeug[]>(environment.backendBaseUrl + 'AlleFahrzeuge');
  }

  public save(person: Fahrzeug): Observable<Fahrzeug> {
    return this.httpClient.post<Fahrzeug>(environment.backendBaseUrl + 'InsertFahrzeug', person);
  }
}
