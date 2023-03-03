import { saveAs } from "file-saver";
import {
	BorderStyle,
	Document,
	HeightRule,
	ImageRun,
	Packer,
	Paragraph,
	Table,
	TableCell,
	TableRow,
	WidthType,
} from "docx";
import JsBarcode from "jsbarcode";
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
 * Hàm cho phép thực hiện tạo tem phiếu
 * @param {obj|array} data truyen du lieu muon in tem phieu
 *
 *
 */
export const generateDocxBarcode = async (data, nameFile) => {
	let arrData = [];
	arrData = Array.isArray(data) ? [...arrData, ...data] : [...arrData, data];
	arrData.map((item, idx) => {
		let canvas = document.createElement("canvas");
		canvas.setAttribute("id", "barcode-" + idx);
		canvas.setAttribute("hidden", "true");
		document.body.append(canvas);
		JsBarcode(`#barcode-${idx}`, item.barcode, {
			width: 2,
			height: 40,
			displayValue: true,
		});
	});
	const doc = new Document({
		sections: [
			{
				children: arrData
					.map((item, idx) => {
						const b64 = document
							.querySelector(`#barcode-${idx}`)
							.toDataURL()
							.split(",")[1];
						return [
							new Paragraph({
								children: [
									new ImageRun({
										data: Uint8Array.from(atob(b64), (c) => c.charCodeAt(0)),
										transformation: {
											width: 157.48031496,
											height: 62,
										},
									}),
								],
							}),
						].concat([
							new Table({
								rows: [
									new TableRow({
										height: { value: 200, rule: HeightRule },
										children: [
											new TableCell({
												children: [new Paragraph("DA")],
												width: { size: 600, type: WidthType },
											}),
											new TableCell({
												children: [],
												width: { size: 600, type: WidthType },
											}),
											new TableCell({
												children: [new Paragraph("NG")],
												width: { size: 600, type: WidthType },
											}),
											new TableCell({
												children: [],
												width: { size: 600, type: WidthType },
											}),
										],
									}),
									new TableRow({
										children: [
											new TableCell({
												children: [new Paragraph("VA")],
											}),
											new TableCell({
												children: [],
											}),
											new TableCell({
												children: [new Paragraph("EO")],
											}),
											new TableCell({
												children: [],
											}),
										],
									}),
									new TableRow({
										children: [
											new TableCell({
												children: [new Paragraph("DT")],
											}),
											new TableCell({
												children: [],
											}),
											new TableCell({
												children: [new Paragraph("MO")],
											}),
											new TableCell({
												children: [],
											}),
										],
									}),
									new TableRow({
										children: [
											new TableCell({
												children: [new Paragraph("BT")],
											}),
											new TableCell({
												children: [],
											}),
											new TableCell({
												children: [new Paragraph("HG")],
											}),
											new TableCell({
												children: [],
											}),
										],
									}),
								],
								width: {
									size: 157.48031496,
								},
							}),
							new Paragraph(" "),
							new Paragraph(" "),
						]);
					})
					.reduce((pre, current) => pre.concat(current), []),
			},
		],
	});

	//Lưu file docx
	Packer.toBlob(doc).then((blob) => {
		saveAs(blob, `${nameFile || "document"}.docx`);
	});
};

