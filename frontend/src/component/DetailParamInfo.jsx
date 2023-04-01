import { Box, IconButton, TextField } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
const DetailParamInfo = ({
	optionsData,
	idx,
	setFieldValue,
	fieldSet = "options",
	isSetValueProduct,
	isView = false,
}) => {
	return (
		<>
			<Box mb={2} display={"flex"} gap={2}>
				<Box>
					{isSetValueProduct ? (
						<TextField
							variant="outlined"
							disabled={isView}
							label={optionsData[idx].name}
							value={optionsData[idx].value}
							onChange={(e) => {
								setFieldValue(fieldSet, [
									...optionsData.slice(0, idx),
									{ ...optionsData[idx], value: e.target.value },
									...optionsData.slice(idx + 1),
								]);
							}}
						></TextField>
					) : (
						<TextField
							variant="outlined"
							label="Tên thông số"
							value={optionsData[idx].name}
							onChange={(e) => {
								setFieldValue(fieldSet, [
									...optionsData.slice(0, idx),
									{ ...optionsData[idx], name: e.target.value },
									...optionsData.slice(idx + 1),
								]);
							}}
						></TextField>
					)}
				</Box>
				<Box>
					<TextField
						variant="outlined"
						label="Tên đơn vị"
						value={
							!isSetValueProduct
								? optionsData[idx].unit
								: optionsData[idx].unit || "không có"
						}
						onChange={(e) => {
							setFieldValue(fieldSet, [
								...optionsData.slice(0, idx),
								{ ...optionsData[idx], unit: e.target.value },
								...optionsData.slice(idx + 1),
							]);
						}}
						disabled={isSetValueProduct || isView}
					></TextField>
				</Box>
				<Box>
					{!isView && (
						<IconButton
							onClick={() => {
								optionsData.splice(idx, 1);
								setFieldValue(fieldSet, optionsData);
							}}
						>
							<DeleteIcon />
						</IconButton>
					)}
				</Box>
			</Box>
		</>
	);
};
export default DetailParamInfo;
