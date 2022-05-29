import { Component, Input, OnInit } from "@angular/core";
import {
	AbstractControl,
	FormBuilder,
	FormGroup,
	Validators,
} from "@angular/forms";
import { AlertController, ModalController } from "@ionic/angular";
import { Item } from "src/app/model/item";
import { ItemsService } from "src/app/service/items.service";

@Component({
	selector: "app-item-form",
	templateUrl: "./item-form.component.html",
	styleUrls: ["./item-form.component.scss"],
})
export class ItemFormComponent implements OnInit {
	@Input() item: Item;
	@Input() mode: string;

	form: FormGroup;

	constructor(
		private itemsService: ItemsService,
		private modalController: ModalController,
		private formBuilder: FormBuilder,
		private alertController: AlertController
	) {}

	get itemName(): AbstractControl {
		return this.form.get("itemName");
	}

	get itemQuantity(): AbstractControl {
		return this.form.get("itemQuantity");
	}

	get itemBarcode(): AbstractControl {
		return this.form.get("itemBarcode");
	}

	ngOnInit() {
		if (this.item === undefined) {
			this.item = this.defaultItem();
		}

		this.form = this.formBuilder.group({
			itemName: ["", [Validators.required]],
			itemQuantity: ["", [Validators.required, Validators.min(0)]],
			itemBarcode: [""],
		});

		if (this.mode === "update") {
			this.itemName.setValue(this.item.name);
			this.itemQuantity.setValue(this.item.quantity);
		}
	}

	defaultItem(): Item {
		return {
			name: "",
			quantity: 0,
		};
	}

	async submitForm() {
		const details: Item = {
			name: this.itemName.value,
			quantity: this.itemQuantity.value,
		};
		if (this.mode === "update") {
			details.id = this.item.id;
			this.itemsService.updateItem(details);
		}
		if (this.mode === "add") this.itemsService.addItem(details);

		this.clearForm();
		this.dismiss();

		const message =
			this.mode === "update" ? "Item updated!" : "Item added!";

		const submitAlert = await this.alertController.create({
			header: "Item Submission",
			message: message,
			buttons: ["OK"],
		});
		await submitAlert.present();
	}

	clearForm() {
		this.form.reset();
	}

	dismiss() {
		this.modalController.dismiss();
	}
}
