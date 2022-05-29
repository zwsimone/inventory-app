import { Injectable } from "@angular/core";
import { collectionData, Firestore } from "@angular/fire/firestore";
import { addDoc, collection } from "@firebase/firestore";
import { map, Observable } from "rxjs";
import { ILog, Item } from "../model/item";

@Injectable({
	providedIn: "root",
})
export class LogService {
	constructor(private firestore: Firestore) {}

	getAllLogHistory(): Observable<ILog[]> {
		const logRef = collection(this.firestore, "log");
		return collectionData(logRef, { idField: "id" }) as Observable<ILog[]>;
	}

	getLogHistoryOfItem(item: Item): Observable<ILog[]> {
		const logRef = collection(this.firestore, "log");
		return (
			collectionData(logRef, { idField: "id" }) as Observable<ILog[]>
		).pipe(
			map((logs: ILog[]) =>
				logs.filter((log: ILog) => log.itemName === item.name)
			)
		);
	}

	getLogsToday(): Observable<ILog[]> {
		const logRef = collection(this.firestore, "log");
		return (
			collectionData(logRef, { idField: "id" }) as Observable<ILog[]>
		).pipe(
			map((logs: ILog[]) =>
				logs.filter((log: ILog) => {
					const logDate = new Date(log.date);
					const currentDate = new Date();

					if (
						logDate.getMonth() === currentDate.getMonth() &&
						logDate.getDate() === currentDate.getDate()
					)
						return true;
					else return false;
				})
			),
			map((logs: ILog[]) =>
				logs.sort((log1, log2) => {
					if (log1.itemName > log2.itemName) return 1;
					if (log1.itemName < log2.itemName) return -1;
					return 0;
				})
			)
		);
	}

	addLog(log: ILog) {
		const logRef = collection(this.firestore, "log");
		return addDoc(logRef, log);
	}
}
