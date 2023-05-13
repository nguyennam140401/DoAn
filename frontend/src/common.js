import _ from "lodash";
export const emailRegex =
	/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<canvas>()[\]\.,;:\s@\"]{2,})$/i;
export const notify = (notificationAlertRef, type, title, message) => {
	let options = {
		place: "tc",
		message: (
			<div className="alert-text">
				<span className="alert-title" data-notify="title">
					{title}
				</span>
				<span data-notify="message">{message}</span>
			</div>
		),
		type: type,
		icon: "ni ni-bell-55",
		autoDismiss: 7,
	};
	notificationAlertRef.current.notificationAlert(options);
};
/**
 *
 * @param {obj} currentAccount account
 * @param {array} prop list role want to check
 * @returns true if account have some role in array
 */
export const checkRole = (prop) => {
	const currentAccount = JSON.parse(localStorage.getItem("user"));
	if (!currentAccount) return false;
	if (localStorage.getItem("role") === "admin") return true;
	if (!prop.role) return true;
	return (
		currentAccount.roleId.permission.findIndex((item) => item === prop.role) !==
		-1
	);
};

export const currencyFormat = (num) => {
	return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export const removeEmpty = (obj) => {
	return Object.fromEntries(
		Object.entries(obj).filter(([_, v]) => v != null && v !== "")
	);
};

export const debounce = (fn, delay) => {
	let timer;
	return (() => {
		clearTimeout(timer);
		timer = setTimeout(() => fn(), delay);
	})();
};

export const getBase64 = (file, cb) => {
	let reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = function () {
		cb(reader.result);
	};
	reader.onerror = function (error) {
		console.log("Error: ", error);
	};
};

export const formatDate = (value) => {
	var date = new Date(value);
	const day = date.getDate().toString().padStart(2, "0"); // lấy ngày, thêm số 0 đằng trước nếu chỉ có 1 chữ số
	const month = (date.getMonth() + 1).toString().padStart(2, "0"); // lấy tháng (đánh số từ 0 đến 11), cộng thêm 1, thêm số 0 đằng trước nếu chỉ có 1 chữ số
	const year = date.getFullYear(); // lấy năm
	const formattedDate = `${day}/${month}/${year}`; // tạo chuỗi ngày tháng năm định dạng "dd/mm/yyyy"
	return formattedDate;
};

export const formatPrice = (value) => {
	if (!value) return 0;
	let val = (value / 1).toFixed(0).replace(".", ",");
	if (val < 0) val = 0;
	return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
