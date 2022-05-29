import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";
import { ItemFormComponent } from "./item-form/item-form.component";
import { ItemsService } from "../service/items.service";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule.forRoot(),
		ReactiveFormsModule,
	],
	declarations: [ItemFormComponent],
	providers: [],
	exports: [ItemFormComponent],
})
export class ModalModule {}
