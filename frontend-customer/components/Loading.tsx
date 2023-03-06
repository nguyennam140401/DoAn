import React from "react";
import styled from "styled-components";
type Props = {};

const Styled = styled.div`
	position: fixed;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.3);
	z-index: 10000;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	.custom-loader {
		width: 70px;
		height: 70px;
		display: grid;
		animation: s4 4s infinite;
	}
	.custom-loader::before,
	.custom-loader::after {
		content: "";
		grid-area: 1/1;
		border: 8px solid;
		border-radius: 50%;
		border-color: #766df4 #766df4 #0000 #0000;
		mix-blend-mode: darken;
		animation: s4 1s infinite linear;
	}
	.custom-loader::after {
		border-color: #0000 #0000 #e4e4ed #e4e4ed;
		animation-direction: reverse;
	}

	@keyframes s4 {
		100% {
			transform: rotate(1turn);
		}
	}
`;
export default function Loading({}: Props) {
	return (
		<Styled>
			<div className="custom-loader"></div>
		</Styled>
	);
}
