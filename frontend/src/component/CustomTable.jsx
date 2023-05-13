import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Skeleton, Typography } from "@mui/material";
import { useEffect } from "react";
import { removeEmpty } from "common";
export default function CustomTable({
	data,
	columns,
	isPending,
	totalResults,
	currentPage,
	handleGetData = () => {},
	populate,
	queryProps = {},
	...props
}) {
	const [page, setPage] = React.useState(currentPage ? currentPage - 1 : 0);
	const [rowsPerPage, setRowsPerPage] = React.useState(data?.limit || 10);
	const [textSearch, setTextSearch] = React.useState("");
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	useEffect(() => {
		const query = {
			...queryProps,
			page: page + 1,
			name: textSearch,
			limit: rowsPerPage,
		};
		handleGetData(removeEmpty(query));
	}, [page, rowsPerPage, textSearch]);

	const getValueCell = (rowData, path) => {
		const arrField = path.split(".");
		let res = rowData;
		let idx = 0;
		while (arrField[idx]) {
			res = res[arrField[idx]];
			idx++;
		}
		return res || "";
	};

	return isPending ? (
		<TablePending />
	) : data?.length > 0 ? (
		<Paper sx={{ width: "100%", overflow: "hidden", marginTop: 2 }}>
			<TableContainer sx={{ maxHeight: 600 }} {...props}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							{columns.map((column, idx) => (
								<TableCell
									key={idx}
									align={column.align}
									style={{ minWidth: column.minWidth }}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map((row) => {
							return (
								<TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
									{columns.map((column, idx) => {
										const value = !column.Cell
											? getValueCell(row, column.id)
											: null;
										return (
											<TableCell key={idx} align={column.align}>
												<div className="max-two-line">
													{!column.Cell ? (
														column.format && typeof value === "number" ? (
															column.format(value)
														) : (
															value
														)
													) : (
														<column.Cell data={row} />
													)}
												</div>
											</TableCell>
										);
									})}
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={totalResults}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
				labelDisplayedRows={({ from, to, count }) => {
					return `${from}–${to} trên ${
						count !== -1 ? count : `more than ${to}`
					}`;
				}}
				labelRowsPerPage={"Số bản ghi: "}
			/>
		</Paper>
	) : (
		<Typography align="center">Không có dữ liệu</Typography>
	);
}

const TablePending = () => {
	return (
		<Table>
			<TableHead>
				<TableRow>
					{Array.from({ length: 5 }, (_, i) => i).map((_, idx) => (
						<TableCell key={idx}>
							<Skeleton />
						</TableCell>
					))}
				</TableRow>
			</TableHead>
			<TableBody>
				{Array.from({ length: 6 }, (_, i) => i).map((_, idx) => (
					<TableRow key={idx}>
						{Array.from({ length: 5 }, (_, i) => i).map((_, idx) => (
							<TableCell key={idx}>
								<Skeleton />
							</TableCell>
						))}
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
