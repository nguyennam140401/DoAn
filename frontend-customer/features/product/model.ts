export interface ProductItemListModel {
	images: Array<string>;
	price: number;
	name: string;
	id: string;
	review: Array<any>;
	options: Array<ProductItemOptions>;
}

export interface ProductItemDetailModel {
	id: string;
	name: string;
	description: string;
	price: number;
	images: Array<string>;
	options: Array<ProductItemOptions>;
	inventory: number;
}

export interface ProductItemOptions {
	name: string;
	price: number;
	inventory: number;
}
