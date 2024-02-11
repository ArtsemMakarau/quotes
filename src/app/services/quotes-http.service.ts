import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuotableResponse } from '../types/quotable-response.type';
import { DummyJsonResponse } from '../types/dummyjson-response.type';

@Injectable({
  providedIn: 'root',
})
export class QuotesHttpService {
  constructor(private readonly _http: HttpClient) {}

  public getQuoteFromQuotable(): Observable<QuotableResponse> {
    return this._http.get<QuotableResponse>('https://api.quotable.io/random');
  }

  public getQuoteFromDummyJSON(): Observable<DummyJsonResponse> {
    const maxQuotes = 1454;
    const minQuotes = 1;
    const randomValue = Math.floor(
      Math.random() * (maxQuotes - minQuotes) + minQuotes
    );

    return this._http.get<DummyJsonResponse>(
      `https://dummyjson.com/quotes/${randomValue}`
    );
  }
}
