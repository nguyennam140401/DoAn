import React, { useState } from "react";
import PopUp from "./PopUp";
import { ProductItemDetailModel } from "../features/product/model";
import { API_URL_BASE, productPath } from "../constant/apiPath";
import { Rating } from "react-simple-star-rating";
import { axiosClient } from "../common/axiosClient";

type Props = {
	productData: ProductItemDetailModel;
	handleClose: Function;
	isOpen: Boolean;
};

const FormReviewProduct = (props: Props) => {
	//const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");

	const handleCommentChange = (event: any) => {
		setComment(event.target.value);
	};

	const handleSubmit = () => {
		//thực hiện submit ở đây
		const payload = {
			rating: rating,
			comment: comment,
		};
		//onSubmit({ rating, comment });
		axiosClient
			.post(productPath + "/" + props.productData.id + "/review", payload)
			.then((res) => {
				setRating(0);
				setComment("");
				props.handleClose();
			})
			.catch((err) => console.log(err));
	};

	const [rating, setRating] = useState(0);

	const handleRating = (rate: number) => {
		setRating(rate);
	};
	return (
		<PopUp isOpen={props.isOpen} onClose={props.handleClose}>
			<p className="mb-3 text-xl">Đánh giá sản phẩm</p>
			<div className="flex gap-3">
				<div className="mb-4">
					<img
						src={API_URL_BASE + "/" + props.productData.images[0]}
						alt={props.productData.name}
						className="h-24 w-24 object-contain"
					/>
				</div>
				<div className="mb-4">
					<h2 className="text-lg font-bold">{props.productData.name}</h2>
				</div>
			</div>
			<div className="mb-4">
				<label className="mr-2" htmlFor="rating">
					Đánh giá:
				</label>
				<Rating transition onClick={handleRating} />
			</div>
			<div className="mb-4">
				<label className="mr-2" htmlFor="comment">
					Để lại nhận xét:
				</label>
				<br />
				<textarea
					className="border mt-3 border-gray-400 rounded p-1 w-full"
					id="comment"
					name="comment"
					rows={5}
					value={comment}
					onChange={handleCommentChange}
				/>
			</div>
			<div>
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					type="submit"
					onClick={handleSubmit}
				>
					Đánh giá
				</button>
			</div>
		</PopUp>
	);
};

export default FormReviewProduct;
