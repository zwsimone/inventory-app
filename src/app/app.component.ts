import { Component } from "@angular/core";

@Component({
	selector: "app-root",
	templateUrl: "app.component.html",
	styleUrls: ["app.component.scss"],
})
export class AppComponent {
	public appPages = [
		{ title: "Item List", url: "/item-list" },
		{ title: "Settings", url: "/settings" },
	];

	constructor() {}
}
