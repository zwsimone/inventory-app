import { NgModule } from "@angular/core";
import {
	canActivate,
	redirectLoggedInTo,
	redirectUnauthorizedTo,
} from "@angular/fire/auth-guard";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo([""]);
const redirectLoggedInToHome = () => redirectLoggedInTo(["item-list"]);

const routes: Routes = [
	{
		path: "",
		loadChildren: () =>
			import("./home/home.module").then((m) => m.HomePageModule),
		...canActivate(redirectLoggedInToHome),
	},
	{
		path: "item-list",
		loadChildren: () =>
			import("./page/item-list/item-list.module").then(
				(m) => m.ItemListPageModule
			),
		...canActivate(redirectUnauthorizedToLogin),
	},
	{
		path: "item-detail",
		loadChildren: () =>
			import("./page/item-detail/item-detail.module").then(
				(m) => m.ItemDetailPageModule
			),
		...canActivate(redirectUnauthorizedToLogin),
	},
	{
		path: "settings",
		loadChildren: () =>
			import("./page/settings/settings.module").then(
				(m) => m.SettingsPageModule
			),
		...canActivate(redirectUnauthorizedToLogin),
	},
	{
		path: "item-manager",
		loadChildren: () =>
			import("./page/item-manager/item-manager.module").then(
				(m) => m.ItemManagerPageModule
			),
		...canActivate(redirectUnauthorizedToLogin),
	},
	{
		path: "stock-summary",
		loadChildren: () =>
			import("./page/stock-summary/stock-summary.module").then(
				(m) => m.StockSummaryPageModule
			),
		...canActivate(redirectUnauthorizedToLogin),
	},
	{
		path: "stock-history",
		loadChildren: () =>
			import("./page/stock-history/stock-history.module").then(
				(m) => m.StockHistoryPageModule
			),
		...canActivate(redirectUnauthorizedToLogin),
	},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
