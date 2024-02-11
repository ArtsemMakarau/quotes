import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subscription, filter, fromEvent, map, merge, of, tap } from 'rxjs';
import { GetOfflineQuotes } from './state/quotes.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private _networkStatus$: Subscription = Subscription.EMPTY;

  constructor(private readonly _store: Store) {}

  public ngOnInit(): void {
    this._checkNetworkStatus();
  }

  public ngOnDestroy(): void {
    this._networkStatus$.unsubscribe();
  }

  private _checkNetworkStatus() {
    this._networkStatus$ = merge(
      of(null),
      fromEvent(window, 'online'),
      fromEvent(window, 'offline')
    )
      .pipe(
        map(() => navigator.onLine),
        filter((isOnline) => !isOnline),
        tap(() => this._store.dispatch(new GetOfflineQuotes()))
      )
      .subscribe();
  }
}
