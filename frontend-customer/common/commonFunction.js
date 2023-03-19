export const formatPrice = (value) => {
	let val = (value / 1).toFixed(0).replace(".", ",");
	return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const isExpired = (token) => {
	// lấy thông tin về thời gian hết hạn từ token
	const timeExpired = new Date(token.expires);
	// chuyển đổi thời gian hết hạn thành đối tượng Date

	// kiểm tra xem thời gian hết hạn có trước thời gian hiện tại hay không
	return timeExpired < new Date();
};
export default {
	formatPrice,
	isExpired,
};
