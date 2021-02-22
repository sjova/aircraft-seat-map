import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';

import { Store } from '@app/store';

import { FlightSeatMapApiResponse } from '@app/aircraft-seat-map/shared/models/flight-seat-map-api-response';
import { SharedModule } from '@app/aircraft-seat-map/shared/shared.module';
import { environment } from '@app/environments/environment';
import { getRandomIntFromRange } from '@app/aircraft-seat-map/shared/helpers/random-int-from-range';
import { getMROSignatureAuthentication } from '@app/aircraft-seat-map/shared/helpers/mro-signature-authentication';

import FlightSeatMapDataExample1 from 'flightretrieveseatmap-example-1.json';
import FlightSeatMapDataExample2 from 'flightretrieveseatmap-example-2.json';
import FlightSeatMapDataExample3 from 'flightretrieveseatmap-example-3.json';

@Injectable({
  providedIn: SharedModule,
})
export class FlightSeatMapService {
  apiUrl = environment.mrOrange.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: getMROSignatureAuthentication(),
    }),
  };

  constructor(private http: HttpClient, private store: Store) {}

  getFlightSeatMap(): Observable<Partial<FlightSeatMapApiResponse>> {
    const partnerId = 1;
    const conversationId = 'd9a7e02b-8b2e-4b35-8199-df7f697c9dd3';
    const source = 'Amadeus';
    const identifier = 'S7CZV8';

    const urlParams = `partnerid=${partnerId}&conversationId=${conversationId}&source=${source}&identifier=${identifier}`;
    const url = `${this.apiUrl}/flightretrieveseatmap?${urlParams}`;

    return this.http.get<FlightSeatMapApiResponse>(url, this.httpOptions).pipe(
      tap((_) =>
        console.log('[FLIGHT SEAT MAP][API] get flight seat map success')
      ),
      catchError(
        this.handleError<Partial<FlightSeatMapApiResponse>>(
          'getFlightSeatMap',
          {}
        )
      )
    );
  }

  getFlightSeatMapMock(
    dataExampleIndex: number
  ): Observable<FlightSeatMapApiResponse> {
    const dataExample = [
      undefined,
      FlightSeatMapDataExample1,
      FlightSeatMapDataExample2,
      FlightSeatMapDataExample3,
    ];

    const fakeDelay = getRandomIntFromRange(800, 1200);

    return of(dataExample[dataExampleIndex] as FlightSeatMapApiResponse).pipe(
      delay(fakeDelay),
      tap((_) =>
        console.log('[FLIGHT SEAT MAP][API] get flight seat map success')
      )
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation, error);
      return of(result as T);
    };
  }
}
