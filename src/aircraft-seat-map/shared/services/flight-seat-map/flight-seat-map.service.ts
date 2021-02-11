import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';
import { enc, SHA512 } from 'crypto-js';

import { FlightSeatMapResponse } from '@app/aircraft-seat-map/shared/models/flight-seat-map-response';
import { SharedModule } from '@app/aircraft-seat-map/shared/shared.module';
import { environment } from '@app/environments/environment';

import FlightSeatMapData from 'flightretrieveseatmap.json';

@Injectable({
  providedIn: SharedModule,
})
export class FlightSeatMapService {
  apiUrl = environment.mrOrange.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: this.getMROSignatureAuthentication(),
    }),
  };

  constructor(private http: HttpClient) {}

  getFlightSeatMap(): Observable<Partial<FlightSeatMapResponse>> {
    const partnerId = 1;
    const conversationId = 'd9a7e02b-8b2e-4b35-8199-df7f697c9dd3';
    const source = 'Amadeus';
    const identifier = 'S7CZV8';

    const urlParams = `partnerid=${partnerId}&conversationId=${conversationId}&source=${source}&identifier=${identifier}`;
    const url = `${this.apiUrl}/flightretrieveseatmap?${urlParams}`;

    return this.http.get<FlightSeatMapResponse>(url, this.httpOptions).pipe(
      tap((_) => console.log('fetched flight seat map')),
      catchError(
        this.handleError<Partial<FlightSeatMapResponse>>('getFlightSeatMap', {})
      )
    );
  }

  getFlightSeatMapMock(): Observable<FlightSeatMapResponse> {
    const fakeDelay = getRandomIntFromRange(800, 1200);
    return of(FlightSeatMapData).pipe(delay(fakeDelay));
  }

  private getMROSignatureAuthentication(): string {
    const { apiKey, secret } = environment.mrOrange;
    const timestamp = Math.round(new Date().getTime() / 1000);
    const hash = SHA512(apiKey + secret + timestamp).toString(enc.Hex);
    const authHeaderValue =
      'MRO APIKey=' + apiKey + ',Signature=' + hash + ',timestamp=' + timestamp;
    // console.log('MROSignatureAuthentication', authHeaderValue);
    return authHeaderValue;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation, error);
      return of(result as T);
    };
  }
}

function getRandomIntFromRange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
