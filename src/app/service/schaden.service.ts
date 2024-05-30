import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Schaden } from '../data/schaden';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../enviroments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SchadenService {

  constructor(private httpClient: HttpClient) { }

  public getListByFahrzeug(fahrzeugId: number): Observable<Schaden[]> {
    return this.httpClient.get<Schaden[]>(environment.backendBaseUrl + 'SchadenByFahrzeugId' + `/${fahrzeugId}`);
  }

  public save(schaden: Schaden): Observable<Schaden> {
    return this.httpClient.post<Schaden>(environment.backendBaseUrl + 'InsertSchaden', schaden);
  }

  public delete(id: number): Observable<HttpResponse<string>> {
    return this.httpClient.delete<string>(environment.backendBaseUrl + 'DeleteSchaden' + `/${id}`, {observe: 'response'});
  }

  public getOne(id: number): Observable<Schaden> {
    return this.httpClient.get<Schaden>(environment.backendBaseUrl + 'FindSchadenById' + `/${id}`);
  }

  public update(schaden: Schaden): Observable<Schaden> {
    return this.httpClient.put<Schaden>(environment.backendBaseUrl + 'SchadenUpdaten', schaden);
  }
}
