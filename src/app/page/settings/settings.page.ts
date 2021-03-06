import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { AuthService } from "src/app/service/auth.service";
import { version } from "version";

@Component({
	selector: "app-settings",
	templateUrl: "./settings.page.html",
	styleUrls: ["./settings.page.scss"],
})
export class SettingsPage implements OnInit {
	constructor(
		private alertController: AlertController,
		private router: Router,
		private authService: AuthService
	) {}

	ngOnInit() {}

	async aboutInfo() {
		const aboutAlert = await this.alertController.create({
			header: "About",
			message: `Wok Stock v${version}`,
			buttons: ["OK"],
		});
		await aboutAlert.present();
	}

	navigateToItemManager() {
		this.router.navigateByUrl("/item-manager", { replaceUrl: true });
	}

	async logout() {
		await this.authService.logout();
		this.router.navigateByUrl("/", { replaceUrl: true });
	}
}
