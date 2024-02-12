import { TestBed } from '@angular/core/testing';
import { QuotesStateService } from './quotes.state.service';
import { HttpClientModule } from '@angular/common/http';
import { QuotesHttpService } from '../services/quotes-http.service';
import { NgxsModule, StateContext, Store } from '@ngxs/store';
import { QuotesState } from './quotes.state';
import { of } from 'rxjs';
import { GetQuote } from './quotes.actions';
import { Quote } from '../types/quote.type';

describe('QuotesStateService', () => {
  let service: QuotesStateService;
  let httpService: jasmine.SpyObj<QuotesHttpService>;
  let store: Store;

  beforeEach(() => {
    httpService = jasmine.createSpyObj('QuotesHttpService', [
      'getQuoteFromQuotable',
      'getQuoteFromDummyJSON',
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientModule, NgxsModule.forRoot([QuotesStateService])],
      providers: [{ provide: QuotesHttpService, useValue: httpService }],
    });

    store = TestBed.inject(Store);
    service = TestBed.inject(QuotesStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch a new quote and update state', (done) => {
    const mockQuotableResponse = {
      _id: 'HTn2Q6e3AYr',
      content: 'If you wish to be a writer, write.',
      author: 'Epictetus',
      tags: [''],
      authorSlug: '',
      length: 1,
      dateAdded: '',
      dateModified: '',
    };

    const mockDummyJsonResponse = {
      id: 1,
      quote: 'If you wish to be a writer, write.',
      author: 'Epictetus',
    };

    const mockMappedQuote = {
      id: 'HTn2Q6e3AYr',
      quote: 'If you wish to be a writer, write.',
      author: 'Epictetus',
      rating: 0,
    };

    httpService.getQuoteFromQuotable.and.returnValue(of(mockQuotableResponse));
    httpService.getQuoteFromDummyJSON.and.returnValue(
      of(mockDummyJsonResponse)
    );

    store.dispatch(new GetQuote());

    const initialState: QuotesState = {
      quotes: [],
    };

    const stateContextMock: StateContext<QuotesState> = {
      getState: () => initialState,
      patchState: jasmine.createSpy('patchState'),
      setState: jasmine.createSpy('setState'),
      dispatch: jasmine.createSpy('dispatch'),
    };

    service.getQuote(stateContextMock).subscribe((quote) => {
      expect(quote).toEqual(mockMappedQuote);
      expect(stateContextMock.patchState).toHaveBeenCalledWith({
        quotes: [mockMappedQuote],
      });

      done();
    });
  });

  it('should add rating to quote', () => {
    const initialState: QuotesState = {
      quotes: [
        { id: '1', quote: 'Quote 1', author: 'Author 1', rating: 0 },
        { id: '2', quote: 'Quote 2', author: 'Author 2', rating: 0 },
      ],
    };

    const quoteId = '1';
    const rating = 5;

    const expectedQuotes: Quote[] = [
      { id: '1', quote: 'Quote 1', author: 'Author 1', rating: 5 },
      { id: '2', quote: 'Quote 2', author: 'Author 2', rating: 0 },
    ];

    const stateContextMock: StateContext<QuotesState> = {
      getState: () => initialState,
      patchState: jasmine.createSpy('patchState'),
      setState: jasmine.createSpy('setState'),
      dispatch: jasmine.createSpy('dispatch'),
    };

    service.addRating(stateContextMock, {
      quoteId,
      rating,
    });

    expect(stateContextMock.patchState).toHaveBeenCalledWith({
      quotes: expectedQuotes,
    });
  });
});
