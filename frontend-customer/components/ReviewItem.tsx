import React from "react";
import { ReviewItemList } from "../features/review/model";
import { Rating } from "react-simple-star-rating";

type Props = {
	data: ReviewItemList;
};

export default function ReviewItem({ data }: Props) {
	return (
		<div className="flex items-center mb-4">
			<div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0 mr-4"></div>
			<div>
				<div className="flex items-center mb-1">
					<div className="text-sm font-semibold">{data.userId.name}</div>
					<div className="ml-2 flex items-center gap-1">
						<Rating size={18} readonly initialValue={data.rating} />
					</div>
				</div>
				<div className="text-sm">{data.comment}</div>
			</div>
		</div>
	);
}
