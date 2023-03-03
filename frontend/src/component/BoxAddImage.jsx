import { Cancel } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import styled from "styled-components";

const Styled = styled.div`
	position: relative;
	img {
		width: 120px;
		height: 120px;
		object-fit: cover;
	}
	.boxAdd {
		border: 1px dashed #000;
		cursor: pointer;
		display: inline-block;
		border-radius: 10px;
		width: 120px;
		height: 120px;
		position: relative;
		&::before {
			content: "";
			position: absolute;
			border-top: 1px dashed #000; /* Tạo đường viền nét đứt trên */
			width: 30px; /* Chiều rộng của đường viền */
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
		}
		&::after {
			content: "";
			position: absolute;
			border-left: 1px dashed #000; /* Tạo đường viền nét đứt trên */
			height: 30px; /* Chiều rộng của đường viền */
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
	.remove {
		position: absolute;
		top: 0;
		right: 0;
	}
`;
const BoxAddImage = ({ image, src, handleRemove, ...props }) => {
	return (
		<Styled>
			{src ? (
				<>
					<img {...props} src={src} alt="ảnh sản phẩm" />
					{handleRemove && (
						<IconButton className="remove" onClick={handleRemove}>
							<Cancel></Cancel>
						</IconButton>
					)}
				</>
			) : (
				<div className="boxAdd" {...props}></div>
			)}
		</Styled>
	);
};

export default BoxAddImage;
