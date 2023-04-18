import { TypeDiscountVoucherEnum } from "./enum";

export interface ResponseResult {
	error: Object;
	data: Object;
}

export interface TokenModel {
	token: String;
	expires: String;
}

export interface ResponseModel<T> {
	limit: number;
	page: number;
	results: Array<T>;
	totalPages: number;
	totalResults: number;
}

export interface DiscountVoucher {
	amount: number;
	endDate: Date;
	fromDate: Date;
	id: String;
	name: String;
	quantity: number;
	type: TypeDiscountVoucherEnum;
}

export interface Service {
	title: string;
	des: string;
	img: string;
}
