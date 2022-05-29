import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ILog } from "src/app/model/item";
import { LogService } from "src/app/service/log.service";

@Component({
	selector: "app-stock-summary",
	templateUrl: "./stock-summary.page.html",
	styleUrls: ["./stock-summary.page.scss"],
})
export class StockSummaryPage implements OnInit, OnDestroy {
	private subscriptions: Subscription[];
	logs: ILog[];
	date: Date;

	constructor(private logService: LogService) {
		this.subscriptions = new Array<Subscription>();
	}

	ngOnInit() {
		this.date = new Date();
		this.subscriptions.push(
			this.logService
				.getLogsToday()
				.subscribe((list) => (this.logs = list))
		);
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach((subscription) =>
			subscription.unsubscribe()
		);
	}
}
