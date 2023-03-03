import React from "react";
import { ReviewItemList } from "../features/review/model";

type Props = {
	data: ReviewItemList;
};

export default function ReviewItem({ data }: Props) {
	return (
		<div className="flex items-center mb-4">
			<div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0 mr-4"></div>
			<div>
				<div className="flex items-center mb-1">
					<div className="text-sm font-semibold">{data.author}</div>
					<div className="ml-2">
						{[...Array(data.rating)].map((_, i) => (
							<p key={i}>✰</p>
						))}
					</div>
				</div>
				<div className="text-sm">{data.content}</div>
			</div>
		</div>
	);
}
