import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import {
	ActionSheetController,
	AlertController,
	LoadingController,
	ModalController,
} from "@ionic/angular";
import { ItemFormComponent } from "src/app/modal/item-form/item-form.component";
import { Item } from "src/app/model/item";
import { ItemsService } from "src/app/service/items.service";

@Component({
	selector: "app-item-manager",
	templateUrl: "./item-manager.page.html",
	styleUrls: ["./item-manager.page.scss"],
})
export class ItemManagerPage implements OnInit {
	items: Item[];
	displayItems: Item[];
	searchControl: FormControl;

	constructor(
		private itemsService: ItemsService,
		private router: Router,
		private actionSheetController: ActionSheetController,
		private modalController: ModalController,
		private alertController: AlertController,
		private loadingController: LoadingController
	) {
		this.searchControl = new FormControl("");
	}

	async ngOnInit() {
		const itemsLoading = await this.loadingController.create();
		await itemsLoading.present();

		this.itemsService.getItems().subscribe(async (list) => {
			this.items = list;
			this.displayItems = this.items;
			await itemsLoading.dismiss();
		});
		this.searchControl.valueChanges.subscribe((search: string) => {
			if (search) {
				this.displayItems = this.items.filter((item) =>
					item.name.toUpperCase().includes(search.toUpperCase())
				);
			} else {
				this.displayItems = this.items;
			}
		});
	}

	navigateBackToSettings() {
		this.router.navigateByUrl("/settings");
	}

	async itemOptions(item: Item) {
		const itemActionSheet = await this.actionSheetController.create({
			header: "Options",
			buttons: [
				{
					text: "Edit",
					icon: "create-outline",
					handler: () => {
						this.editItem(item);
					},
				},
				{
					text: "Delete",
					role: "destructive",
					icon: "trash",
					handler: () => {
						this.deleteItem(item);
					},
				},
				{
					text: "Cancel",
					role: "cancel",
				},
			],
		});
		await itemActionSheet.present();
	}

	async editItem(item: Item) {
		const editModal = await this.modalController.create({
			component: ItemFormComponent,
			componentProps: {
				item: item,
				mode: "update",
			},
		});
		await editModal.present();
	}

	async deleteItem(item: Item) {
		const deleteAlert = await this.alertController.create({
			header: "Delete Item",
			message: `Are you sure you want to delete ${item.name}?`,
			buttons: [
				{
					text: "Cancel",
					role: "cancek",
				},
				{
					text: "Confirm",
					handler: async () => {
						const loading = await this.loadingController.create();
						await loading.present();

						this.itemsService
							.deleteItem(item)
							.then(async () => await loading.dismiss());
					},
				},
			],
		});
		await deleteAlert.present();
	}

	async addItem() {
		const addItemModal = await this.modalController.create({
			component: ItemFormComponent,
			componentProps: {
				mode: "add",
			},
		});
		await addItemModal.present();
	}
}
