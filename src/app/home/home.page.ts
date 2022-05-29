import { Component } from "@angular/core";
import {
	AbstractControl,
	FormBuilder,
	FormGroup,
	Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AlertController, LoadingController } from "@ionic/angular";
import { AuthService } from "../service/auth.service";

@Component({
	selector: "app-home",
	templateUrl: "home.page.html",
	styleUrls: ["home.page.scss"],
})
export class HomePage {
	credentials: FormGroup;

	constructor(
		private fb: FormBuilder,
		private alertController: AlertController,
		private loadingController: LoadingController,
		private authService: AuthService,
		private router: Router
	) {}

	get email(): AbstractControl {
		return this.credentials.get("email");
	}

	get password(): AbstractControl {
		return this.credentials.get("password");
	}

	ngOnInit() {
		this.credentials = this.fb.group({
			email: ["", [Validators.required, Validators.email]],
			password: ["", [Validators.required]],
		});
	}

	async login() {
		const loading = await this.loadingController.create();
		await loading.present();

		const user = await this.authService.login(this.credentials.value);
		await loading.dismiss();

		if (user) {
			this.router.navigateByUrl("/item-list", { replaceUrl: true });
		} else {
			this.showAlert("Login failed", "Please try again");
		}
	}

	async showAlert(header, message) {
		const alert = await this.alertController.create({
			header,
			message,
			buttons: ["OK"],
		});
		await alert.present();
	}
}
