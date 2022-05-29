import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ILog } from "src/app/model/item";
import { LogService } from "src/app/service/log.service";

@Component({
	selector: "app-stock-history",
	templateUrl: "./stock-history.page.html",
	styleUrls: ["./stock-history.page.scss"],
})
export class StockHistoryPage implements OnInit, OnDestroy {
	private subscriptions: Subscription[];
	logs: ILog[];

	constructor(private logService: LogService) {
		this.subscriptions = new Array<Subscription>();
		this.logs = new Array<ILog>();
	}

	ngOnInit() {
		this.subscriptions.push(
			this.logService.getAllLogHistory().subscribe(
				(list) =>
					(this.logs = list.sort((log1, log2) => {
						if (log2.date > log1.date) return 1;
						if (log2.date < log1.date) return -1;
						return 0;
					}))
			)
		);
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach((subscription) =>
			subscription.unsubscribe()
		);
	}
}
