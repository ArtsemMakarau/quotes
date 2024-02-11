import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuotesPageComponent } from './pages/quotes-page/quotes-page.component';
import { CarouselComponent } from './containers/carousel/carousel.component';
import { RatingStarComponent } from './components/rating-star/rating-star.component';
import { provideHttpClient } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { QuotesStateService } from './state/quotes.state.service';
import { QuotesListComponent } from './components/quotes-list/quotes-list.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { DisplayBestQuotesPipe } from './pipes/display-best-quotes.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    QuotesPageComponent,
    CarouselComponent,
    RatingStarComponent,
    QuotesListComponent,
    DisplayBestQuotesPipe,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    NgxsModule.forRoot([QuotesStateService]),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
