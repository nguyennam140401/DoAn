import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Status, StatusColor } from "../common/enum";
import {
	AlertInterface,
	removeNotification,
} from "../features/application/applicationSlice";
import { useAppSelector } from "../hooks";
import { AppState } from "../store";

const Style = styled.div`
	position: fixed;
	bottom: 50px;
	left: 10px;
	z-index: 1000;
`;
type Props = {};

export default function Alert({}: Props) {
	const { notifications } = useAppSelector(
		(state: AppState) => state.application
	);
	return (
		<Style>
			{notifications?.length > 0 &&
				notifications.map((data: AlertInterface, idx) => (
					<AlertItem key={idx} data={data} />
				))}
		</Style>
	);
}

const AlertItem = ({ data }) => {
	const getColor = (status: Status) => {
		let x =
			status == Status.Success
				? StatusColor.Success
				: status == Status.Info
				? StatusColor.Info
				: status == Status.Warning
				? StatusColor.Warning
				: StatusColor.Danger;
		return x;
	};
	const dispatch = useDispatch();

	useEffect(() => {
		const timer = setTimeout(() => {
			dispatch(removeNotification(data));
		}, 2000);

		return () => clearTimeout(timer);
	}, [data, dispatch]);
	return (
		<div
			className={`flex bg-${getColor(
				data.status
			)}-200 rounded-lg p-4 mb-4 text-sm text-${getColor(data.status)}-600`}
			role="alert"
		>
			<svg
				className="w-5 h-5 inline mr-3"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					fill-rule="evenodd"
					d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
					clip-rule="evenodd"
				></path>
			</svg>
			<div>
				<span className="font-medium">{data.title} </span> {data.description}
				<button
					type="button"
					className="close"
					onClick={() => dispatch(removeNotification(data))}
				>
					<span>&times;</span>
				</button>
			</div>
		</div>
	);
};
