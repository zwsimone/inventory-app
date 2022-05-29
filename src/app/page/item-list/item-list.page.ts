import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";
import { Subscription } from "rxjs";
import { Item } from "src/app/model/item";
import { ItemsService } from "src/app/service/items.service";

@Component({
	selector: "app-item-list",
	templateUrl: "./item-list.page.html",
	styleUrls: ["./item-list.page.scss"],
})
export class ItemListPage implements OnInit {
	searchControl: FormControl;
	subscriptions: Subscription[];
	items: Item[];
	displayItems: Item[];

	constructor(
		private itemsService: ItemsService,
		private loadingController: LoadingController,
		private router: Router
	) {
		this.subscriptions = new Array<Subscription>();
		this.searchControl = new FormControl("");
	}

	async ngOnInit() {
		const itemsLoading = await this.loadingController.create();
		await itemsLoading.present();

		this.subscriptions.push(
			this.itemsService.getItems().subscribe(async (list) => {
				this.items = list;
				this.displayItems = this.items;
				await itemsLoading.dismiss();
			})
		);
		this.subscriptions.push(
			this.searchControl.valueChanges.subscribe((search: string) => {
				if (search) {
					this.displayItems = this.items.filter((item) =>
						item.name.toUpperCase().includes(search.toUpperCase())
					);
				} else {
					this.displayItems = this.items;
				}
			})
		);
	}

	navigateToItemDetails(item: Item) {
		this.router.navigateByUrl("item-detail", { replaceUrl: true });
	}
}
