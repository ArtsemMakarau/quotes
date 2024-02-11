import { Selector } from '@ngxs/store';
import { QuotesStateService } from './quotes.state.service';
import { QuotesState } from './quotes.state';
import { Quote } from '../types/quote.type';

export class QuotesSelectors {
  @Selector([QuotesStateService])
  public static quotes(state: QuotesState): Quote[] {
    return state.quotes;
  }
}
