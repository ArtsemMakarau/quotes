import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { filter, fromEvent, map, merge, of, tap } from 'rxjs';
import { GetOfflineQuotes } from './state/quotes.actions';
import { Quote } from './types/quote.type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public networkStatus$ = merge(
    of(null),
    fromEvent(window, 'online'),
    fromEvent(window, 'offline')
  ).pipe(
    map(() => navigator.onLine),
    filter((isOnline) => !isOnline),
    tap(() => this._store.dispatch(new GetOfflineQuotes()))
  );

  constructor(private readonly _store: Store) {}
}
