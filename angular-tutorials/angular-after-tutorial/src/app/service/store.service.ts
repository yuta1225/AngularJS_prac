import { Injectable } from '@angular/core';
import { BehaviorSubject, queueScheduler } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { State, initialState } from '../state';

@Injectable({ providedIn: 'root' })
export class Store {

  private _state$ = new BehaviorSubject<State>(initialState);

  update(fn: (state: State) => State) {
    const current = this._state$.value;
    queueScheduler.schedule(() => {
      this._state$.next(fn(current));
    });
  }

  select<T>(selector: (state: State) => T) {
    return this._state$.pipe(
      map(selector),
      distinctUntilChanged(),
    );
  }
}