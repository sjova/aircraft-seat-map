import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, pluck } from 'rxjs/operators';

import {
  FlightsState,
  FlightsTotalPrice,
} from '@app/aircraft-seat-map/shared/models/flight-state';

export interface UserSelection {
  flightNumber?: string;
  passengerId?: string;
}

// TODO: Rewrite into Redux state (byId, allIds) after demo
export interface State {
  flights: FlightsState;
  flightsTotalPrice: FlightsTotalPrice;
  userFlightsSelection: UserSelection;
}

const initialState: State = {
  flights: undefined,
  flightsTotalPrice: undefined,
  userFlightsSelection: undefined,
};

export class Store {
  state$ = new BehaviorSubject<State>(initialState);
  store$ = this.state$.asObservable().pipe(distinctUntilChanged());

  get stateValue(): State {
    return this.state$.getValue();
  }

  selectStateValue<T>(name: string): T {
    return this.state$.getValue()[name];
  }

  select<T>(name: string): Observable<T> {
    return this.store$.pipe(pluck(name));
  }

  set(name: string, state): void {
    console.groupCollapsed('[FLIGHT SEAT MAP][STORE]');

    // eslint-disable-next-line no-restricted-syntax
    console.info('Prev State', this.stateValue);

    const newState = { ...this.stateValue, [name]: state };

    // eslint-disable-next-line no-restricted-syntax
    console.info('Next State', newState);

    console.groupEnd();

    this.state$.next(newState);
  }
}
