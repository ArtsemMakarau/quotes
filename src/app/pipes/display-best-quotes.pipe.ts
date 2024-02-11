import { Pipe, PipeTransform } from '@angular/core';
import { Quote } from '../types/quote.type';

@Pipe({
  name: 'displayBestQuotes',
})
export class DisplayBestQuotesPipe implements PipeTransform {
  public transform(quotes: Quote[]): Quote[] | null {
    const amountOfBestQuotes = 3;
    const quotesWithRating = quotes.filter(({ rating }) => rating);

    if (quotesWithRating.length < amountOfBestQuotes) {
      return null;
    }

    return quotesWithRating
      .sort((a, b) => b.rating - a.rating)
      .slice(0, amountOfBestQuotes);
  }
}
