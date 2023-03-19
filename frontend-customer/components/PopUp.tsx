import React, { useState } from "react";

type Props = {
	isOpen: Boolean;
	onClose: Function;
	children: React.ReactNode;
};

export default function PopUp({ isOpen, onClose, children }: Props) {
	const [isPopupOpen, setIsPopupOpen] = useState(isOpen);

	const handlePopupClose = () => {
		setIsPopupOpen(false);
		onClose();
	};
	return (
		<>
			{isPopupOpen && (
				<div className="fixed inset-0 z-10 overflow-y-auto">
					<div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
						<div
							className="fixed inset-0 transition-opacity"
							aria-hidden="true"
							onClick={handlePopupClose}
						>
							<div className="absolute inset-0 bg-gray-500 opacity-75"></div>
						</div>
						<span
							className="hidden sm:inline-block sm:align-middle sm:h-screen"
							aria-hidden="true"
						></span>
						<div
							className="inline-block align-bottom bg-white rounded-lg px-4 py-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
							role="dialog"
							aria-modal="true"
							aria-labelledby="modal-headline"
						>
							{children}
							<div className="mt-4">
								<button
									type="button"
									className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
									onClick={handlePopupClose}
								>
									Đóng
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
