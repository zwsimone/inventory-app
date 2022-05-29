export interface Item {
	id?: string;
	name: string;
	quantity: number;
}

export interface ILog {
	id?: string;
	date: number;
	itemName: string;
	itemQty: number;
	itemTotal: number;
	mode: string;
}
