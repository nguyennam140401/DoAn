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
