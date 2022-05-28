import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ItemManagerPageRoutingModule } from "./item-manager-routing.module";

import { ItemManagerPage } from "./item-manager.page";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ItemManagerPageRoutingModule,
		ReactiveFormsModule,
	],
	declarations: [ItemManagerPage],
})
export class ItemManagerPageModule {}
