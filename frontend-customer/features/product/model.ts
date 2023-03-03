export interface ProductItemListModel {
	images: Array<string>;
	price: number;
	name: string;
	id: string;
	review: string;
}

export interface ProductItemDetailModel {
	id: string;
	name: string;
	description: string;
	price: number;
	images: Array<string>;
}
