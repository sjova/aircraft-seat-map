import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { SHA512, enc } from 'crypto-js';

import { environment } from '@app/environments/environment';
import { SharedModule } from '@app/aircraft-seat-map/shared/shared.module';

@Injectable({
  providedIn: SharedModule,
})
export class FlightSeatMapService {
  constructor(private http: HttpClient) {}

  getFlightSeatMap(): Observable<any> {
    const authorization = this.getMROSignatureAuthentication();
    const api = environment.mrOrange.api;

    return of('FlightSeatMap TODO');
  }

  private getMROSignatureAuthentication(): string {
    const { apiKey, secret } = environment.mrOrange;
    const timestamp = Math.round(new Date().getTime() / 1000);
    const hash = SHA512(apiKey + secret + timestamp).toString(enc.Hex);
    const authHeaderValue =
      'MRO APIKey=' + apiKey + ',Signature=' + hash + ',timestamp=' + timestamp;
    console.log(authHeaderValue);
    return authHeaderValue;
  }
}
