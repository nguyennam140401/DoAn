import { EnumStatusOrder } from "../../common/enum";

export interface OrderModel {
	id?: string;
	status: EnumStatusOrder;
	userId: string;
	buyerName: string;
	address: string;
	note: string;
	phoneNumber: string;
	products: Array<ProductInOrder>;
}
export interface ProductInOrder {
	_id: string;
	productId: string;
	quantity: number;
	option?: object;
}
