import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { Store } from '@app/store';
import { Observable } from 'rxjs';

import { FlightDetails } from '@app/aircraft-seat-map/shared/models/flight-details';
import { FlightSeatMapService } from '@app/aircraft-seat-map/shared/services/flight-seat-map/flight-seat-map.service';
import { FlightSeatMapResponse } from '@app/aircraft-seat-map/shared/models/flight-seat-map-response';

export interface Flight {
  value: string;
  viewValue: string;
}

export interface Traveler {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeatSelectionComponent implements OnInit {
  flightsDetailsExample: FlightDetails[] = [
    {
      passenger: {
        firstName: 'Henrik',
        lastName: 'Larsson',
      },
      flights: [
        {
          flightInfo: {
            departure: {
              code: 'ARN',
            },
            arrival: {
              code: 'BEG',
            },
          },
          flightSeat: {
            code: 'F',
            rowNumber: 2,
          },
        },
        {
          flightInfo: {
            departure: {
              code: 'BEG',
            },
            arrival: {
              code: 'ARN',
            },
          },
          flightSeat: {
            code: 'B',
            rowNumber: 6,
          },
        },
      ],
    },
    {
      passenger: {
        firstName: 'Freddie',
        lastName: 'Ljungberg',
      },
      flights: [
        {
          flightInfo: {
            departure: {
              code: 'ARN',
            },
            arrival: {
              code: 'BEG',
            },
          },
          flightSeat: {
            code: 'E',
            rowNumber: 3,
          },
        },
        {
          flightInfo: {
            departure: {
              code: 'BEG',
            },
            arrival: {
              code: 'ARN',
            },
          },
          flightSeat: {
            code: 'C',
            rowNumber: 6,
          },
        },
      ],
    },
  ];

  flights: Flight[] = [
    {
      value: 'ARN - BEG',
      viewValue: 'Stockholm (ARN) - Belgrade (BEG)',
    },
    {
      value: 'BEG - ARN',
      viewValue: 'Belgrade (BEG) - Stockholm (ARN)',
    },
  ];

  selectedFlight = 'ARN - BEG';

  travelers: Traveler[] = [
    {
      value: 'Henrik Larsson',
      viewValue: 'Henrik Larsson',
    },
    {
      value: 'Freddie Ljungberg',
      viewValue: 'Freddie Ljungberg',
    },
  ];

  selectedTraveler = 'Henrik Larsson';

  flightSeatMap$: Observable<FlightSeatMapResponse>;

  constructor(
    private flightSeatMapService: FlightSeatMapService,
    private store: Store
  ) {}

  ngOnInit(): void {
    // TODO: Revisit CORS issues and setup
    // this.flightSeatMap$ = this.flightSeatMapService.getFlightSeatMap();

    this.flightSeatMap$ = this.flightSeatMapService.getFlightSeatMapMock();

    this.store.set<FlightDetails[]>(
      'flightsDetails',
      this.flightsDetailsExample
    );
  }

  confirmSettings() {
    console.log('TODO: Confirm settings');
  }
}
