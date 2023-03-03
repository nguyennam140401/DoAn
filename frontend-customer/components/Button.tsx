import React, { ReactNode } from "react";

type Props = {
	children: ReactNode;
	props: any;
};

export default function Button({ children, ...props }: Props) {
	return (
		<button
			{...props}
			className="bg-blue-600 hover:bg-blue-700 rounded-lg px-8 py-2 text-gray-100 hover:shadow-xl transition duration-150 uppercase"
		>
			{children}
		</button>
	);
}
