import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { SettingsPageRoutingModule } from "./settings-routing.module";

import { SettingsPage } from "./settings.page";
import { ItemsService } from "src/app/service/items.service";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		SettingsPageRoutingModule,
	],
	declarations: [SettingsPage],
	providers: [ItemsService],
})
export class SettingsPageModule {}
