export const formatPrice = (value) => {
	let val = (value / 1).toFixed(0).replace(".", ",");
	return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export default {
	formatPrice,
};
