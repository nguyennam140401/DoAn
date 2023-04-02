import TypeActions from "Redux/TypeActions";

export const getBrands = (query, callback) => {
	return {
		type: TypeActions.GET_BRANDS_REQUEST,
		query,
		callback,
	};
};

export const createBrand = (body, callback) => {
	return {
		type: TypeActions.CREATE_BRAND_REQUEST,
		body,
		callback,
	};
};

export const updateBrand = (params, body, callback) => {
	return {
		type: TypeActions.UPDATE_BRAND_REQUEST,
		params,
		body,
		callback,
	};
};

export const deleteBrand = (params, callback) => {
	return {
		type: TypeActions.DELETE_BRAND_REQUEST,
		params,
		callback,
	};
};
export default {
	getBrands,
	createBrand,
	deleteBrand,
	updateBrand,
};
