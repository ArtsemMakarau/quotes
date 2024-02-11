import { Quote } from '../types/quote.type';

export type QuotesState = {
  quotes: Quote[];
  offlineQuotes: Quote[];
};
