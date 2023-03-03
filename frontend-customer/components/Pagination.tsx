import Link from "next/link";
import React from "react";

type Props = {};

export default function Pagination({}: Props) {
	return (
		<div className="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
			<nav>
				<ul className="flex">
					<li>
						<Link
							className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
							href="#"
							aria-label="Previous"
						>
							<span className="material-icons text-sm">
								keyboard_arrow_left
							</span>
						</Link>
					</li>
					<li>
						<Link
							className="mx-1 flex h-9 w-9 items-center justify-center rounded-full bg-pink-500 p-0 text-sm text-white shadow-md transition duration-150 ease-in-out"
							href="#"
						>
							1
						</Link>
					</li>
					<li>
						<Link
							className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
							href="#"
						>
							2
						</Link>
					</li>
					<li>
						<Link
							className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
							href="#"
						>
							3
						</Link>
					</li>
					<li>
						<Link
							className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
							href="#"
							aria-label="Next"
						>
							<span className="material-icons text-sm">
								keyboard_arrow_right
							</span>
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
}
