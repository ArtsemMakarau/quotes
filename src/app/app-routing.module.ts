import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuotesPageComponent } from './pages/quotes-page/quotes-page.component';

const routes: Routes = [
  {
    path: '',
    component: QuotesPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
