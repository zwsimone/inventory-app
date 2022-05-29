import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ItemListPageRoutingModule } from "./item-list-routing.module";

import { ItemListPage } from "./item-list.page";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ItemListPageRoutingModule,
		ReactiveFormsModule,
	],
	declarations: [ItemListPage],
})
export class ItemListPageModule {}
