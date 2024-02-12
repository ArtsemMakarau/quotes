import { Action, State, StateContext } from '@ngxs/store';
import { QuotesHttpService } from '../services/quotes-http.service';
import { QuotesState } from './quotes.state';
import { Injectable } from '@angular/core';
import { AddRating, GetOfflineQuotes, GetQuote } from './quotes.actions';
import { Quote } from '../types/quote.type';
import { Observable, map, race, retry, tap } from 'rxjs';
import { QuotableResponseMapper } from '../helpers/quotable-response-mapper';
import { DummyJsonResponseMapper } from '../helpers/dummyjson-response-mapper';

const defaultState: QuotesState = {
  quotes: [],
};

@State<QuotesState>({ name: 'quotes', defaults: defaultState })
@Injectable()
export class QuotesStateService {
  constructor(private readonly _httpService: QuotesHttpService) {}

  @Action(GetQuote)
  public getQuote(context: StateContext<QuotesState>): Observable<Quote> {
    return race(
      this._httpService
        .getQuoteFromQuotable()
        .pipe(
          map((quotableResponse) => QuotableResponseMapper(quotableResponse))
        ),
      this._httpService
        .getQuoteFromDummyJSON()
        .pipe(
          map((dummyJsonResponse) => DummyJsonResponseMapper(dummyJsonResponse))
        )
    ).pipe(
      tap((quote) => {
        const quotes = context.getState().quotes;
        const updatedQuotes = [...context.getState().quotes, quote];

        if (quotes.some(({ id }) => id === quote.id)) return;

        context.patchState({ quotes: updatedQuotes });

        localStorage.setItem('quotes', JSON.stringify(updatedQuotes));
      }),
      retry(3)
    );
  }

  @Action(GetOfflineQuotes)
  public getOfflineQuotes(context: StateContext<QuotesState>): void {
    const offlineQuotes: Quote[] = JSON.parse(
      localStorage.getItem('quotes') || ''
    );

    context.patchState({ quotes: offlineQuotes || [] });
  }

  @Action(AddRating)
  public addRating(
    context: StateContext<QuotesState>,
    { quoteId, rating }: AddRating
  ): void {
    const quotes = [...context.getState().quotes];

    const updatedQuotes = quotes.map((quote) => {
      if (quote.id !== quoteId) return quote;

      return {
        ...quote,
        rating,
      };
    });

    context.patchState({ quotes: updatedQuotes });
  }
}
