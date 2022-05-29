import { Injectable } from "@angular/core";
import { collectionData, docData, Firestore } from "@angular/fire/firestore";
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	updateDoc,
} from "@firebase/firestore";
import { map, Observable } from "rxjs";
import { Item } from "../model/item";

@Injectable({
	providedIn: "root",
})
export class ItemsService {
	constructor(private firestore: Firestore) {}

	getItems(): Observable<Item[]> {
		const itemsRef = collection(this.firestore, "items");
		return (
			collectionData(itemsRef, { idField: "id" }) as Observable<Item[]>
		).pipe(
			map((items: Item[]) =>
				items.sort((item1, item2) => {
					if (item1.name > item2.name) return 1;
					if (item1.name < item2.name) return -1;
					return 0;
				})
			)
		);
	}

	getItem(id: string): Observable<Item> {
		const itemDocRef = doc(this.firestore, `items/${id}`);
		return docData(itemDocRef, { idField: "id" }) as Observable<Item>;
	}

	addItem(item: Item) {
		const itemsRef = collection(this.firestore, "items");
		return addDoc(itemsRef, item);
	}

	deleteItem(item: Item) {
		const itemDocRef = doc(this.firestore, `items/${item.id}`);
		return deleteDoc(itemDocRef);
	}

	updateItem(item: Item) {
		const itemDocRef = doc(this.firestore, `items/${item.id}`);
		return updateDoc(itemDocRef, {
			name: item.name,
			quantity: item.quantity,
		});
	}
}
