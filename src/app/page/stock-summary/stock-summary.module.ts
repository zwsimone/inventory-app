import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StockSummaryPageRoutingModule } from './stock-summary-routing.module';

import { StockSummaryPage } from './stock-summary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StockSummaryPageRoutingModule
  ],
  declarations: [StockSummaryPage]
})
export class StockSummaryPageModule {}
