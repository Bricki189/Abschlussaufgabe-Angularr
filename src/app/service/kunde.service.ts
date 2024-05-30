import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Kunde } from '../data/kunde';
import { environment } from '../enviroments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class KundeService {

  constructor(private httpClient: HttpClient) { }

  public getListByKunde(): Observable<Kunde[]> {
    return this.httpClient.get<Kunde[]>(environment.backendBaseUrl + 'ReservationByKunde');
  }

  public save(kunde: Kunde): Observable<Kunde> {
    return this.httpClient.post<Kunde>(environment.backendBaseUrl + 'InsertSchaden', kunde);
  }

  public delete(id: number): Observable<HttpResponse<string>> {
    return this.httpClient.delete<string>(environment.backendBaseUrl + 'DeleteReservation' + `/${id}`, {observe: 'response'});
  }

  public getOne(id: number): Observable<Kunde> {
    return this.httpClient.get<Kunde>(environment.backendBaseUrl + 'FindSchadenById' + `/${id}`);
  }

  public update(kunde: Kunde): Observable<Kunde> {
    return this.httpClient.put<Kunde>(environment.backendBaseUrl + 'SchadenUpdaten', kunde);
  }
}
