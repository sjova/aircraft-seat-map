import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Renderer2,
  OnDestroy,
  Inject,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { exhaustMap, filter, map, tap } from 'rxjs/operators';

import { Store, CurrentSelection } from '@app/store';
import { FlightSeatMapService } from '@app/aircraft-seat-map/shared/services/flight-seat-map/flight-seat-map.service';
import { SeatSelection } from '@app/aircraft-seat-map/components/seat-map/seat-map.component';
import { FlightsState } from '@app/aircraft-seat-map/shared/models/flight-state';
import {
  prepareDefaultUserSelection,
  responseToState,
  seatSelectionValidation,
  setDemoQueryParam,
  updateFlightsState,
} from '@app/aircraft-seat-map/shared/helpers';
import { DOCUMENT } from '@angular/common';

const PAGE_SEAT_SELECTION = 'page-seat-selection';

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeatSelectionComponent implements OnInit, OnDestroy {
  parentPage = '/demo/summary';
  queryParams: Params;

  flights$: Observable<FlightsState>;
  isSeatSelectionValid: boolean;
  private initialFlightsState: FlightsState;

  currentSelection: CurrentSelection;
  private selectionSteps: CurrentSelection[] = [];
  private selectionStepIndex = 0;
  private currentSelectionSubscription: Subscription;

  constructor(
    @Inject(DOCUMENT) private document,
    private renderer: Renderer2,
    private flightSeatMapService: FlightSeatMapService,
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  get userSelectionPassengerIdAsNumber(): number {
    // TODO: Revisit conversion `string` to `number` after migration to DIB API
    return +this.currentSelection.passengerId;
  }

  ngOnInit(): void {
    this.renderer.addClass(this.document.body, PAGE_SEAT_SELECTION);

    this.queryParams = setDemoQueryParam(
      this.activatedRoute,
      this.router,
      this.queryParams
    );

    this.currentSelectionSubscription = this.store
      .select<CurrentSelection>('userFlightsSelection')
      .pipe(filter(Boolean))
      .subscribe(
        (userSelection: CurrentSelection) =>
          (this.currentSelection = userSelection)
      );

    // TODO: Revisit this after migration to DIB Web App
    this.flights$ = this.store.select<FlightsState>('flights').pipe(
      exhaustMap((flightsState) => {
        if (Boolean(flightsState)) {
          // Use Stored State
          return of(flightsState);
        } else {
          // Create New State
          return this.flightSeatMapService
            .getFlightSeatMapMock(this.queryParams.demo)
            .pipe(
              map(responseToState),
              tap((flightsState: FlightsState) => {
                this.store.set('flights', flightsState);
              })
            );
        }
      }),
      tap((flightsState: FlightsState) => {
        this.setInitialFlightsState(flightsState);
        this.isSeatSelectionValid = seatSelectionValidation(flightsState);
      })
    );
  }

  private setInitialFlightsState(flightsState: FlightsState): void {
    if (this.initialFlightsState === undefined) {
      this.store.set(
        'userFlightsSelection',
        prepareDefaultUserSelection(flightsState)
      );

      this.setSteps(flightsState);
      this.initialFlightsState = flightsState;
    }
  }

  ngOnDestroy(): void {
    if (this.currentSelectionSubscription) {
      this.currentSelectionSubscription.unsubscribe();
    }

    this.renderer.removeClass(this.document.body, PAGE_SEAT_SELECTION);
  }

  onSelection(event: SeatSelection): void {
    const stateName = 'flights';

    const updatedFlightsState = updateFlightsState(
      this.store.selectStateValue<FlightsState>(stateName),
      event
    );

    this.store.set(stateName, updatedFlightsState);

    // Prevent next step until new seat is selected
    if (!event.selected) {
      this.nextStep();
    }

    this.isSeatSelectionValid = updatedFlightsState.isSeatSelectionValid;
  }

  private setSteps(flightsState: FlightsState): void {
    flightsState.allIds.forEach((flightNumber) => {
      flightsState.byId[flightNumber].passengers.allIds.forEach(
        (passengerId) => {
          this.selectionSteps = [
            ...this.selectionSteps,
            {
              flightNumber,
              passengerId,
            },
          ];
        }
      );
    });
  }

  selectPassenger(flightNumber: string, passengerId: string): void {
    const userSelection = {
      ...this.currentSelection,
      flightNumber,
      passengerId,
    };

    this.setStepIndex(userSelection);

    this.store.set('userFlightsSelection', userSelection);
  }

  private setStepIndex(userSelection: CurrentSelection): void {
    this.selectionStepIndex = this.selectionSteps.findIndex(
      (step) =>
        step.flightNumber === userSelection.flightNumber &&
        step.passengerId === userSelection.passengerId
    );
  }

  private prevStep(): void {
    if (--this.selectionStepIndex >= 0) {
      this.updateUserFlightsSelectionState(this.selectionStepIndex);
    }
  }

  private nextStep(): void {
    if (++this.selectionStepIndex < this.selectionSteps.length) {
      this.updateUserFlightsSelectionState(this.selectionStepIndex);
    }
  }

  private updateUserFlightsSelectionState(stepIndex: number): void {
    this.store.set('userFlightsSelection', {
      ...this.currentSelection,
      flightNumber: this.selectionSteps[stepIndex].flightNumber,
      passengerId: this.selectionSteps[stepIndex].passengerId,
    });
  }

  cancelSeatSelection(): void {
    this.store.set('flights', { ...this.initialFlightsState });
    this.router.navigate([this.parentPage], { queryParams: this.queryParams });
  }
}
