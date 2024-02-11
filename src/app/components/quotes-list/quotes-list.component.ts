import { Component, Input } from '@angular/core';
import { Quote } from 'src/app/types/quote.type';

@Component({
  selector: 'app-quotes-list',
  templateUrl: './quotes-list.component.html',
  styleUrls: ['./quotes-list.component.scss'],
})
export class QuotesListComponent {
  @Input() public quotes!: Quote[];
}
