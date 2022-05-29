import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { Item } from "src/app/model/item";
import { ItemsService } from "src/app/service/items.service";

@Component({
	selector: "app-item-detail",
	templateUrl: "./item-detail.page.html",
	styleUrls: ["./item-detail.page.scss"],
})
export class ItemDetailPage implements OnInit {
	item: Item;

	constructor(
		private router: Router,
		private alertController: AlertController,
		private itemsService: ItemsService
	) {
		this.item = router.getCurrentNavigation().extras.state.item;
	}

	ngOnInit() {}

	navigateBackToItemList() {
		this.router.navigateByUrl("item-list");
	}

	async inventory(mode: string) {
		const inventoryAlert = await this.alertController.create({
			header: "Inventory Form",
			inputs: [
				{
					type: "number",
					name: "quantity",
					placeholder: "Enter a number",
					min: 0,
				},
			],
			buttons: [
				{
					text: "Cancel",
					role: "cancel",
				},
				{
					text: "Confirm",
					handler: (input) => {
						if (mode === "in")
							this.item.quantity += +input.quantity;
						if (mode === "out")
							this.item.quantity -= +input.quantity;
						this.itemsService.updateItem(this.item);
					},
				},
			],
		});
		await inventoryAlert.present();
	}
}
