import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, pluck } from 'rxjs/operators';

import { FlightDetails } from '@app/aircraft-seat-map/shared/models/flight-details';

export interface State {
  flightsDetails: FlightDetails[];
}

const initialState: State = {
  flightsDetails: undefined,
};

export class Store {
  state$ = new BehaviorSubject<State>(initialState);
  store$ = this.state$.asObservable().pipe(distinctUntilChanged());

  get state(): State {
    return this.state$.getValue();
  }

  select<T>(name: string): Observable<T> {
    return this.store$.pipe(pluck(name));
  }

  set<T>(name: string, state: T): void {
    this.state$.next({ ...this.state, [name]: state });
  }
}
