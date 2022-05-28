import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
	{
		path: "home",
		loadChildren: () =>
			import("./home/home.module").then((m) => m.HomePageModule),
	},
	{
		path: "",
		redirectTo: "home",
		pathMatch: "full",
	},
	{
		path: "item-list",
		loadChildren: () =>
			import("./page/item-list/item-list.module").then(
				(m) => m.ItemListPageModule
			),
	},
	{
		path: "item-detail",
		loadChildren: () =>
			import("./page/item-detail/item-detail.module").then(
				(m) => m.ItemDetailPageModule
			),
	},
	{
		path: "settings",
		loadChildren: () =>
			import("./page/settings/settings.module").then(
				(m) => m.SettingsPageModule
			),
	},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
