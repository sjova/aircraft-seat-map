import { FlightSeatMapService } from '@app/aircraft-seat-map/shared/services/flight-seat-map/flight-seat-map.service';
import { Store } from '@app/store';
import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  flightsStoreName,
  normalizeResponse,
  prepareDefaultCurrentSelection,
  seatSelectionValidation,
  setDemoQueryParam,
  updateFlightsSeatSelection,
} from '@app/aircraft-seat-map/shared/helpers';
import { CurrentSelection, Flights } from '@app/aircraft-seat-map/models/flights';
import { Observable, of } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { exhaustMap, map, tap } from 'rxjs/operators';
import { SeatMapSelection } from '@app/aircraft-seat-map/components/seat-map/seat-map.component';

const PAGE_SEAT_SELECTION = 'page-seat-map-selection';

@Component({
  selector: 'app-seat-map-selection',
  templateUrl: './seat-map-selection.component.html',
  styleUrls: ['./seat-map-selection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeatMapSelectionComponent implements OnInit, OnDestroy {
  parentPage = '/demo/summary';
  queryParams: Params;

  flights$: Observable<Flights>;
  isSeatSelectionValid: boolean;
  private initialFlights: Flights;

  currentSelection: CurrentSelection;
  private selectionSteps: CurrentSelection[] = [];
  private selectionStepIndex = 0;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private flightSeatMapService: FlightSeatMapService,
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  get currentSelectionPassengerId(): number {
    // TODO: Revisit conversion `string` to `number` after migration to DIB API
    return +this.currentSelection.passengerId;
  }

  ngOnInit(): void {
    this.renderer.addClass(this.document.body, PAGE_SEAT_SELECTION);

    this.queryParams = setDemoQueryParam(this.activatedRoute, this.router, this.queryParams);

    this.flights$ = this.store.select(flightsStoreName).pipe(
      exhaustMap((flights: Flights) => {
        if (flights) {
          // Get Stored Flights
          return of(flights);
        } else {
          // Set and Get Flights
          return this.flightSeatMapService.getFlightSeatMapMock(this.queryParams.demo).pipe(
            map(normalizeResponse),
            tap((flights: Flights) => {
              this.store.set(flightsStoreName, flights);
            })
          );
        }
      }),
      tap((flights: Flights) => {
        this.setInitialFlights(flights);
        this.setInitialCurrentSelection(flights);
        this.setInitialSelectionSteps(flights);

        this.isSeatSelectionValid = seatSelectionValidation(flights);
      })
    );
  }

  private setInitialFlights(flights: Flights): void {
    if (!this.initialFlights) {
      this.initialFlights = flights;
    }
  }

  private setInitialCurrentSelection(flights: Flights): void {
    if (this.currentSelection === undefined) {
      const currentSelection = prepareDefaultCurrentSelection(flights);

      this.updateCurrentSelection(currentSelection);
    }
  }

  private updateCurrentSelection(currentSelection: CurrentSelection): void {
    this.currentSelection = currentSelection;

    this.store.setSlice(flightsStoreName, 'currentSelection', currentSelection);
  }

  private setInitialSelectionSteps(flights: Flights): void {
    if (this.selectionSteps.length === 0) {
      flights.allIds.forEach((flightNumber) => {
        flights.byId[flightNumber].passengers.allIds.forEach((passengerId) => {
          this.selectionSteps = [
            ...this.selectionSteps,
            {
              flightNumber,
              passengerId,
            },
          ];
        });
      });
    }
  }

  onSeatSelection(seatSelection: SeatMapSelection): void {
    const flights = this.store.selectValue(flightsStoreName);

    const updatedFlightsSeatSelection = updateFlightsSeatSelection(flights, seatSelection);

    this.store.set(flightsStoreName, updatedFlightsSeatSelection);

    // Prevent selection next step until new seat is selected
    if (!seatSelection.selected) {
      this.selectionNextStep();
    }

    this.isSeatSelectionValid = updatedFlightsSeatSelection.isSeatSelectionValid;
  }

  private selectionPrevStep(): void {
    if (this.selectionStepIndex > 0) {
      this.selectionStepIndex -= 1;
      this.updateCurrentSelection(this.getCurrentSelectionByStep());
    }
  }

  private selectionNextStep(): void {
    if (this.selectionStepIndex < this.selectionSteps.length - 1) {
      this.selectionStepIndex += 1;
      this.updateCurrentSelection(this.getCurrentSelectionByStep());
    }
  }

  private getCurrentSelectionByStep(): CurrentSelection {
    return {
      ...this.currentSelection,
      flightNumber: this.selectionSteps[this.selectionStepIndex].flightNumber,
      passengerId: this.selectionSteps[this.selectionStepIndex].passengerId,
    };
  }

  selectPassenger(flightNumber: string, passengerId: string): void {
    const currentSelection = {
      ...this.currentSelection,
      flightNumber,
      passengerId,
    };

    this.setSelectionStepIndex(currentSelection);
    this.updateCurrentSelection(currentSelection);
  }

  private setSelectionStepIndex(currentSelection: CurrentSelection): void {
    this.selectionStepIndex = this.selectionSteps.findIndex(
      (step) => step.flightNumber === currentSelection.flightNumber && step.passengerId === currentSelection.passengerId
    );
  }

  cancelSeatsSelection(): void {
    this.store.set(flightsStoreName, { ...this.initialFlights });
    this.router.navigate([this.parentPage], { queryParams: this.queryParams });
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(this.document.body, PAGE_SEAT_SELECTION);
  }
}
