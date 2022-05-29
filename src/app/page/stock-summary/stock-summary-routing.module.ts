import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StockSummaryPage } from './stock-summary.page';

const routes: Routes = [
  {
    path: '',
    component: StockSummaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockSummaryPageRoutingModule {}
