import { QuotableResponse } from '../types/quotable-response.type';
import { Quote } from '../types/quote.type';

export const QuotableResponseMapper = (
  quoteResponse: QuotableResponse
): Quote => {
  return {
    id: quoteResponse._id,
    quote: quoteResponse.content,
    author: quoteResponse.author,
    rating: 0,
  };
};
