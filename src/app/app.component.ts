import { Component } from "@angular/core";

@Component({
	selector: "app-root",
	templateUrl: "app.component.html",
	styleUrls: ["app.component.scss"],
})
export class AppComponent {
	public appPages = [
		{ title: "Item List", url: "/item-list" },
		{ title: "Daily Inventory Summary", url: "/stock-summary" },
		{ title: "Inventory History", url: "/stock-history" },
		{ title: "Settings", url: "/settings" },
	];

	constructor() {}
}
