import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { Subscription } from "rxjs";
import { ILog, Item } from "src/app/model/item";
import { ItemsService } from "src/app/service/items.service";
import { LogService } from "src/app/service/log.service";

@Component({
	selector: "app-item-detail",
	templateUrl: "./item-detail.page.html",
	styleUrls: ["./item-detail.page.scss"],
})
export class ItemDetailPage implements OnInit, OnDestroy {
	item: Item;
	logs: ILog[];

	subscriptions: Subscription[];

	constructor(
		private router: Router,
		private alertController: AlertController,
		private itemsService: ItemsService,
		private logService: LogService
	) {
		this.item = router.getCurrentNavigation().extras.state.item;
		this.logs = new Array<ILog>();
		this.subscriptions = new Array<Subscription>();
	}

	ngOnInit() {
		this.subscriptions.push(
			this.logService.getLogHistoryOfItem(this.item).subscribe(
				(list) =>
					(this.logs = list.sort((log1, log2) => {
						if (log2.date > log1.date) return 1;
						if (log2.date < log1.date) return -1;
						else return 0;
					}))
			)
		);
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach((subscription) =>
			subscription.unsubscribe()
		);
	}

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
						const log: ILog = {
							date: Date.now(),
							itemName: this.item.name,
							itemQty: +input.quantity,
							itemTotal: this.item.quantity,
							mode: mode,
						};
						this.logService.addLog(log);
					},
				},
			],
		});
		await inventoryAlert.present();
	}
}
