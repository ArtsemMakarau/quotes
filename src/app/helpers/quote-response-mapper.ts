import { DummyJsonResponse } from '../types/dummyjson-response.type';
import { QuotableResponse } from '../types/quotable-response.type';
import { Quote } from '../types/quote.type';

export const QuoteResponseMapper = (
  quoteResponse: QuotableResponse | DummyJsonResponse
): Quote => {
  if ('id' in quoteResponse) {
    return {
      id: quoteResponse.id + '',
      quote: quoteResponse.quote,
      author: quoteResponse.author,
      rating: 0,
    };
  } else {
    return {
      id: quoteResponse._id,
      quote: quoteResponse.content,
      author: quoteResponse.author,
      rating: 0,
    };
  }
};
