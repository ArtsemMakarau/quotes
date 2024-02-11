import { Action, State, StateContext } from '@ngxs/store';
import { QuotesHttpService } from '../services/quotes-http.service';
import { QuotesState } from './quotes.state';
import { Injectable } from '@angular/core';
import { AddRating, GetOfflineQuotes, GetQuote } from './quotes.actions';
import { Quote } from '../types/quote.type';
import { Observable, map, race, retry, tap } from 'rxjs';
import { QuoteResponseMapper } from '../helpers/quote-response-mapper';

const defaultState: QuotesState = {
  quotes: [],
  offlineQuotes: [
    {
      id: 'HTn2Q6e3AYr',
      quote: 'If you wish to be a writer, write.',
      author: 'Epictetus',
      rating: 5,
    },
    {
      id: 'nx2M9kL0EgcI',
      quote: 'Do good by stealth, and blush to find it fame.',
      author: 'Alexander Pope',
      rating: 5,
    },
    {
      id: 'Yg7xaxX5bj',
      quote:
        'Government of the people, by the people, for the people, shall not perish from the Earth.',
      author: 'Abraham Lincoln',
      rating: 4,
    },
    {
      id: '19XnsDE_kpQq',
      quote:
        'You cannot step twice into the same river, for other waters are continually flowing in.',
      author: 'Heraclitus',
      rating: 4,
    },
    {
      id: 'yIC09d9set',
      quote:
        'Every man is a damn fool for at least five minutes every day; wisdom consists in not exceeding the limit.',
      author: 'Elbert Hubbard',
      rating: 3,
    },
  ],
};

@State<QuotesState>({ name: 'quotes', defaults: defaultState })
@Injectable()
export class QuotesStateService {
  constructor(private readonly _httpService: QuotesHttpService) {}

  @Action(GetQuote)
  public getQuote(context: StateContext<QuotesState>): Observable<Quote> {
    return race(
      this._httpService.getQuoteFromQuotable(),
      this._httpService.getQuoteFromDummyJSON()
    ).pipe(
      map((quoteResponse) => QuoteResponseMapper(quoteResponse)),
      tap((quote) => {
        const quotes = context.getState().quotes;

        if (quotes.some(({ id }) => id === quote.id)) return;

        context.patchState({ quotes: [...context.getState().quotes, quote] });
      }),
      retry(3)
    );
  }

  @Action(GetOfflineQuotes)
  public getOfflineQuotes(context: StateContext<QuotesState>): void {
    context.patchState({ quotes: [...context.getState().offlineQuotes] });
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
