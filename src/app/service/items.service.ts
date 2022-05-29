import { Injectable } from "@angular/core";
import { collectionData, docData, Firestore } from "@angular/fire/firestore";
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	updateDoc,
} from "@firebase/firestore";
import { Observable } from "rxjs";
import { Item } from "../model/item";

@Injectable({
	providedIn: "root",
})
export class ItemsService {
	constructor(private firestore: Firestore) {}

	getItems(): Observable<Item[]> {
		const itemsRef = collection(this.firestore, "items");
		return collectionData(itemsRef, { idField: "id" }) as Observable<
			Item[]
		>;
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
