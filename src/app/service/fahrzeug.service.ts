import { HttpClient, HttpResponse } from '@angular/common/http';
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

  public save(fahrzeug: Fahrzeug): Observable<Fahrzeug> {
    return this.httpClient.post<Fahrzeug>(environment.backendBaseUrl + 'InsertFahrzeug', fahrzeug);
  }

  public delete(id: number): Observable<HttpResponse<string>> {
    return this.httpClient.delete<string>(environment.backendBaseUrl + 'DeleteFahrzeug' + `/${id}`, {observe: 'response'});
  }

  public getOne(id: number): Observable<Fahrzeug> {
    return this.httpClient.get<Fahrzeug>(environment.backendBaseUrl + 'FindFahrzeugById' + `/${id}`);
  }

  public update(fahrzeug: Fahrzeug): Observable<Fahrzeug> {
    return this.httpClient.put<Fahrzeug>(environment.backendBaseUrl + 'FahrzeugUpdaten', fahrzeug);
  }
}
