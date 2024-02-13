import { Component } from '@angular/core';
import { filter, fromEvent, map, merge, of, tap } from 'rxjs';

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
    tap(() => alert('No internet connection.'))
  );
}
