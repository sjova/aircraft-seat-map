import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { SharedModule } from '@app/aircraft-seat-map/shared/shared.module';

@Injectable({
  providedIn: SharedModule,
})
export class FlightSeatMapService {
  constructor() {}

  getFlightSeatMap(): Observable<any> {
    return of('FlightSeatMap TODO');
  }
}