export const generateDocxBarcodeForCustomer = async (data, nameFile) => {
	let arrData = [];
	arrData = Array.isArray(data) ? [...arrData, ...data] : [...arrData, data];

	arrData.map((item, idx) => {
		let canvas = document.createElement("canvas");
		canvas.setAttribute("id", "barcode-" + idx);
		canvas.setAttribute("hidden", "true");
		document.body.append(canvas);
		JsBarcode(`#barcode-${idx}`, item.barcode, {
			width: 2,
			height: 40,
			displayValue: true,
		});
	});
	const doc = new Document({
		sections: [
			{
				children: arrData
					.map((item, idx) => {
						const b64 = document
							.querySelector(`#barcode-${idx}`)
							.toDataURL()
							.split(",")[1];

						return [
							new Paragraph({
								children: [
									new ImageRun({
										data: Uint8Array.from(atob(b64), (c) => c.charCodeAt(0)),
										transformation: {
											width: 132.27,
											height: 42.8,
										},
									}),
								],
							}),
							new Paragraph({
								text: item?.customerName || "Không rõ",
								width: 132.27,
							}),
							new Paragraph({
								text: item?.customerOrgId.name || "Không rõ",
								width: 132.27,
							}),
							new Paragraph({
								text:
									item?.customerOrgId?.provinceId?.provinceName || "Không rõ",
								width: 132.27,
							}),
						].concat([
							new Table({
								rows: [
									new TableRow({
										children: [
											new TableCell({
												children: [new Paragraph("DA")],
												width: { size: 500, type: WidthType },
											}),
											new TableCell({
												children: [
													new Paragraph(
														item?.sizes
															?.find(
																(x) => x.productParameterId.code === "Daisomi"
															)
															?.size.toString() || "00"
													),
												],
												width: { size: 500, type: WidthType },
											}),
											new TableCell({
												children: [new Paragraph("NG")],
												width: { size: 500, type: WidthType },
											}),
											new TableCell({
												children: [
													new Paragraph(
														item?.sizes
															?.find((x) => x.productParameterId.code === "NG")
															?.size.toString() || "00"
													),
												],
												width: { size: 500, type: WidthType },
											}),
										],
									}),
									new TableRow({
										children: [
											new TableCell({
												children: [new Paragraph("VA")],
											}),
											new TableCell({
												children: [
													new Paragraph(
														item?.sizes
															?.find((x) => x.productParameterId.code === "VA")
															?.size.toString() || "00"
													),
												],
											}),
											new TableCell({
												children: [new Paragraph("EO")],
											}),
											new TableCell({
												children: [
													new Paragraph(
														item?.sizes
															?.find(
																(x) => x.productParameterId.code === "Vongeo"
															)
															?.size.toString() || "00"
													),
												],
											}),
										],
									}),
									new TableRow({
										children: [
											new TableCell({
												children: [new Paragraph("DT")],
											}),
											new TableCell({
												children: [
													new Paragraph(
														item?.sizes
															?.find(
																(x) =>
																	x.productParameterId.code === "Daitaysomi"
															)
															?.size.toString() || "00"
													),
												],
											}),
											new TableCell({
												children: [new Paragraph("MO")],
											}),
											new TableCell({
												children: [
													new Paragraph(
														item?.sizes
															?.find((x) => x.productParameterId.code === "MO")
															?.size.toString() || "00"
													),
												],
											}),
										],
									}),
									new TableRow({
										children: [
											new TableCell({
												children: [new Paragraph("BT")],
											}),
											new TableCell({
												children: [
													new Paragraph(
														item?.sizes
															?.find(
																(x) => x.productParameterId.code === "Baptay"
															)
															?.size.toString() || "00"
													),
												],
											}),
											new TableCell({
												children: [new Paragraph("HG")],
											}),
											new TableCell({
												children: [
													new Paragraph(
														item?.sizes
															?.find(
																(x) => x.productParameterId.code === "VongHong"
															)
															?.size.toString() || "00"
													),
												],
											}),
										],
									}),
								],
								width: {
									size: 132.27,
								},
							}),
							new Paragraph(" "),
							new Paragraph(" "),
						]);
					})
					.reduce((pre, current) => pre.concat(current), []),
			},
		],
	});

	//Lưu file docx
	Packer.toBlob(doc).then((blob) => {
		saveAs(blob, `${nameFile || "document"}.docx`);
	});
};
/**
 *
 * @param {obj} currentAccount account
 * @param {array} prop list role want to check
 * @returns true if account have some role in array
 */
export const checkRole = (currentAccount, prop) => {
	// console.log(currentAccount, prop);
	// let validRole = false;
	// const validPropRoles =
	// 	_.get(prop, "roles", undefined) !== undefined && Array.isArray(prop.roles);
	// currentAccount.role.permission.every((item) => {
	// 	if (
	// 		validPropRoles &&
	// 		(prop.roles.indexOf(item) !== -1 || _.isEmpty(prop.roles))
	// 	) {
	// 		validRole = true;
	// 		return false;
	// 	}
	// 	return true;
	// });
	//return validRole;
	return true;
};

export const currencyFormat = (num) => {
	return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export const removeEmpty = (obj) => {
	return Object.fromEntries(
		Object.entries(obj).filter(([_, v]) => v != null && v !== "")
	);
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

export const debounce = (fn, delay) => {
	let timer;
	return (() => {
		clearTimeout(timer);
		timer = setTimeout(() => fn(), delay);
	})();
};
