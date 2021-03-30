import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, pluck } from 'rxjs/operators';

import { Flights } from '@app/aircraft-seat-map/shared/models/flight';

export interface State {
  flights: Flights;
}

const initialState: State = {
  flights: undefined,
};

export class Store {
  private state$ = new BehaviorSubject<State>(initialState);
  private store$ = this.state$.asObservable().pipe(distinctUntilChanged());

  get value(): State {
    return this.state$.getValue();
  }

  /**
   * Set store with given name and state
   * @param name
   * @param state
   */
  set(name: keyof State, state: any): void {
    console.groupCollapsed(`[STORE][${name.toUpperCase()}]`);

    // eslint-disable-next-line no-restricted-syntax
    console.info('Prev State', this.value);

    const newState = { ...this.value, [name]: state };

    // eslint-disable-next-line no-restricted-syntax
    console.info('Next State', newState);

    console.groupEnd();

    this.state$.next(newState);
  }

  /**
   * Set store with given name, slice name and slice state
   * @param name
   * @param sliceName
   * @param sliceState
   */
  setSlice(name: keyof State, sliceName: string, sliceState: any): void {
    console.groupCollapsed(
      `[STORE][${name.toUpperCase()}][${sliceName.toUpperCase()}]`
    );

    // eslint-disable-next-line no-restricted-syntax
    console.info('Prev State', this.value);

    const newState = {
      ...this.value,
      [name]: {
        ...this.selectValue(name),
        [sliceName]: sliceState,
      },
    };

    // eslint-disable-next-line no-restricted-syntax
    console.info('Next State', newState);

    console.groupEnd();

    this.state$.next(newState);
  }

  /**
   * Select store value by name
   * @param name
   */
  selectValue(name: keyof State): any {
    return this.state$.getValue()[name];
  }

  /**
   * Select store by name
   * @param name
   */
  select(name: keyof State): Observable<any> {
    return this.store$.pipe(pluck(name));
  }
}
