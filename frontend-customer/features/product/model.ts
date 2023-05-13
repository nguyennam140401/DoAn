import { ReviewItemList } from "../review/model";

export interface ProductItemListModel {
	images: Array<string>;
	price: number;
	name: string;
	id: string;
	soldQuantity: number;
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
	soldQuantity?: number;
	specs?: Array<Spec>;
	review?: Array<ReviewItemList>;
}

export interface ProductItemOptions {
	name: string;
	price: number;
	inventory: number;
}

export interface Spec {
	name: string;
	unit: string;
	value: string;
}
