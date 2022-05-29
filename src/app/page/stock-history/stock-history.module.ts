import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StockHistoryPageRoutingModule } from './stock-history-routing.module';

import { StockHistoryPage } from './stock-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StockHistoryPageRoutingModule
  ],
  declarations: [StockHistoryPage]
})
export class StockHistoryPageModule {}
