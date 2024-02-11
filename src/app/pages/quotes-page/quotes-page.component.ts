import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { GetQuote } from 'src/app/state/quotes.actions';
import { QuotesSelectors } from 'src/app/state/quotes.selectors';

@Component({
  selector: 'app-quotes-page',
  templateUrl: './quotes-page.component.html',
  styleUrls: ['./quotes-page.component.scss'],
})
export class QuotesPageComponent implements OnInit {
  public quotes$ = this._store.select(QuotesSelectors.quotes);

  constructor(private readonly _store: Store) {}

  public ngOnInit(): void {
    this._store.dispatch(new GetQuote());
  }
}
