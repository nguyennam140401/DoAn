import { Box, IconButton, TextField } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
const DetailParamInfo = ({ optionsData, idx, setFieldValue, data }) => (
	<>
		<Box mb={2} display={"flex"} gap={2}>
			<Box>
				<TextField
					variant="outlined"
					label={optionsData[idx].name}
					value={optionsData[idx].value}
					onChange={(e) => {
						setFieldValue("options", [
							...optionsData.slice(0, idx),
							{ ...optionsData[idx], value: e.target.value },
							...optionsData.slice(idx + 1),
						]);
					}}
				></TextField>
			</Box>
			<Box>
				<TextField
					variant="outlined"
					label="Tên đơn vị"
					value={optionsData[idx].unit}
					onChange={(e) => {
						setFieldValue("options", [
							...optionsData.slice(0, idx),
							{ ...optionsData[idx], unit: e.target.value },
							...optionsData.slice(idx + 1),
						]);
					}}
				></TextField>
			</Box>
			<Box>
				<IconButton
					onClick={() => {
						optionsData.splice(idx, 1);
						setFieldValue("options", optionsData);
					}}
				>
					<DeleteIcon />
				</IconButton>
			</Box>
		</Box>
	</>
);

export default DetailParamInfo;
