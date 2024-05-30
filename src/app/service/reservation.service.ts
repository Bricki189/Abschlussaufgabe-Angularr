import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from '../data/reservation';
import { environment } from '../enviroments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private httpClient: HttpClient) { }


  
  public getListByKunde(): Observable<Reservation[]> {
    return this.httpClient.get<Reservation[]>(environment.backendBaseUrl + 'ReservationByKunde');
  }

  public save(reservation: Reservation): Observable<Reservation> {
    return this.httpClient.post<Reservation>(environment.backendBaseUrl + 'InsertSchaden', reservation);
  }

  public delete(id: number): Observable<HttpResponse<string>> {
    return this.httpClient.delete<string>(environment.backendBaseUrl + 'DeleteReservation' + `/${id}`, {observe: 'response'});
  }

  public getOne(id: number): Observable<Reservation> {
    return this.httpClient.get<Reservation>(environment.backendBaseUrl + 'FindSchadenById' + `/${id}`);
  }

  public update(reservation: Reservation): Observable<Reservation> {
    return this.httpClient.put<Reservation>(environment.backendBaseUrl + 'SchadenUpdaten', reservation);
  }
}
