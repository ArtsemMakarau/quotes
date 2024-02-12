import { DummyJsonResponse } from '../types/dummyjson-response.type';
import { Quote } from '../types/quote.type';

export const DummyJsonResponseMapper = (
  quoteResponse: DummyJsonResponse
): Quote => {
  return {
    id: quoteResponse.id + '',
    quote: quoteResponse.quote,
    author: quoteResponse.author,
    rating: 0,
  };
};
