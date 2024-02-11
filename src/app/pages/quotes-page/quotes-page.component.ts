import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { GetQuote } from 'src/app/state/quotes.actions';
import { QuotesSelectors } from 'src/app/state/quotes.selectors';

@Component({
  selector: 'app-quotes-page',
  templateUrl: './quotes-page.component.html',
  styleUrls: ['./quotes-page.component.scss'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateY(50%)' }),
        animate('1s', style({ transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class QuotesPageComponent implements OnInit {
  public quotes$ = this._store.select(QuotesSelectors.quotes);

  constructor(private readonly _store: Store) {}

  public ngOnInit(): void {
    this._store.dispatch(new GetQuote());
  }
}
