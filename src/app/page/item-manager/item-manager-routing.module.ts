import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemManagerPage } from './item-manager.page';

const routes: Routes = [
  {
    path: '',
    component: ItemManagerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemManagerPageRoutingModule {}
