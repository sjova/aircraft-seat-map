import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';

import { FlightsSeatMapApiResponse } from '@app/aircraft-seat-map/models/flights-seat-map-api-response';
import { SharedModule } from '@app/aircraft-seat-map/shared/shared.module';
import { environment } from '@app/environments/environment';
import {
  getRandomIntegerFromRange,
  getMROSignatureAuthentication,
} from '@app/aircraft-seat-map/shared/helpers/utilities';
import { flightsSeatMapMockData } from '@app/data';

@Injectable({
  providedIn: SharedModule,
})
export class FlightSeatMapService {
  seatMapUrl = environment.mrOrange.apiUrl;

  constructor(private http: HttpClient) {}

  getFlightSeatMap(): Observable<FlightsSeatMapApiResponse> {
    const headers = new HttpHeaders({
      Authorization: getMROSignatureAuthentication(),
    });
    const params = new HttpParams()
      .set('partnerid', '1')
      .set('conversationId', 'seating-test')
      .set('source', 'Amadeus')
      .set('identifier', 'VEDQLI');

    return this.http
      .get<FlightsSeatMapApiResponse>(this.seatMapUrl, {
        headers,
        params,
      })
      .pipe(
        tap((_) => console.log('[API][FLIGHT SEAT MAP] Get flight seat map success')),
        catchError(this.handleError)
      );
  }

  getFlightSeatMapMock(exampleIndex: number): Observable<FlightsSeatMapApiResponse> {
    const fakeDelay = getRandomIntegerFromRange(800, 1200);

    return of(flightsSeatMapMockData[exampleIndex] as FlightsSeatMapApiResponse).pipe(
      delay(fakeDelay),
      tap((_) => console.log('[API][FLIGHT SEAT MAP] Get flight seat map success'))
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    const errorMessage =
      error.error instanceof ErrorEvent
        ? `An error occurred: ${error.error.message}`
        : `Server returned code: ${error.status}, error message is: ${error.message}`;

    console.error(errorMessage);

    return throwError(errorMessage);
  }
}
