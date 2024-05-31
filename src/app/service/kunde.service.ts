import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Kunde } from '../data/kunde';
import { environment } from '../enviroments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class KundeService {

  constructor(private httpClient: HttpClient) { }

  public getOneByUser(): Observable<Kunde> {
    return this.httpClient.get<Kunde>(environment.backendBaseUrl + 'KundeByOuathuser');
  }

  public update(kunde: Kunde): Observable<Kunde> {
    return this.httpClient.put<Kunde>(environment.backendBaseUrl + 'KundenUpdaten', kunde);
  }
}
